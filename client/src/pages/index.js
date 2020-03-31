import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import ReactGA from 'react-ga';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../history';

// Language Setting
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en'; // English
import ko from 'react-intl/locale-data/ko'; // Korean
import zh from 'react-intl/locale-data/zh'; // Chinese
import locale from '../locale';

import Account from './Account';
import Accounts from './Accounts';
import Block from './Block';
import Blocks from './Blocks';
import BP from './BP';
import BPs from './BPs';
import Err404 from './Err404';
import Home from './Home';
import Layout from './Layout';
import Tx from './Tx';
import Txs from './Txs';
import NoResult from "./Search";
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar';

import {countryList} from '../config';
import {
  BlockchainActions,
  GlobalActions,
  TickerActions,
  WidgetActions,
} from '../redux/actionCreators';

addLocaleData([...en, ...ko, ...zh]);
ReactGA.initialize('UA-103757205-4');
ReactGA.pageview(window.location.pathname + window.location.search);


const setLocale = () => {
  const LangList = ['ko', 'zh'];
  const browserLang = navigator.language || navigator.userLanguage;
  let lang = browserLang.split('-')[0];
  if (LangList.indexOf(lang) === -1) lang = 'en';
  const additional = window.location.pathname.split('/')[1];
  if (countryList.indexOf(additional) !== -1) lang = additional;
  GlobalActions.changeLanguage(lang);
};

const setWindowSize = () => {
  GlobalActions.setWindowSize(window.innerWidth);
  window.addEventListener(
    'resize',
    () => GlobalActions.setWindowSize(window.innerWidth),
  );
};

class Pages extends Component {
  componentWillMount() {
    setLocale();
    setWindowSize();
    WidgetActions.loader(
      BlockchainActions
        .getMedState()
        .then(() => TickerActions.getMedxPrice())
        .then(() => TickerActions.getAnalytics())
        .then(() => BlockchainActions.getInitialBlocks({from: 0, to: 4}))
        .then(() => BlockchainActions.subscribe())
        .then(() => GlobalActions.closeModal()),
    );
  }

  render() {
    const {
      isFirstLoad,
      language,
      loading,
      mode,
    } = this.props;

    return (
      <IntlProvider
        locale={language}
        messages={locale[language]}
        textComponent={React.Fragment}
      >
        <Router history={history}>
          {
            isFirstLoad ? (
              <Modal />
            ) : (
              <Fragment>
                <NavBar />
                <Switch>
                  <Layout loading={loading} lang={language} mode={mode}>
                    <Switch>
                      <Route exact path="/:lang/" component={Home} />
                      <Route path="/:lang/account" component={Account} />
                      <Route exact path="/:lang/accounts" component={Accounts} />
                      <Route path="/:lang/block" component={Block} />
                      <Route exact path="/:lang/blocks" component={Blocks} />
                      <Route path="/:lang/bp" component={BP} />
                      <Route exact path="/:lang/bps" component={BPs} />
                      <Route path="/:lang/tx" component={Tx} />
                      <Route exact path="/:lang/txs" component={Txs} />
                      <Route exact path="/:lang/search/:query" component={NoResult} />
                      <Route path="*" component={Err404} />
                    </Switch>
                  </Layout>
                </Switch>
                <Footer />
              </Fragment>
            )
          }
        </Router>
      </IntlProvider>
    );
  }
}

Pages.propTypes = {
  isFirstLoad: PropTypes.bool.isRequired,
  language: PropTypes.oneOf(countryList).isRequired,
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.number.isRequired,
};

const mapStateToProps = ({global, widget}) => ({
  language: global.language,
  mode: global.mode,

  isFirstLoad: widget.isFirstLoad,
  loading: widget.loading,
});

export default connect(mapStateToProps)(Pages);
