import React, { Fragment } from 'react';

import BPList from '../components/BPList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const BPs = props => (
  <div className="content">
    <div className="listTitle">
      <PageInfo title="block-producer-list" />
      <Navigation type="bps" />
    </div>
    <div className="bpsContents">
      <BPList {...props} />
    </div>
    <div className="bpsNavigation">
      <Navigation type="bps" />
    </div>
  </div>
);

export default BPs;
