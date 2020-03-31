import { connect } from 'react-redux';

import Navigation from './Navigation';


const mapStateToProps = ({ blockchain, global }) => ({
  account: blockchain.account,
  numAccounts: blockchain.medState.numAccount,
  numBlocks: blockchain.medState.height,
  numCandidates: blockchain.medState.numCandidate,
  numTxs: blockchain.medState.numTx,
  txs: blockchain.txs,
  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(Navigation);
