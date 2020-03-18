import websocket from 'websocket';
import { URLSearchParams } from 'url';

import config from '../../config';
import db from '../db';
import logger from '../logger';
import {
  requestMedXPrice,
  requestBlockByHeight,
  requestMedState,
  requestTransactionsByHeight,
  requestPoolData,
} from '../utils/requester';

import { handleBlocksResponse, getBlocks, getLastBlock } from '../block/handler';
import { blockConverter } from '../converter';
import { updateCandidates } from '../candidate/handler';
import { updateAnalytics } from '../analytics/handler';

const { TOPICS, TENDERMINT_URL, MEM_FIELDS } = config.BLOCKCHAIN;
const WebSocket = websocket.client;


let isSyncing = true;

const clients = Object.keys(TOPICS).reduce((obj, key) => {
  obj[key] = {}; // eslint-disable-line no-param-reassign
  return obj;
}, {});

const pushEventToClient = (e) => {
  const { topic } = e;
  if (!clients[topic]) throw new Error(`invalid topic ${topic}`);

  // now data field is stored as a string because of mysql v5.6
  e.data.data = JSON.parse(e.data.data);

  const topicClients = Object.values(clients[topic]);
  logger.debug(`there are ${topicClients.length} clients`);
  topicClients.forEach(client => client.sseSend(e));
};

TOPICS.newTailBlock.onEvent = async (block, onReset) => {
  logger.debug('[T1] start to get last block from DB');
  const { height: lastHeight } = await getLastBlock();
  logger.debug('[T1] success to get last block from DB');
  // if explorer does not have full blocks
  // compare previous block due to Tendermint engine's characteristics
  if (+lastHeight + 2 < +block.height) return onReset();

  logger.debug('[T1] start to get FIRMA price');
  const medxPrice = await requestMedXPrice().catch(e => {
    logger.error('[T1] fail to get FIRMA price. ' + e.message);
  });
  logger.debug('[T1] success to get FIRMA price');
  logger.debug('[T1] start to get block detail from blockchain');
  const detailedBlock = await requestBlockByHeight(block.height - 1);
  logger.debug('[T1] success to get block detail from blockchain');
  logger.debug('[T1] start to get total supply from blockchain');
  const supplyData = await requestPoolData();
  logger.debug('[T1] success to get total supply from blockchain');
  MEM_FIELDS.notBondedTokens = supplyData.notBondedTokens;
  MEM_FIELDS.bondedTokens = supplyData.bondedTokens;
  MEM_FIELDS.totalSupply = supplyData.totalSupply;
  MEM_FIELDS.price = medxPrice;
  logger.debug('[T1] start to get transactions from blockchain');
  detailedBlock.txs = await requestTransactionsByHeight(block.height - 1);
  logger.debug('[T1] success to get transactions from blockchain');

  console.log(detailedBlock);
  return db
    .transaction(async (t) => {
      logger.debug('[T1] start to get candidates from blockchain');
      await updateCandidates(t);
      logger.debug('[T1] success to get candidates from blockchain');

      logger.debug('[T1] start to insert analytics data');
      await updateAnalytics(t, block.height, detailedBlock.txs, medxPrice);
      logger.debug('[T1] success to insert analytics data');

      logger.debug('[T1] start to handle block response from blockchain');
      return handleBlocksResponse([detailedBlock], t);

    })
    .then(dbBlocks => {
      logger.debug('[T1] success to handle block response from blockchain');
      return pushEventToClient({
        data: {
          ...dbBlocks[0].dataValues,
          supply: MEM_FIELDS,
        },
        topic: 'newTailBlock',
      })
    });
};

export const onSubscribe = (req, res, options) => {
  const { topics: reqTopics } = options;
  const requestId = res.get('X-Request-Id');
  (reqTopics || []).forEach((topic) => {
    clients[topic][requestId] = res;
  });
  req.on('close', () => {
    (reqTopics || []).forEach((topic) => {
      delete clients[topic][requestId];
    });
  });
};

export const sync = async (stopSync = false) => {
  const lastBlock = await getLastBlock();
  const medState = await requestMedState();

  // CASE A : If DB is empty
  let currentHeight = 0;
  // CASE B : If DB already holds block data
  if (lastBlock) currentHeight = +lastBlock.data.height;

  const lastHeight = +medState.last_block_height;
  logger.debug(`current height ${currentHeight}, last height ${lastHeight}`);
  if (currentHeight === lastHeight && medState.tail === lastBlock.hash) {
    return Promise.resolve();
  }
  // If db holds old data because tail block height does not reached to currentHeight yet
  if (currentHeight > lastHeight) {
    logger.error('DB Initialization is required');
    process.exit(1);
  }

  const work = prevCurrentHeight => getBlocks(prevCurrentHeight, lastHeight)
    .then((postCurrentHeight) => {
      if (postCurrentHeight < lastHeight) {
        if (stopSync) return Promise.resolve();
        return work(postCurrentHeight);
      }
      isSyncing = false;
      return Promise.resolve();
    });

  return work(currentHeight)
    .catch((err) => {
      logger.error(err.stack);
      process.exit(1);
    });
};

let isConnected = false;
export const startSubscribe = (promise) => {
  // eslint-disable-next-line no-param-reassign
  promise = promise.then(async () => {
    // await updateAllAccountsDataAfterSync();
    logger.debug('SYNC IS DONE');
  });

  const reset = stopSync => startSubscribe(sync(stopSync));

  const params = new URLSearchParams();
  for (const t of Object.keys(TOPICS)) { // eslint-disable-line
    params.append('topics', t);
  }

  let initialResponse = true;

  return new Promise((resolve, reject) => {
    const client = new WebSocket();
    client.on('connectFailed', err => console.log('connection failed : ', err));
    client.on('connect', (conn) => {
      console.log('connected to the blockchain');
      conn.on('error', (err) => {
        isConnected = false;
        logger.error(err.stack);
        reject(err);
      });
      conn.on('close', () => {
        isConnected = false;
        logger.debug('close websocket');
        return reset();
      });
      conn.on('message', ({ utf8Data }) => {
        if (initialResponse) {
          initialResponse = false; // to ignore initial setup response
        } else {
          if (!utf8Data) {
            logger.error('Reset syncing because server got empty response.');
            reset();
            return;
          }

          const block = blockConverter(JSON.parse(utf8Data).result.data.value);
          logger.debug(`newTailBlock received | height : ${block.height}`);
          promise = promise // eslint-disable-line no-param-reassign
            .then(() => TOPICS.newTailBlock.onEvent(block, reset))
            .catch((err) => {
              conn.close();
              logger.error(err.stack);
              return err;
            });
          if (!isSyncing) {
            resolve();
          }
        }
      });

      const subscriptionData = {
        method: 'subscribe',
        params: {
          query: "tm.event='NewBlock'",
        },
      };
      if (!isConnected) {
        conn.send(JSON.stringify(subscriptionData));
        isConnected = true;
      }
    });
    if (!isConnected) client.connect(TENDERMINT_URL.ws);
  });
};
