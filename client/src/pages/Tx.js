import PropTypes from 'prop-types';
import React from 'react';

import PageInfo from '../components/PageInfo';
import TxContainer from '../components/Tx';


const Tx = ({ location }) => {
  const subject = location.pathname.split('/')[3];
  const TxWrapper = <TxContainer hash={subject} />;

  return (
    <div className="tx content">
      <div className="txDetail">
        <PageInfo title="transaction-detail-info" />
        { TxWrapper }
      </div>
    </div>
  );
};

Tx.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Tx;
