import Sequelize from 'sequelize';

import db from '../db';

export default db.define('analytics', {
  date: {type: Sequelize.DATEONLY, primaryKey: true},
  last: {type: Sequelize.INTEGER, defaultValue: '0'},
  block: {type: Sequelize.INTEGER, defaultValue: '0'},
  tx: {type: Sequelize.INTEGER, defaultValue: '0'},
  price: {type: Sequelize.FLOAT, defaultValue: '0'},
  tz: {type: Sequelize.STRING(3), defaultValue: '0'},
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});
