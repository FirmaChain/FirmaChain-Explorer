import PropTypes from 'prop-types';
import React from 'react';

import BPContainer from '../components/BP';
import PageInfo from '../components/PageInfo';


const Account = ({ location }) => {
  const subject = location.pathname.split('/')[3];
  const BPWrapper = <BPContainer address={subject} />;

  return (
    <div className="account content">
      <div className="bpDetail">
        <PageInfo title="bp-detail" hasBack={true}/>
        { BPWrapper }
      </div>
    </div>
  );
};

Account.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Account;
