import { divider } from './bigNumCalculator';

const txMapper = (tx) => {
  if(tx.amount === null || tx.amount === undefined)
    tx.amount = 0;
  
  const tempAmount = divider(tx.amount, [10 ** 6], 6).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Amount = `${tempAmount.join('.')} FIRMA`;
  

  return {
    'Block Height': tx.blockHeight,
    'Transaction Hash': tx.txHash,
    Status: tx.executed ? 'Success' : 'Fail',
    From: tx.fromAccount,
    To: tx.toAccount,
    Type: tx.type ? tx.type.split('/')[1] : '',
    Amount,
    Message: tx.memo,
    // Nonce: tx.nonce,
    // Signature: tx.sign,
  };
};

export default txMapper;
