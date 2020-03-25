import { simpleRequester } from './common';
import { NODE_ENDPOINT } from '../../config';


export const searcher = (dispatch, actionType, ERROR, query) => {
  let type;

  if(query.length >= 44 && query.indexOf('firma') === 0)
    type = 'accounts';
  else if(!Number.isNaN(Number(query.toString())))
    type = 'blocks';
  else
    type = 'transactions';

  simpleRequester(dispatch, {
    url: `${NODE_ENDPOINT}/${type}/${query}`,
    actionType,
    ERROR,
  });
};

export const searchTextSetter = (dispatch, actionType, ERROR, query, searchFrom) => {
  dispatch({
    type: actionType,
    payload: {
      searchText: query,
      searchFrom,
    },
  });
};

export const searchWorker = (result) => {
  const netResult = [];
  if ('block' in result) {
    netResult.push({
      type: 'block',
      data: result.block.height,
    });
  } else if ('transaction' in result) {
    netResult.push({
      type: 'tx',
      data: result.transaction.data.txHash,
    });
  } else if ('account' in result) {
    netResult.push({
      type: 'account',
      data: result.account.address,
    });
  }
  return netResult;
};
