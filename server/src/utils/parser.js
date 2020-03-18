const parseBlock = block => ({
  data: block,
  hash: block.hash,
  height: +block.height,
  id: +block.height,
});

const parseTx = (block, tx) => ({
  blockHeight: block.height,
  blockId: block.id,
  data: tx,
  executed: tx.executed,
  fromAccount: tx.fromAccount,
  onChain: tx.onChain,
  toAccount: tx.toAccount,
  txHash: tx.txHash,
  timestamp: block.data.timestamp,
});

const parseAccount = account => ({
  alias: account.alias || null,
  balance: account.balance,
  candidateId: account.candidate_id || null,
  data: account,
  staking: account.staking,
});

const parseCandidate = candidate => ({
  address: candidate.operator_address,
  consensusPubKey: candidate.consensus_pubkey,
  jailed: candidate.jailed,
  votes: candidate.tokens,

  data: {
    commission: candidate.commission,
    description: candidate.description,
  },
});

export {
  parseBlock,
  parseTx,
  parseAccount,
  parseCandidate,
};
