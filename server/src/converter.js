import BigNumber from 'bignumber.js';

import {
  requestAccountTotalFunds,
  requestTotalSupply
} from './utils/requester';

export const blockConverter = (data) => {
  try {
    return ({
      height: +data.block.header.height,
      timestamp: data.block.header.time,
      hash: data.block_meta ? data.block_meta.block_id.hash : null,
      prevHash: data.block.header.last_block_id.hash,
      txs: data.block.data.txs || [],
      validator: data.block.header.proposer_address,
    });
  } catch (e) {
    return ({});
  }
};

export const txConverter = (data) => {
  let fromAccount = null;
  let toAccount = null;
  let amount = null;

  try {
    if(data.tx.value.msg.length > 0) {

      const m = data.tx.value.msg[0];
      switch (m.type) {
        case 'cosmos-sdk/MsgBeginRedelegate':
        case 'cosmos-sdk/MsgUndelegate':
        case 'cosmos-sdk/MsgDelegate':
          fromAccount = m.value.delegator_address;
          ({ amount } = m.value.amount);
          break;
        case 'cosmos-sdk/MsgWithdrawDelegationReward':
          fromAccount = m.value.delegator_address;
          break;
        case 'cosmos-sdk/MsgCreateValidator':
          fromAccount = m.value.delegator_address;
          ({ amount } = m.value.value);
          break;
        case 'cosmos-sdk/MsgSend':
          fromAccount = m.value.from_address;
          toAccount = m.value.to_address;
          amount = m.value.amount ? m.value.amount[0].amount : 0;
          break;
        case 'aol/MsgCreateTopic':
        case 'aol/MsgAddWriter':
        case 'aol/MsgDeleteWriter':
        case 'aol/MsgAddRecord':
          fromAccount = m.value.owner_address;
          break;
        default:
          break;
      }
    }

    return [{
      blockHeight: +data.height,
      executed: data.logs[0].success,
      fromAccount,
      toAccount,
      onChain: true,
      txHash: `${data.txhash}`,
      memo: data.tx.value.memo,
      fee: data.tx.value.fee,
      msgs: data.tx.value.msg,
      amount,
      gasUsed: data.gas_used,
      gasLimit: data.gas_wanted
    }];
  } catch (e) {
    return ({});
  }
};

export const balanceConverter = (data) => {
  try {
    return data[0].amount;
  } catch (e) {
    return null;
  }
};

export const stakingConverter = (data) => {
  try {
    return data.reduce((acc, d) => acc.plus(new BigNumber(d.shares)), new BigNumber('0'));
  } catch (e) {
    return null;
  }
};

export const totalSupplyConverter = async (data) => {
  try {
    const accountFunds = await requestAccountTotalFunds();
    const totalFunds = await requestTotalSupply();

    const notBonded = new BigNumber(data.not_bonded_tokens);
    const bonded = new BigNumber(data.bonded_tokens);

    return {
      notBondedTokens: data.not_bonded_tokens,
      bondedTokens: data.bonded_tokens,
      accountsTotal: accountFunds.data,
      totalSupply: totalFunds.toString(),
    };
  } catch (e) {
    return null;
  }
};
