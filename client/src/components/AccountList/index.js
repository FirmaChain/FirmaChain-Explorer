import { connect } from 'react-redux';

import AccountList from './AccountList';


const mapStateToProps = ({ blockchain, global }) => ({
  accountList: blockchain.accountList,
  totalSupply: blockchain.totalSupply,
  medState: blockchain.medState,

  lang: global.language,
  mode: global.mode,
  page: global.page,
  countPerPage: global.countPerPage,
});

export default connect(mapStateToProps)(AccountList);
