import { BadRequest } from 'http-errors';

import Account from './model';
import { listQueryWithCount, sumData } from '../db/query';

export const get = async (req, res) => {
  const { id } = req.params;
  let account;
  if (+id) {
    account = await Account.findByPk(req.params.id);
  }
  if (!account) {
    account = await Account.findOne({ where: { address: id } });
  }
  if (!account) {
    throw new BadRequest('account not found');
  }

  res.json({ account });
};

const searchColumns = [Account.tableAttributes.address];

export const list = async (req, res) => {
  const options = { ...req.query, order: [['balance', 'DESC'], ['id', 'DESC']] };
  const { data, pagination } = await listQueryWithCount(Account, options, searchColumns);
  res.json({ accounts: data, pagination });
};

export const total = async (req, res) => {
  const { data } = await sumData(Account, "balance");
  res.json({ data: data });
};
