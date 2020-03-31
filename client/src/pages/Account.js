import PropTypes from 'prop-types';
import React from 'react';

import AccountContainer from '../components/Account';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';
import TxList from '../components/TxList';

import qs from 'query-string';
import history from "../history";


const Account = ({location}) => {
  const subject = location.pathname.split('/')[3];
  const AccountWrapper = <AccountContainer address={subject} />;

  if (history.location.search) {
    let query = qs.parse(history.location.search);

    if (query.browser === 'explorer') {
      let navbar = document.getElementsByClassName('navBar')[0];
      let footer = document.getElementsByClassName('footer')[0];
      let layout = document.getElementsByClassName('layout')[0];

      if (navbar) {
        navbar.remove();
      }

      if (layout) {
        layout.setAttribute('style', 'padding-top: 0; padding-bottom: 120px;')
      }

      if (footer) {
        footer.remove();
      }
    }
  }

  return (
    <div className="account content">
      <div className="accountDetail">
        <div className="listTitle">
          <PageInfo title="account-detail" />
        </div>
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
};

export default Account;
