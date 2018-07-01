import axios from 'axios';

import {
  EXECUTED_TX,
  LIB,
  PENDING_TX,
  REVERT_BLOCK,
  TAIL_BLOCK,
} from '../const';
import { NODE_ENDPOINT } from '../../config';


const preProcess = (result, maxResponse) => {
  const data = result.split('\n');
  data.pop();
  let restart = false;

  if (data.length >= maxResponse) restart = true;
  return {
    datum: data.length !== 0 ? JSON.parse(data[data.length - 1]).result : null,
    restart,
  };
};

const distributor = (datum, actionTypes) => {
  switch (datum.topic) {
    case EXECUTED_TX:
      return {
        type: actionTypes.GET_EXECUTED_TX,
        payload: datum.data,
      };
    case LIB:
      return {
        type: actionTypes.GET_LIB,
        payload: datum.data,
      };
    case PENDING_TX:
      return {
        type: actionTypes.GET_PENDING_TX,
        payload: datum.data,
      };
    case REVERT_BLOCK:
      return {
        type: actionTypes.GET_REVERT_BLOCK,
        payload: datum.data,
      };
    case TAIL_BLOCK:
      return {
        type: actionTypes.GET_TAIL_BLOCK,
        payload: datum.data,
      };
    default:
      return null;
  }
};

// post: "/v1/subscribe"
// TODO @ggomma add error handler;
export const subscriber = (dispatch, actionTypes, ERROR) => {
  const req = new XMLHttpRequest();
  req.open('POST', `${NODE_ENDPOINT}/v1/subscribe`);
  req.onprogress = () => {
    const data = preProcess(req.responseText, 10);
    if (data.datum !== null) dispatch(distributor(data.datum, actionTypes));
    if (data.restart === true) {
      req.abort();
      return subscriber(dispatch, actionTypes);
    }
    return null;
  };
  req.send(JSON.stringify({
    topics: [
      EXECUTED_TX,
      LIB,
      PENDING_TX,
      REVERT_BLOCK,
      TAIL_BLOCK,
    ],
  }));
};

// get: "/v1/block"
export const blockGetter = (dispatch, actionType) => {

};

// get: "/v1/user/accountstate"
export const accGetter = (dispatch, actionType) => {

};

// get: "/v1/node/medstate"
export const medStateGetter = (dispatch, actionType, ERROR) => {
  axios({
    url: `${NODE_ENDPOINT}/v1/node/medstate`,
  })
    .then(res => dispatch({
      type: actionType,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: ERROR,
      payload: err.message,
    }));
};

// get: "/v1/transaction"
export const txGetter = (dispatch, actionType) => {

};