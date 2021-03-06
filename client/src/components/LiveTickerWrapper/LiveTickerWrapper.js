import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './LiveTickerWrapper.scss';


const injectComma = supply => supply.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const LiveTickerWrapper = ({
  title,
  suffix,
  medxPrice,
  mode,
  totalSupply,
  side,
}) => (
  <div className={cx('liveTickerWrapperGuide', { mobile: mode === 2, [side]: true })}>
    <div className="liveTickerWrapper">
      <div className="liveTickerWrapperTitle">
        {title}
      </div>
      <div className="liveTickerWrapperContent">
        <div>
          { suffix === 'USD' ? medxPrice.toFixed(5) : injectComma(totalSupply) }
        </div>
        <div className="liveTickerWrapperContentSuffix">
          {suffix}
        </div>
      </div>
    </div>
  </div>
);

LiveTickerWrapper.propTypes = {
  medxPrice: PropTypes.number,
  mode: PropTypes.number.isRequired,
  totalSupply: PropTypes.string,
  side: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

LiveTickerWrapper.defaultProps = {
  medxPrice: 0,
  totalSupply: '0',
};

export default LiveTickerWrapper;
