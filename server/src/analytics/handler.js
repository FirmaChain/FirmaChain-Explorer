import BigNumber from 'bignumber.js';
import Analytics from './model';
import logger from '../logger';

// eslint-disable-next-line import/prefer-default-export
export const updateAnalytics = async (t, height, txs, price) => {
  return Analytics.create({
    height: height,
    tx: txs.length,
    price: price
  }, {transaction: t}).catch(e => {
    logger.error('[T1] fail to insert analytics data! ' + e.message);
  });
};
