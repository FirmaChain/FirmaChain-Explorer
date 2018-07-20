import { connect } from 'react-redux';

import Account from './Account';


const mapStateToProps = ({ blockchain, widget }) => ({
  account: blockchain.account,

  loading: widget.loading,
});

export default connect(mapStateToProps)(Account);
