import Sequelize from 'sequelize';

import db from '../db';

export default db.define('analytics', {
  height: { type: Sequelize.INTEGER, primaryKey: true },
  block: {type: Sequelize.INTEGER, defaultValue: '0'},
  tx: {type: Sequelize.INTEGER, defaultValue: '0'},
  price: {type: Sequelize.FLOAT, defaultValue: '0'},
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});
