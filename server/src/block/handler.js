import Block from './model';
import db from '../db';
import {handleTxsInDbBlock} from '../transaction/handler';
import {
    requestBlockByHeight,
    requestBlockByHeightInTendermint,
    requestGenesis,
    requestTransactionsByHeight,
} from '../utils/requester';
import {isIdentical} from '../utils/checker';
import {parseBlock} from '../utils/parser';
import config from '../../config';
import logger from '../logger';
import {updateGenesisToAccounts} from '../account/handler';
import {txConverter} from '../converter';

const {REQUEST_STEP} = config.REQUEST;


const verifyBlocks = blocks => (
    Promise.all(blocks.map(async (block) => {
        const blockInDB = await Block.findByPk(block.height);

        if (!blockInDB) return block;
        if (isIdentical(block, blockInDB.data)) {
            logger.warn(`identical block received : ${block.height}`);
            return block;
        }

        return block;
    }))
);

const applyBlockData = async (dbBlocks, t) => {
    let txCount = 0;
    const dbTxs = await dbBlocks.reduce((p, dbBlock) => p
        .then(async (txList) => {
            txCount += dbBlock.data.txs.length;

            const txs = await handleTxsInDbBlock(dbBlock, t);
            return [...txList, ...txs];
        }), Promise.resolve([]));

    if (txCount) logger.debug(`add ${txCount} transactions`);
    return dbTxs;
};

// eslint-disable-next-line import/prefer-default-export
export const handleBlocksResponse = async (blocks, t) => {
    // Check if the parent block exists
    const parentHeight = +blocks[0].height - 1;
    const parentBlock = await Block.findByPk(parentHeight);
    // If parentBlock doesn't exist
    if (parentBlock === null && parentHeight !== 0) {
        await requestBlockByHeight(parentHeight)
            .then(async (block) => {
                const txs = await requestTransactionsByHeight(block.height);
                // eslint-disable-next-line no-param-reassign
                block.txs = txs;
                return handleBlocksResponse([block], t);
            });
    }

    // handle genesis
    if (parentHeight === 0) {
        const genesis = await requestGenesis();

        // apply genesis coin distribution
        let accounts = [];

        if (genesis.app_state.auth.hasOwnProperty('accounts')) {
            accounts = genesis.app_state.auth.accounts;
        } else if (genesis.app_state.hasOwnProperty('accounts')) {
            accounts = genesis.app_state.accounts;
        }

        const promises = accounts.map(
            acc => updateGenesisToAccounts(acc.address, acc.coins[0].amount, t),
        );
        await Promise.all(promises);

        // apply genesis transactions
        const genTxs = genesis.app_state.genutil.gentxs
            .reduce((acc, tx, i) => {
                const data = {
                    tx,
                    height: 1,
                    logs: [{success: true}],
                    txhash: '0'.repeat(64).slice(0, -`${i}`.length) + `${i}`, // eslint-disable-line prefer-template
                };
                return [...acc, ...txConverter(data)];
            }, []);
        blocks[0].txs = genTxs; // eslint-disable-line no-param-reassign
    }

    // Check if the block is already saved
    // if (parentBlock !== null && isReverted(blocks[0], parentBlock)) {
    //   const newBlocks = await handleRevertBlocks(blocks[0], [], t);
    //   blocks = [...newBlocks, ...blocks]; // eslint-disable-line no-param-reassign
    // }

    const verifiedBlocks = await verifyBlocks(blocks);

    return Block
        .bulkCreate(verifiedBlocks.map(parseBlock), {
            transaction: t,
            updateOnDuplicate: ['data', 'hash'],
        })
        .then(async (dbBlocks) => {
            const dbTxs = await applyBlockData(dbBlocks, t);
            logger.debug(`blocks from ${dbBlocks[0].height} to ${dbBlocks[dbBlocks.length - 1].height} added`);

            const promises = dbBlocks.map(async (dbBlock) => {
                const targetTxs = dbTxs
                    .filter(({blockHeight}) => blockHeight === dbBlock.height)
                    .map(dbTx => dbTx.data);
                await dbBlock.update(
                    {data: {...dbBlock.data, transactions: targetTxs}},
                    {transaction: t},
                );
            });
            await Promise.all(promises);

            return dbBlocks;
        });
};

export const getBlocks = (currentHeight, lastHeight) => db.transaction((t) => {
    if (currentHeight === lastHeight) return Promise.resolve();

    const from = currentHeight + 1;
    const step = Math.min(REQUEST_STEP, lastHeight - from + 1);
    const to = from + step - 1;

    const heights = [];
    for (let i = from; i <= to; i += 1) {
        heights.push(i);
    }

    return Promise.all(heights.map(height => {
        if (height === 1) return requestBlockByHeightInTendermint(height);
        return requestBlockByHeight(height);
    }))
        .then(async (blocks) => {
            const promises = blocks.map(async (block) => {
                if (block.txs && block.txs !== []) {
                    const txs = await requestTransactionsByHeight(block.height);
                    // eslint-disable-next-line no-param-reassign
                    block.txs = txs;
                }
            });
            await Promise.all(promises);
            return blocks;
        })
        .then(blocks => handleBlocksResponse(blocks, t))
        .then(() => to)
        .catch((err) => {
            console.log("ERE : ", err);
            throw err;
        });
});

export const getLastBlock = () => Block.findOne({order: [['id', 'desc']]});
