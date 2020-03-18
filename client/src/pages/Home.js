import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';

import LiveBlocks from '../components/LiveBlocks';
import LiveInfoWrapper from '../components/LiveInfoWrapper';
import LiveTxs from '../components/LiveTxs';

import './pages.scss';
import Chart from "../components/Chart/Chart";
import {connect} from "react-redux";


const Home = ({intl, analytics}) => (
  <div className="homeContentWrapper">
    <div className="top">
      <div className="logoBg" />
      <div className="content">
        <div className="title">BLOCKCHAIN EXPLORER</div>
        <div className="notice">
          <img src="/image/icon/ico_notice.svg" alt="" />
          <span>토큰스왑에 대해 알려드립니다.</span>
          <img src="/image/icon/arrow_notice.svg" alt="" />
        </div>
      </div>
    </div>
    <div className="content">
      <div className="chartWrapper">
        <div className="card">
          <div className="name">
            <FormattedMessage id="firmaPrice" />
          </div>
          <div className="chart">
            <Chart id="priceChart" target="price" data={analytics} />
          </div>
        </div>
        <div className="card">
          <div className="name">
            <FormattedMessage id="blockCount" />
          </div>
          <div className="chart">
            <Chart id="blockChart" target="block" data={analytics} />
          </div>
        </div>
        <div className="card">
          <div className="name">
            <FormattedMessage id="txCount" />
          </div>
          <div className="chart">
            <Chart id="txChart" target="tx" data={analytics} />
          </div>
        </div>
      </div>
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
        <div>WALLET DOWNLOAD</div>
        <div>
          <span>안전하고 간단하게 FIRMA를 보내고 받을 수 있습니다.</span>
          <div>
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
  analytics: PropTypes.array
};

const mapStateToProps = ({ticker}) => {
  return {
    analytics: ticker.analytics
  };
};


export default connect(mapStateToProps)(injectIntl(Home))
