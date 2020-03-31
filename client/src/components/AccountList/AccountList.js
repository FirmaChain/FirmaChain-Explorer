import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import TableWithIcon from '../TableWithIcon';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import {accountListConfig, txCopyList} from '../../config';
import { accountMapper, ranger, spaceMapper } from '../../lib';

import './accountList.scss';


const mappedAccounts = (accs, totalSupply) => {
  const accList = [];
  accs.forEach((acc) => {
    const convertedAcc = accountMapper(acc, totalSupply);
    accList.push(convertedAcc);
  });
  return accList;
};

class AccountList extends Component {
  componentDidMount() {
    this.getAccounts(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { mode, page, accountList, countPerPage } = this.props;
    if (mode !== nextProps.mode) return true;
    if (page !== nextProps.page) return true;
    if (accountList !== nextProps.accountList) return true;
    if (countPerPage !== nextProps.countPerPage) return true;
    return false;
  }

  componentWillUpdate(nextProps) {
    const { countPerPage, location: { search } } = this.props;
    if (nextProps.location.search !== search) {
      this.getAccounts(nextProps);
    }

    if(nextProps.countPerPage !== countPerPage) {
      this.getAccounts(nextProps);
    }
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getAccounts(nextProps) {
    const props = nextProps || this.props;
    const { location: { search } } = props;
    const { page = 1 } = qs.parse(search);
    const { medState: { numAccount } } = props;
    const { from, to } = ranger(page, numAccount, props.countPerPage);
    w.loader(BlockchainActions.getAccounts({ from, to }));
  }

  render() {
    const {
      accountList,
      mode,
      totalSupply,
      lang,
    } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          lang={lang}
          titles={mode === 0 ? accountListConfig.titles : accountListConfig.mtitles}
          data={mappedAccounts(accountList, totalSupply)}
          spacing={spaceMapper(mode === 0 ? accountListConfig.spaces : accountListConfig.mspaces)}
          centerList={accountListConfig.centerList}
          rightList={accountListConfig.rightList}
          linkTo={accountListConfig.linkTo}
          copyList={accountListConfig.copy}
        />
      ) : (
        <div className="accountList">
          <TableWithIcon
            type="account"
            data={accountList}
            totalSupply={totalSupply}
            mode={mode}
            lang={lang}
          />
        </div>
      )
    );
  }
}

AccountList.propTypes = {
  accountList: PropTypes.array,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalSupply: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

AccountList.defaultProps = {
  accountList: [],
};

export default AccountList;
