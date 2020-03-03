import React, { Fragment } from 'react';

import AccountList from '../components/AccountList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Accounts = props => (
  <div className="content">
    <div className="listTitle">
      <PageInfo title="account-list" />
      <Navigation type="accounts" />
    </div>
    <div className="accountsContents">
      <AccountList {...props} />
    </div>
    <div className="accountsNavigation">
      <Navigation type="accounts" />
    </div>
  </div>
);

export default Accounts;
