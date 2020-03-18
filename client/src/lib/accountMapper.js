import BigNumber from "bignumber.js";

import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  let balance = new BigNumber(account.balance);
  let staking = new BigNumber(account.staking || '0');

  balance =  balance.shiftedBy(-6);
  staking =  staking.shiftedBy(-6);

  const Balance = `${balance} FIRMA`;
  const Staking = `${staking} FIRMA`;

  return {
    Account: account.address,
    Balance,
    Transactions: account.totalTxs,
    Percentage: totalSupply ? `${divider(account.balance, totalSupply, 5)}` : 0,
    Staking,
  };
};

export default accountMapper;
