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
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'block'],
        [Sequelize.fn('SUM', Sequelize.col('tx')), 'tx'],
        [Sequelize.fn('AVG', Sequelize.col('price')), 'price'],
      ],
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('createdAt')),
        Sequelize.fn('DATE', Sequelize.fn('FROM_UNIXTIME', timestamp))
      ),
      order: [
        ['height', 'DESC']
      ]
    });

    if(!v || !v.dataValues || v.dataValues.tx === null)
      continue;

    arr.push({
      timestamp: timestamp,
      ...v.dataValues
    });
  }

  console.log(arr)
  res.json({data: arr});
};
