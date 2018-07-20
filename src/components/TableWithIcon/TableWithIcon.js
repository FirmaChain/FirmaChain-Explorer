import React from 'react';

import ContentWrapper from '../ContentWrapper';
import { blockMapper, txMapper, accountMapper } from '../../lib';

import './TableWithIcon.scss';


const titles = {
  block: ['Block Hash', 'Time Stamp', 'BP'],
  tx: ['Transaction Hash', 'Time Stamp'],
  account: [],
};

const TableWithIcon = ({ type, data }) => {
  let dataList = [];
  const titleList = type ? titles[type] : [];
  if (data) {
    switch (type) {
      case 'block':
        data.forEach(datum => dataList.push(blockMapper(datum)));
        break;
      case 'tx':
        data.forEach(datum => dataList.push(txMapper(datum)));
        break;
      case 'account':
        data.forEach(datum => dataList.push(accountMapper(datum)));
        break;
      default:
        break;
    }
  }

  return (
    <div className="blocks">
      {
        dataList.map((data, i) => (
          <ContentWrapper
            type={type}
            data={data}
            titles={titleList}
            key={i}
          />
        ))
      }
    </div>
  );
};

export default TableWithIcon;
