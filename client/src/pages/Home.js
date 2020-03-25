import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';

import LiveBlocks from '../components/LiveBlocks';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTxs from '../components/LiveTxs';

import '../variable.scss';
import './pages.scss';
import './mobile.scss';
import Chart from "../components/Chart/Chart";
import {connect} from "react-redux";

const ChartView = (mode, intl, analytics) => {
  if (mode === 0) {
    return (
      <div className="chartWrapper">
        <div className="card">
          <div className="name">
            <FormattedMessage id="firmaPrice" />
          </div>
          <div className="chart">
            <Chart id="priceChart" target="price" height={170} data={analytics} />
          </div>
        </div>
        <div className="card">
          <div className="name">
            <FormattedMessage id="blockCount" />
          </div>
          <div className="chart">
            <Chart id="blockChart" target="block" height={170} data={analytics} />
          </div>
        </div>
        <div className="card">
          <div className="name">
            <FormattedMessage id="txCount" />
          </div>
          <div className="chart">
            <Chart id="txChart" target="tx" height={170} data={analytics} />
          </div>
        </div>
      </div>
    );
  } else {
    let [tabIndex, setTab] = useState(0);
    return (
      <div className="chartWrapper">
        <div className="tab">
          <div className={`tab-item${tabIndex === 0 ? ' selected' : ''}`} onClick={() => setTab(0)}>
            <FormattedMessage id="firmaPrice" />
          </div>
          <div className={`tab-item${tabIndex === 1 ? ' selected' : ''}`} onClick={() => setTab(1)}>
            <FormattedMessage id="blockCount" />
          </div>
          <div className={`tab-item${tabIndex === 2 ? ' selected' : ''}`} onClick={() => setTab(2)}>
            <FormattedMessage id="txCount" />
          </div>
        </div>
        <div className="card">
          <div className="chart">
            {
              tabIndex === 0 && <Chart id="priceChart" target="price" height={170} data={analytics} />
            }
            {
              tabIndex === 1 && <Chart id="blockChart" target="block" height={170} data={analytics} />
            }
            {
              tabIndex === 2 && <Chart id="txChart" target="tx" height={170} data={analytics} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const Home = ({mode, intl, analytics}) => (
  <div className="homeContentWrapper">
    <div className="top">
      <div className="logoBg" />
      <div className="content">
        <div className="title">BLOCKCHAIN EXPLORER</div>
        <div className="notice">
          <img src="/image/icon/ico_notice.svg" alt="" />
          <span>토큰스왑에 대해 알려드립니다.</span>
          <img src="/image/icon/arrow_next.svg" alt="" />
        </div>
      </div>
    </div>
    <div className="content">
      {ChartView(mode, intl, analytics)}
      <div className="homeLive">
        <LiveInfoWrapper title={intl.formatMessage({id: 'recentBlock'})} type="block">
          <LiveBlocks />
        </LiveInfoWrapper>
        <div className="divider" />
        <LiveInfoWrapper title={intl.formatMessage({id: 'recentTx'})} type="tx">
          <LiveTxs />
        </LiveInfoWrapper>
      </div>
    </div>
    <div className="banner wallet">
      <img src="/image/bg/wallet_left.png" alt="" />
      <div>
        <div>{mode === 0 ? 'WALLET DOWNLOAD' : 'FIRMACHAIN WALLET'}</div>
        <div>
          <span>{'안전하고 간단하게 FIRMA를 보내고 받을 수 있습니다.'}<br/><span> {mode !== 0 ? 'Wallet 다운로드는 PC에서만 가능합니다.' : ''}</span></span>
          <div className="download">
            <span>WINDOWS</span>
            <span>MAC</span>
          </div>
        </div>
      </div>

      <img src="/image/bg/wallet_right.png" alt="" />
    </div>
  </div>
);

Home.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.number,
  analytics: PropTypes.array
};

const mapStateToProps = ({global, ticker}) => {
  return {
    analytics: ticker.analytics,
    mode: global.mode,
  };
};


export default connect(mapStateToProps)(injectIntl(Home))
