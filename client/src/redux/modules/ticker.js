import { handleActions } from 'redux-actions';

import {analyticsGetter, medxPriceGetter} from '../helpers/ticker';


// ACTION TYPES
const GET_MEDX_PRICE = 'ticker/GET_MEDX_PRICE';
const GET_ANALYTICS = 'ticker/GET_ANALYTICS';

const ERROR = 'ticker/ERROR';

const initialState = {
  medxPrice: 0,
  analytics: [],
  error: null,
};

// REDUCER
const reducer = handleActions({
  [GET_MEDX_PRICE]: (state, action) => {
    const medxPrice = action.payload.price;
    return { ...state, medxPrice };
  },
  [GET_ANALYTICS]: (state, action) => {
    let analytics = action.payload.data || [];

    return { ...state, analytics: analytics};
  },

  [ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);

// ACTION CREATORS
export const getMedxPrice = () => dispatch => medxPriceGetter(dispatch, GET_MEDX_PRICE, ERROR);
export const getAnalytics = () => dispatch => analyticsGetter(dispatch, GET_ANALYTICS, ERROR);

export default reducer;
