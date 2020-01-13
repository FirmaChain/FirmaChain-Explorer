import axios from 'axios';
import config from '../../config';
import {
  balanceConverter, blockConverter,
  txConverter, stakingConverter, totalSupplyConverter,
} from '../converter';

const { TENDERMINT_URL, SERVER_URL, COINMARKETCAP_URL } = config.BLOCKCHAIN;

const requestMedXPrice = () => axios({
  method: 'get',
  url: COINMARKETCAP_URL,
}).then(({ data }) => data.data.quotes.USD.price);

const requestBlockByHeightInTendermint = height => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/block?height=${height}`,
}).then(({ data }) => blockConverter(data.result));

const requestBlockByHeight = height => axios({
  method: 'get',
  url: `${SERVER_URL.http}/blocks/${height}`,
}).then(({ data }) => blockConverter(data));

const requestTransactionsByHeight = height => axios({
  method: 'get',
  params: {
    'tx.height': height,
  },
  url: `${SERVER_URL.http}/txs`,
}).then(({ data }) => data.txs.reduce((acc, tx) => [...acc, ...txConverter(tx)], []));

const requestAccountBalance = address => axios({
  method: 'get',
  url: `${SERVER_URL.http}/bank/balances/${address}`,
}).then(({ data }) => balanceConverter(data.result));

const requestAccountStakingBalance = address => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/delegators/${address}/delegations`,
}).then(({ data }) => stakingConverter(data));

const requestCandidates = () => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/validators`,
}).then(({ data }) => data.result);

const requestMedState = () => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/abci_info`,
}).then(res => res.data.result.response);

const requestPoolData = () => axios({
  method: 'get',
  url: `${SERVER_URL.http}/staking/pool`,
}).then(res =>totalSupplyConverter(res.data.result));

const requestGenesis = () => axios({
  method: 'get',
  url: `${TENDERMINT_URL.http}/genesis`,
}).then(res => res.data.result.genesis);

const requestAccountTotalFunds = () => axios({
  method: 'get',
  url: `${SERVER_URL.local}/accounts/total`,
}).then(res => res.data);


const requestTotalSupply = () => axios({
  method: 'get',
  url: `${SERVER_URL.http}/supply/total`,
}).then(res => res.data.result[0].amount);


export {
  requestMedXPrice,
  requestBlockByHeightInTendermint,
  requestBlockByHeight,
  requestTransactionsByHeight,
  requestAccountBalance,
  requestAccountStakingBalance,
  requestCandidates,
  requestMedState,
  requestPoolData,
  requestGenesis,
  requestAccountTotalFunds,
  requestTotalSupply,
};
