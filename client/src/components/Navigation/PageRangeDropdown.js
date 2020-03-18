import PropTypes from 'prop-types';
import React from 'react';
import {sorter} from '../../lib';

import Dropdown from 'react-dropdown';
import './PageRangeDropdown.scss';
import {injectIntl, intlShape} from "react-intl";

const PageRangeDropdown = ({intl, current, onChange}) => {
  const options = [
    {value: 10, label: intl.formatMessage({id: 'pageRange10'})},
    {value: 25, label: intl.formatMessage({id: 'pageRange25'})},
    {value: 50, label: intl.formatMessage({id: 'pageRange50'})},
    {value: 100, label: intl.formatMessage({id: 'pageRange100'})}
  ];

  let value = options.find(x => x.value.toString() === current.toString());
  if (!value)
    value = options[0];

  return (
    <Dropdown
      options={options}
      onChange={onChange}
      value={value} />
  );
}

PageRangeDropdown.propTypes = {
  intl: intlShape.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

PageRangeDropdown.defaultProps = {
  current: 25,
};

export default injectIntl(PageRangeDropdown);
