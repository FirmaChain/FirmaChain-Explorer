import { createAction, handleActions } from 'redux-actions';

import {
  accDetailGetter,
  accGetter,
  accsGetter,
  blockGetter,
  blocksGetter,
  bpGetter,
  bpsGetter,
  medStateGetter,
  subscriber,
  txGetter,
  txsGetter,
} from '../helpers/blockchain';
import { divider, sorter } from '../../lib';
import { bpsInPage, contentsInPage } from '../../config';


// ACTION TYPES
const GET_MED_STATE = 'blockchain/GET_MED_STATE';

const GET_ACCOUNT = 'blockchain/GET_ACCOUNT';
const GET_ACCOUNTS = 'blockchain/GET_ACCOUNTS';
const GET_ACCOUNT_DETAIL = 'blockchain/GET_ACCOUNT_DETAIL';

const GET_BLOCK = 'blockchain/GET_BLOCK';
const GET_BLOCKS = 'blockchain/GET_BLOCKS';
const GET_INITIAL_BLOCKS = 'blockchain/GET_INITIAL_BLOCKS';
const GET_INITIAL_TXS = 'blockchain/GET_INITIAL_TXS';
const GET_TAIL_BLOCK = 'blockchain/GET_TAIL_BLOCK';

const GET_TX = 'blockchain/GET_TX';
const GET_TXS = 'blockchain/GET_TXS';
const SET_TXS_FROM_BLOCK = 'blockchain/SET_TXS_FROM_BLOCK';

const GET_BP = 'blockchain/GET_BP';
const GET_BPS = 'blockchain/GET_BPS';

const SUBSCRIBE = 'blockchain/SUBSCRIBE';

const ERROR = 'blockchain/ERROR';

const subsribeTypes = {
  // GET_EXECUTED_TX,
  GET_TAIL_BLOCK,
  // GET_LIB,
  // GET_PENDING_TX,
  // GET_REVERT_BLOCK,
};

const initialState = {
  totalSupply: '0',
  bondedTokens: '0',

  medState: null,

  account: null, // specific account
  accountList: Array(contentsInPage).fill({}), // accounts from rpc call

  block: null, // specific block
  blockList: Array(contentsInPage).fill({}), // blocks from rpc call
  blocks: [], // blocks from event subscriber
  tailBlock: null, // tail block from event subscriber

  liveTxs: [],
  txList: Array(contentsInPage).fill({}), // transaction list set from local
  txs: [], // executed txs from event subscriber
  txsFromBlock: [], // txs included in the specific block

  bp: null,
  bpList: Array(bpsInPage).fill({}),

  subscribe: false,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MED_STATE]: (state, action) => ({
    ...state,
    medState: action.payload,
    totalSupply: action.payload.supply.totalSupply,
    bondedTokens: action.payload.supply.bondedTokens,
  }),

  [GET_ACCOUNT]: (state, action) => {
    const account = {
      ...action.payload.account,
      totalTxs: action.payload.account.totalTxs,
    };
    return { ...state, account };
  },
  [GET_ACCOUNTS]: (state, action) => ({ ...state, accountList: sorter(action.payload.accounts, 'balance') }),
  [GET_ACCOUNT_DETAIL]: (state, action) => {
    const txs = [];
    action.payload.transactions.forEach(res => txs.push(res.data));
    return ({ ...state, txs: sorter(txs, 'receipt.timestamp') });
  },

  [GET_BLOCK]: (state, action) => ({ ...state, block: action.payload.block.data }),
  [GET_BLOCKS]: (state, action) => {
    const blockList = [];
    action.payload.blocks.forEach(res => blockList.push(res.data));
    return ({ ...state, blockList: sorter(blockList, 'height') });
  },
  [GET_INITIAL_BLOCKS]: (state, action) => {
    const blockList = [];
    action.payload.blocks.forEach(res => blockList.push(res.data));
    return {
      ...state,
      blocks: sorter(blockList, 'height'),
    };
  },
  [GET_INITIAL_TXS]: (state, action) => {
    const txs = [];
    action.payload.transactions.forEach(tx => txs.push(tx.data));
    return {
      ...state,
      liveTxs: sorter(txs, 'receipt.timestamp'),
    };
  },
  [GET_TAIL_BLOCK]: (state, action) => {
    let { liveTxs } = state;
    liveTxs = sorter(
      [...liveTxs, ...(action.payload.transactions || [])],
      'receipt.timestamp',
    ).splice(0, 5);

    return {
      ...state,
      liveTxs,
      tailBlock: action.payload,
      totalSupply: action.payload.supply.totalSupply,
      bondedTokens: action.payload.supply.bondedTokens,
      blocks: sorter([...state.blocks, action.payload], 'height')
        .slice(0, 5),
      txsFromBlock: action.payload.transactions ? (
        [...action.payload.transactions, ...state.txsFromBlock].slice(0, 5)
      ) : (
        state.txsFromBlock
      ),
    };
  },
  [GET_TX]: (state, action) => {
    const tx = {
      ...action.payload.transactions[0].data,
      block_height: action.payload.transactions[0].blockHeight,
    };
    return { ...state, tx };
  },
  [GET_TXS]: (state, action) => {
    const txList = [];
    action.payload.transactions.forEach(res => txList.push(res.data));
    return ({ ...state, txList });
  },
  [SET_TXS_FROM_BLOCK]: (state, action) => ({
    ...state,
    txs: sorter(action.payload, 'receipt.timestamp'), // TODO Use txsFromBlock instead of txs
  }),

  [GET_BP]: (state, action) => ({
    ...state,
    bp: action.payload.candidate,
  }),
  [GET_BPS]: (state, action) => ({
    ...state,
    bpList: sorter(action.payload.candidates, 'vote_power'),
  }),

  [SUBSCRIBE]: state => ({ ...state, subscribe: true }),

  [ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);

// ACTION CREATORS
export const getAccount = address => dispatch => accGetter(dispatch, GET_ACCOUNT, ERROR, address);
export const getAccountDetail = ({ address, from, to }) => dispatch => accDetailGetter(
  dispatch,
  GET_ACCOUNT_DETAIL,
  ERROR,
  { address, from, to },
);
export const getAccounts = ({ from, to }) => dispatch => accsGetter(
  dispatch,
  GET_ACCOUNTS,
  ERROR,
  { from, to },
);
export const getBlock = hash => dispatch => blockGetter(dispatch, GET_BLOCK, ERROR, hash);
export const getBlocks = ({ from, to }) => dispatch => blocksGetter(
  dispatch,
  GET_BLOCKS,
  ERROR,
  { from, to },
);
export const getBP = txHash => dispatch => bpGetter(
  dispatch,
  GET_BP,
  ERROR,
  txHash,
);
export const getBPs = ({ from, to }) => dispatch => bpsGetter(
  dispatch,
  GET_BPS,
  ERROR,
  { from, to },
);
export const getInitialBlocks = ({ from, to }) => (dispatch) => {
  blocksGetter(
    dispatch,
    GET_INITIAL_BLOCKS,
    ERROR,
    { from, to },
  );
  txsGetter(
    dispatch,
    GET_INITIAL_TXS,
    ERROR,
    { from: 0, to: 4 },
  );
};
export const getMedState = () => dispatch => medStateGetter(dispatch, GET_MED_STATE, ERROR);
export const getTx = hash => dispatch => txGetter(dispatch, GET_TX, ERROR, hash);
export const getTxs = ({ from, to }) => dispatch => txsGetter(
  dispatch,
  GET_TXS,
  ERROR,
  { from, to },
);
export const setTxsFromBlock = createAction(SET_TXS_FROM_BLOCK);
export const subscribe = () => dispatch => subscriber(dispatch, subsribeTypes, ERROR);

export default reducer;
