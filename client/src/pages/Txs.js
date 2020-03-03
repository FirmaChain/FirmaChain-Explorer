import React, {Fragment} from 'react';

import TxList from '../components/TxList';
import Navigation from '../components/Navigation';
import PageInfo from '../components/PageInfo';


const Txs = () => (
  <div className="content">
    <div className="listTitle">
      <PageInfo title="transactions-list" />
      <Navigation type="txs" />
    </div>
    <div className="txsContents">
      <TxList type="txs" />
    </div>
    <div className="txsNavigation">
      <Navigation type="txs" />
    </div>
  </div>
);

export default Txs;
