import BigNumber from 'bignumber.js';
import Analytics from './model';
import logger from '../logger';
import Sequelize from "sequelize";

// eslint-disable-next-line import/prefer-default-export
export const updateAnalytics = async (t, height, txs, price) => {
  let row = await Analytics.findOne({where: {date: Sequelize.fn('date', Sequelize.fn('now'))}});

  let query;

  if (row) {
    query = Analytics.update({
        last: height,
        block: row.block + 1,
        tx: row.tx + txs.length,
        price: price
      },
      {
        transaction: t,
        where: Sequelize.literal('`date` = DATE(NOW())'),
      }
    )
  } else {
    query = Analytics.create({
        date: Sequelize.fn('now'),
        last: height,
        block: 1,
        tx: txs.length,
        price: price
      },
      {
        transaction: t
      })
  }

  query.catch(e => {
    logger.error('[T1] fail to insert analytics data! ' + e.message);
  });

  return query;
};
