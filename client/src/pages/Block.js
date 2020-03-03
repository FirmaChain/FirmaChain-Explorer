import PropTypes from 'prop-types';
import React from 'react';

import BlockContainer from '../components/Block';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';
import TxList from '../components/TxList';
import { subjectDistinguisher } from '../lib';

// location.pathname => /block/hash/e1197cb1845600ff30fcff3cca3bb2e6dd084981a9c7c235d629379df55e1b28
const Block = ({ location }) => {
  const subject = location.pathname.split('/')[3];
  const type = subjectDistinguisher(subject);

  let BlockWrapper = <BlockContainer />;
  if (type === 'hash') {
    BlockWrapper = <BlockContainer hash={subject} />;
  } else if (type === 'height') {
    BlockWrapper = <BlockContainer height={subject} />;
  }

  return (
    <div className="block content">
      <div className="blockDetail">
        <PageInfo title="block-detail-info" />
        { BlockWrapper }
      </div>
      <div className="blockDetailTx">
        <PageInfo title="transactions-in-the-block" />
        <TxList type="block" />
      </div>
      <div className="contentNavigation">
        <Navigation type="block" />
      </div>
    </div>
  );
};

Block.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Block;
