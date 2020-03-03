import React, { Fragment } from 'react';

import BlockList from '../components/BlockList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Blocks = props => (
  <div className="content">
    <div className="listTitle">
      <PageInfo title="block-list" />
      <Navigation type="blocks" />
    </div>
    <div className="blocksContents">
      <BlockList {...props} />
    </div>
    <Navigation type="blocks" />
  </div>
);

export default Blocks;
