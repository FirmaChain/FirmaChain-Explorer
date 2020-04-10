import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import history from "../../history";

import './PageInfo.scss';

const titlize = (string) => {
  let title = '';
  string.split('-').forEach((pre, i) => {
    title = `${title}${pre.charAt(0).toUpperCase()}${pre.slice(1)}`;
  });
  return `${title.charAt(0).toLowerCase()}${title.slice(1)}`;
};

// title : block-list
const PageInfo = ({mode, title, hasBack}) => (
  <div className={cx('pageInfo', {mobile: mode === 2})}>
    {(hasBack && history.length > 2) && (<div className="back" onClick={() => history.goBack()}/>)}
    <FormattedMessage id={titlize(title)} />
  </div>
);

PageInfo.propTypes = {
  mode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  hasBack: PropTypes.bool
};

export default PageInfo;
