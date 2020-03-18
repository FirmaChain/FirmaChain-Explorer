import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import './LiveInfoWrapper.scss';


const LiveInfoWrapper = ({
  lang,
  mode,
  title,
  type,
  children,
}) => (
  <div className={cx('liveInfoWrapper', { mobile: true })}>
    <div className="liveInfoWrapperInfo">
      <span>{title}</span>
      <NavLink to={`/${lang}/${type}s`}>
        <img src="/image/icon/arrow_next.svg" alt=""/>
      </NavLink>
    </div>
    <div className="liveInfoWrapperContentBox">
      {children}
    </div>
  </div>
);

LiveInfoWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default LiveInfoWrapper;
