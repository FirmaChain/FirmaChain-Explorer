import { connect } from 'react-redux';

import BlockList from './BlockList';


const mapStateToProps = ({ blockchain, global }) => ({
  blockList: blockchain.blockList,
  medState: blockchain.medState,

  lang: global.language,
  mode: global.mode,
  page: global.page,
  countPerPage: global.countPerPage,
});

export default connect(mapStateToProps)(BlockList);
