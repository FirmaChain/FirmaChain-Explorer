import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  const Balance = `${account.balance} FIRMA`;

  const Staking = account.staking ? `${account.staking} FIRMA` : null;

  return {
    Account: account.address,
    Balance,
    Transactions: account.totalTxs,
    Percentage: totalSupply ? `${divider(account.balance, totalSupply, 5)}` : 0,
    Staking,
  };
};

export default accountMapper;
