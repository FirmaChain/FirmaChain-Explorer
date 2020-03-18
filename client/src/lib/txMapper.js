const txMapper = (tx) => {
  if(tx.amount === null || tx.amount === undefined)
    tx.amount = 0;
  const Amount = `${tx.amount} FIRMA`;

  let type = 'Unknown';
  if(tx.msgs && tx.msgs.length > 0) {
    type = tx.msgs[0].type.replace('cosmos-sdk/', '')
  }

  return {
    'Block Height': tx.blockHeight,
    'Transaction Hash': tx.txHash,
    'Time Stamp': tx.timestamp,
    Status: tx.executed ? 'Success' : 'Fail',
    From: tx.fromAccount,
    Memo: tx.memo,
    Fee: tx.fee,
    Messages: tx.msgs,
    Type: type
    // Nonce: tx.nonce,
    // Signature: tx.sign,
  };
};

export default txMapper;
