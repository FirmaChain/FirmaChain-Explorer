const txMapper = (tx) => {
  if(tx.amount === null || tx.amount === undefined)
    tx.amount = 0;
  const Amount = `${tx.amount} FIRMA`;

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
