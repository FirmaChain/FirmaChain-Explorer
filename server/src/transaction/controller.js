import {NotFound} from 'http-errors';

import Transaction from './model';

import {listQueryWithCount} from '../db/query';

export const get = async (req, res) => {
  const {id} = req.params;
  let transaction;

  if (+id) {
    transaction = await Transaction.findByPk(id);
  } else {
    transaction = await Transaction.findOne({where: {txHash: id}});
  }

  if (!transaction) {
    throw new NotFound('transaction not exists');
  }
  res.json({transaction});
};

const searchColumns = [Transaction.tableAttributes.txHash];

export const list = async (req, res) => {
  const {account} = req.query;
  let where = null;
  if (account) {
    where = [
      {fromAccount: account},
      {toAccount: account},
    ];
  }

  const {data, pagination} = await listQueryWithCount(
    Transaction, {...req.query, where}, searchColumns,
  );
  res.json({transactions: data, pagination});
};

export const blind = async (req, res) => {
  const {id} = req.params;
  const transaction = await Transaction.findOne({where: {txHash: id}});
  if (!transaction) {
    throw new NotFound('transaction not exists');
  }

  const {data} = transaction;
  data.payload = '';
  transaction.update({data});
  res.json({transaction});
};
