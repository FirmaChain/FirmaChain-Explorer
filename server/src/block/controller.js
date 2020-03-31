import {NotFound} from 'http-errors';

import {listQueryWithCount} from '../db/query';
import Block from './model';
import Transaction from '../transaction/model';

export const get = async (req, res) => {
  const {id} = req.params;
  let block;
  if (+id) {
    block = await Block.findOne({where: {height: id}});
  } else {
    block = await Block.findOne({where: {hash: id}});
  }

  if (!block) {
    return res.json({})
  }

  block = JSON.parse(JSON.stringify(block));

  const txList = [];
  if (block && block.data.transactions.length === 0) {
    const txs = await Transaction.findAll({where: {blockHeight: block.data.height}});
    txs.forEach(tx => txList.push(tx.dataValues.data));
    block.data.transactions = txList;
  }

  block.data.transactions = block.data.transactions.map(x => {
    x.timestamp = block.data.timestamp;
    return x;
  });

  res.json({block});
};

const searchColumns = [Block.tableAttributes.hash];

export const list = async (req, res) => {
  const {data, pagination} = await listQueryWithCount(Block, req.query, searchColumns);

  res.json({blocks: data, pagination});
};
