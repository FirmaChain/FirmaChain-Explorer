import { divider } from './bigNumCalculator';

const accountMapper = (account, totalSupply = undefined) => {
  const tempAmount = divider(account.balance, [10 ** 6], 6).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Balance = `${tempAmount.join('.')} FIRMA`;

  const Staking = account.staking ? `${divider(account.staking, [10 ** 6], 6).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} FIRMA` : null;

  return {
    Account: account.address,
    Balance,
    Transactions: account.totalTxs,
    Percentage: totalSupply ? `${divider(account.balance, totalSupply, 5)}` : 0,
    Staking,
  };
};

export default accountMapper;
