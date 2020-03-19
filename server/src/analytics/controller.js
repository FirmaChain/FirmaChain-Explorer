import {BadRequest} from 'http-errors';

import Analytics from './model';
import Sequelize from "sequelize";

export const data = async (req, res) => {
  let days = req.query.days || 6;
  let arr = [];
  for (let i = days; i >= 0; i--) {
    let date = new Date();
    date.setDate(date.getDate() - i);

    let timestamp = Math.floor(date.getTime() / 1000);

    let v = await Analytics.findOne({
      attributes: [
        'date',
        'last',
        'block',
        'tx',
        [Sequelize.fn('AVG', Sequelize.col('price')), 'price'],
      ],
      where: {date: Sequelize.fn('DATE', Sequelize.fn('FROM_UNIXTIME', timestamp))}
    });

    if(!v || !v.dataValues || v.dataValues.tx === null)
      continue;

    arr.push({
      timestamp: timestamp,
      ...v.dataValues
    });
  }

  res.json({data: arr});
};
