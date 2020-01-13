import Sequelize from 'sequelize';

import { data, id, refer } from '../db/columns';
import db from '../db';

import Block from '../block/model';

export default db.define('transactions', {
  blockHeight: { allowNull: false, type: Sequelize.INTEGER },
  data,
  executed: { type: Sequelize.BOOLEAN },
  fromAccount: { allowNull: true, type: Sequelize.STRING },
  id,
  onChain: { type: Sequelize.BOOLEAN },
  toAccount: { type: Sequelize.STRING },
  txHash: { allowNull: false, type: Sequelize.STRING, unique: true },
  ...refer(Block),
}, {
  indexes: [
    { fields: ['fromAccount'] },
    { fields: ['toAccount'] },
  ],
});
