import PropTypes from 'prop-types';
import React from 'react';

import AccountContainer from '../components/Account';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';
import TxList from '../components/TxList';

const Account = ({location, isWallet}) => {
  const subject = location.pathname.split('/')[3];
  const AccountWrapper = <AccountContainer address={subject} />;

  return (
    <div className={`account content${isWallet ? ' wallet' : ''}`}>
      <div className="accountDetail">
        <PageInfo title="account-detail" />
        {AccountWrapper}
      </div>
      <div className="blockDetailTx">
        <div className="listTitle">
          <PageInfo title="transactions-list" />
          <Navigation type="account" />
        </div>
        <TxList type="account" address={subject} />
      </div>
      <div className="contentNavigation">
        <Navigation type="account" />
      </div>
    </div>
  );
};

Account.propTypes = {
  location: PropTypes.object.isRequired,
  isWallet: PropTypes.bool
};

export default Account;
