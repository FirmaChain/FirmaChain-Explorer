import { connect } from 'react-redux';

import TxList from './TxList';


const mapStateToProps = ({ blockchain, global }) => ({
  account: blockchain.account,
  medState: blockchain.medState,
  txList: blockchain.txList,
  txs: blockchain.txs,

  lang: global.language,
  mode: global.mode,
  page: global.page,
  countPerPage: global.countPerPage,
});

export default connect(mapStateToProps)(TxList);
