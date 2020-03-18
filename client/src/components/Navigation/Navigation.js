import PropTypes from 'prop-types';
import qs from 'query-string';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PageRangeDropdown from "./PageRangeDropdown";

import history from '../../history';

import {GlobalActions} from '../../redux/actionCreators';
import {navigationDisplay} from '../../config';

import './Navigation.scss';
import {connect} from "react-redux";

const moveToPage = pageNum => GlobalActions.movePage(pageNum);
const pages = (currentPage, lastPage, pageDisplay, countPerPage, curPath) => {
  // eslint-disable-next-line no-param-reassign
  if (lastPage < pageDisplay) pageDisplay = lastPage;
  const pageNation = [];
  let startPage = currentPage - Math.floor(pageDisplay / 2);
  if (startPage < 1) startPage = 1;
  if (currentPage + Math.floor(pageDisplay / 2) > lastPage) startPage = lastPage - pageDisplay + 1;
  for (let i = startPage; i < startPage + pageDisplay; i += 1) {
    pageNation.push(<NavLink to={`${curPath}?page=${i}`} key={i}>
      <button onClick={() => moveToPage(i)} type="button" className={currentPage === i ? 'active' : null}>
        {i}
      </button>
    </NavLink>);
  }
  return pageNation;
};

class Navigation extends Component {
  lastPage() {
    const {
      numAccounts,
      numBlocks,
      numCandidates,
      numTxs,

      account,
      txs,
      type,

      countPerPage
    } = this.props;

    switch (type) {
      case 'account':
        return Math.ceil(account ? account.totalTxs / countPerPage : 0);
      case 'accounts':
        return Math.ceil(numAccounts / countPerPage);
      case 'block':
        return Math.ceil(txs.length / countPerPage);
      case 'blocks':
        return Math.ceil(numBlocks / countPerPage);
      case 'txs':
        return Math.ceil(numTxs / countPerPage);
      case 'bps':
        return Math.ceil(numCandidates / countPerPage);
      default:
        return 1;
    }
  }

  getCurrentPage = () => {
    return parseInt(qs.parse(window.location.search).page, 10) || 1;
  }

  setContentsInPage = (count) => {
    GlobalActions.setCountPerPage(Number(count));
  }

  render() {
    const {page, countPerPage} = this.props;
    const lastPage = this.lastPage();
    const qpage = this.getCurrentPage();
    const path = window.location.pathname;

    console.log('count per page', countPerPage)

    return (
      <div className="navigation">
        <PageRangeDropdown
          current={countPerPage}
          onChange={o => this.setContentsInPage(o.value)}
        />
        <NavLink to={`${path}?page=1`}>
          <button onClick={() => moveToPage(1)} type="button">
            <img src="/image/icon/arrow_quick_prev.svg" alt="<<" />
          </button>
        </NavLink>
        <NavLink to={`${path}?page=${qpage <= 1 ? 1 : qpage - 1}`}>
          <button onClick={() => moveToPage(page - 1)} type="button" disabled={page === 1}>
            <img src="/image/icon/arrow_prev.svg" alt="<" />
          </button>
        </NavLink>
        {
          pages(page, lastPage, navigationDisplay, countPerPage, path)
        }
        <NavLink to={`${path}?page=${qpage === lastPage ? lastPage : qpage + 1}`}>
          <button onClick={() => moveToPage(page + 1)} type="button" disabled={page === lastPage}>
            <img src="/image/icon/arrow_next.svg" alt=">" />
          </button>
        </NavLink>
        <NavLink to={`${path}?page=${lastPage}`}>
          <button onClick={() => moveToPage(lastPage)} type="button">
            <img src="/image/icon/arrow_quick_next.svg" alt=">>" />
          </button>
        </NavLink>
      </div>
    );
  }
}

Navigation.propTypes = {
  account: PropTypes.object,
  numAccounts: PropTypes.number,
  numCandidates: PropTypes.number,
  numTxs: PropTypes.number,
  numBlocks: PropTypes.number,
  txs: PropTypes.array,
  page: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    'account',
    'accounts',
    'block',
    'blocks',
    'bps',
    'tx',
    'txs',
  ]).isRequired,
};

Navigation.defaultProps = {
  account: {},
  numAccounts: 0,
  numCandidates: 0,
  numTxs: 0,
  numBlocks: 0,
  txs: [],
};

const mapStateToProps = ({global}) => {
  return {
    countPerPage: global.countPerPage
  }
}
export default connect(mapStateToProps)(Navigation);
