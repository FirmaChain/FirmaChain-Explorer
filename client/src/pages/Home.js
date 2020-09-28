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

const Notice = (lang) => {
  if(lang !== 'ko')
    lang = 'en';

  const notice = {
    en: {
      title: 'FCT Token Swap Guide',
      link: 'https://medium.com/firmachain/notice-fct-token-swap-guide-c007c847a99f'
    },
    ko: {
      title: 'FCT Token Swap 안내',
      link: 'https://medium.com/firmachain/%EA%B3%B5%EC%A7%80-fct-token-swap%EC%95%88%EB%82%B4-df423720aae1'
    }
  }

  return <div onClick={() => {window.open(notice[lang].link)}}>
    {notice[lang].title}
  </div>
}

const Home = ({mode, intl, analytics, lang}) => (
  <div className="homeContentWrapper">
    <div className="top">
      <div className="logoBg" />
      <div className="content">
        <div className="title">BLOCKCHAIN EXPLORER</div>
        {/*<div className="notice">*/}
        {/*  <img src="/image/icon/ico_notice.svg" alt="" />*/}
        {/*  <span>{Notice(lang)}</span>*/}
        {/*  <img src="/image/icon/arrow_next.svg" alt="" />*/}
        {/*</div>*/}
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
      <img src="/image/bg/wallet_left.svg" alt="" />
      <div>
        <div>{mode === 0 ? 'WALLET DOWNLOAD' : 'FIRMACHAIN WALLET'}</div>
        <div>
          <span><FormattedMessage id="walletDown1"/><br/><span> {mode !== 0 ? <FormattedMessage id="walletDown2"/> : ''}</span></span>
          <div className="download">
            <span onClick={() => {window.open('https://drive.google.com/open?id=12MFYHiqLjohUn_Ggy2Z76dXNTgIMfOQv')}}>MACINTOSH</span>
            <span className="divider">|</span>
            <span onClick={() => {window.open('https://drive.google.com/open?id=1813q4KlS7A6QUfImhpDqF1bJEfTdzJtG')}}>WINDOWS</span>
          </div>
        </div>
      </div>

      <img src="/image/bg/wallet_right.svg" alt="" />
    </div>
  </div>
);

Home.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.number,
  analytics: PropTypes.array,
  lang: PropTypes.string
};

const mapStateToProps = ({global, ticker}) => {
  return {
    analytics: ticker.analytics,
    mode: global.mode,
    lang: global.language,
  };
};


export default connect(mapStateToProps)(injectIntl(Home))
