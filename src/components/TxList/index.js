import { connect } from 'react-redux';

import TxList from './TxList';


const mapStateToProps = ({ blockchain, global }) => ({
  medState: blockchain.medState,
  txList: blockchain.txList,
  txsFromBlock: blockchain.txsFromBlock,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(TxList);
