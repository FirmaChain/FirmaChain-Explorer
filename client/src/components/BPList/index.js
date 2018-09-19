import { connect } from 'react-redux';

import BPList from './BPList';


const mapStateToProps = ({ blockchain, global }) => ({
  bpList: blockchain.bpList,
  totalSupply: blockchain.totalSupply,
  medState: blockchain.medState,

  mode: global.mode,
  page: global.page,
});

export default connect(mapStateToProps)(BPList);
