import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

const value = { defaultValue: '0', type: Sequelize.DECIMAL(36, 0) };
export default db.define('accounts', {
  address: { allowNull: true, type: Sequelize.STRING, unique: true },
  alias: { type: Sequelize.STRING, unique: true },
  balance: { ...value },
  candidateId: { type: Sequelize.STRING, unique: true },
  data, // last data received from node(BP)
  id,
  totalTxs: { defaultValue: 0, type: Sequelize.INTEGER },
  staking: { ...value },
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});
