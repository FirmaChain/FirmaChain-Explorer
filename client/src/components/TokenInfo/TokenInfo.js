import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import LiveTickerWrapper from '../LiveTickerWrapper';

import './tokenInfo.scss';


const TokenInfo = ({ intl, mode }) => (
  <div className={cx('tokenInfo', { mobile: mode === 2 })}>
    <div className="bg" />
    {
      mode !== 2 && <img src="/image/icon/bg-chain@3x.png" alt="backgroundImg" />
    }
    <LiveTickerWrapper
      title={intl.formatMessage({ id: 'firmaPrice' })}
      suffix="USD"
      side="left"
    />
    <div className="verticalLine" />
    <LiveTickerWrapper
      title={intl.formatMessage({ id: 'firmaSupply' })}
      suffix="FIRMA"
      side="right"
    />
  </div>
);

TokenInfo.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.number.isRequired,
};

export default injectIntl(TokenInfo);
