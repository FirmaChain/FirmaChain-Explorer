import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

export default db.define('blocks', {
  data,
  hash: { allowNull: false, type: Sequelize.STRING, unique: true },
  height: { type: Sequelize.INTEGER },
  id,
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});
