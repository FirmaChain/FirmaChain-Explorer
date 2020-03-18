import { connect } from 'react-redux';

import BPList from './BPList';


const mapStateToProps = ({ blockchain, global }) => ({
  bpList: blockchain.bpList,
  totalSupply: blockchain.totalSupply,
  bondedTokens: blockchain.bondedTokens,
  medState: blockchain.medState,

  lang: global.language,
  mode: global.mode,
  page: global.page,
  countPerPage: global.countPerPage,
});

export default connect(mapStateToProps)(BPList);
