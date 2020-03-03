const txMapper = (tx) => {
  if(tx.amount === null || tx.amount === undefined)
    tx.amount = 0;
  const Amount = `${tx.amount} FIRMA`;

  console.log(tx);
  return {
    'Block Height': tx.blockHeight,
    'Transaction Hash': tx.txHash,
    Status: tx.executed ? 'Success' : 'Fail',
    From: tx.fromAccount,
    Message: tx.memo,
    // Nonce: tx.nonce,
    // Signature: tx.sign,
  };
};

export default txMapper;
