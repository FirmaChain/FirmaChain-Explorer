import React, { Fragment } from 'react';

import BPList from '../components/BPList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const BP = () => (
  <Fragment>
    <PageInfo title="block-producer-list" />
    <div className="bpsContents">
      <BPList />
    </div>
    <div className="bpsNavigation">
      <Navigation type="bps" />
    </div>
  </Fragment>
);

export default BP;