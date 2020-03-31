import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { accountMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


class Account extends Component {
  constructor(props) {
    super(props);
    this.callAccount = this.callAccount.bind(this);
  }

  componentDidMount() {
    this.callAccount();
  }

  shouldComponentUpdate(nextProps) {
    const { account, address, language } = this.props;
    if (address !== nextProps.address) {
      this.callAccount(nextProps);
      return true;
    }
    if (account !== nextProps.account) return true;
    if (language !== nextProps.language) return true;
    return false;
  }

  callAccount(nextProps) {
    let { address } = this.props;
    if (nextProps) {
      ({ address } = nextProps);
    }

    w.loader(
      BlockchainActions
        .getAccount(address),
    );
  }

  render() {
    const { account, totalSupply, language, mode } = this.props;
    return account && (
      <DetailWrapper
        data={accountMapper(account, totalSupply)}
        lang={language}
        mode={mode}
        type="account"
      />
    );
  }
}

Account.propTypes = {
  account: PropTypes.object,
  address: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  totalSupply: PropTypes.string
};

Account.defaultProps = {
  account: null,
  totalSupply: null
};

export default Account;
