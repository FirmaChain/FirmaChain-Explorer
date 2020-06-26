import BigNumber from "bignumber.js";

import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  const balance = new BigNumber(account.balance);
  const staking = new BigNumber(account.staking || '0');

  let percentage = new BigNumber('0')
  if(totalSupply) {
   percentage = balance.div(new BigNumber(totalSupply)).multipliedBy('100');
  }

  return {
    Account: account.address,
    Balance: `${balance.shiftedBy(-6).toFormat(3)} FIRMA`,
    Transactions: account.totalTxs,
    Percentage: percentage.toFixed(5) + '%',
    Staking: `${staking.shiftedBy(-6).toFormat(3)} FIRMA`,
  };
};

export default accountMapper;
