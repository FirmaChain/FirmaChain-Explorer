import cx from 'classnames';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { BlockchainActions, GlobalActions } from '../redux/actionCreators';
import { countryList } from '../config';


class Layout extends Component {
  componentWillMount() {
    const { location: { pathname: path } } = this.props;
    if (path.split('/').length <= 2) {
      GlobalActions.moveUrl(path.split('/')[1]);
    } else {
      GlobalActions.moveUrl(path.split('/')[2]);
    }
  }

  componentWillUpdate(nextProps) {
    const { loading, location: { pathname: path, search: prevSearch } } = this.props;
    const { location: { pathname: newPath, search: newSearch } } = nextProps;
    if (path !== newPath || prevSearch !== newSearch) {
      BlockchainActions.getMedState();
      GlobalActions.moveUrl(newPath.split('/')[2]);
    }
    if (!loading && nextProps.loading) GlobalActions.openModal({ modalType: 'Loading' });
    else if (loading && !nextProps.loading) GlobalActions.closeModal();
    const page = parseInt(qs.parse(window.location.search).page, 10) || 1;
    if (this.props.lang !== nextProps.lang) {
      nextProps.history.push(`${newPath.replace(`/${this.props.lang}/`, `/${nextProps.lang}/`)}${newSearch}`);
    }
    GlobalActions.movePage(page);
  }

  render() {
    const currentPath = window.location.pathname.split('/')[1];
    const { children, lang, mode } = this.props;
    if (!countryList.includes(currentPath)) return <Redirect to={`/${lang}/`} />;

    return (
      <div className={cx('layout', { mobile: mode === 2 })}>
        <div className="layoutInner">
          { children }
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element,
  lang: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object,
  mode: PropTypes.number.isRequired,
};

Layout.defaultProps = {
  children: React.createElement('div'),
  location: {},
};

export default withRouter(Layout);
