import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { listMapper, ranger, spaceMapper } from '../../lib';
import {txCenterList, txCopyList, txLinkTo, txRightList, txSpaceList, txTitleList} from '../../config';

import './TxList.scss';


class TxList extends Component {
  constructor(props) {
    super(props);
    this.getTxs = this.getTxs.bind(this);
  }

  componentWillMount() {
    const { type } = this.props;
    if (type === 'txs') this.getTxs();
  }

  componentDidUpdate(prevProps) {
    const { account, page, type, countPerPage } = this.props;
    if (page !== prevProps.page) {
      this.getList(type, account);
    }

    if(countPerPage !== prevProps.countPerPage) {
      this.getList(type, account);
    }

    if (prevProps.account !== account) this.getAccTxs();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getList(type, account) {
    if (type === 'txs') this.getTxs();
    if (type === 'account' && account) this.getAccTxs();
  }

  getTxs() {
    const { page, countPerPage, medState: { numTx } } = this.props;
    const { from, to } = ranger(page, numTx, countPerPage);
    w.loader(BlockchainActions.getTxs({ from, to }));
  }

  getAccTxs() {
    const { account, countPerPage, page } = this.props;
    const { from, to } = ranger(page, account.totalTxs, countPerPage);
    w.loader(BlockchainActions.getAccountDetail({
      address: account.address,
      from,
      to,
    }));
  }

  render() {
    const {
      mode,
      page,
      txList,
      txs,
      type,
      lang,
      countPerPage
    } = this.props;
    let titles = txTitleList[mode === 0 ? 'desktop' : 'mobile'];
    let spaces = txSpaceList[mode === 0 ? 'desktop' : 'mobile'];
    const { from, to } = ranger(page, txs.length, countPerPage);

    if(type === 'block') {
      titles = titles.filter(x => x !== 'Block Height');
      spaces = spaces.slice(1, spaces.length);
      //spaces.splice(0, 1);
    }

    return (
      <div className="txList">
        {
          (mode !== 2 && type !== 'txs') && (
            <ListWrapper
              lang={lang}
              titles={titles}
              data={listMapper(type === 'block' ? txs.slice(from, to) : txs, 'tx')}
              spacing={spaceMapper(spaces)}
              linkTo={txLinkTo}
              centerList={txCenterList}
              rightList={txRightList}
              copyList={txCopyList}
            />
          )
        }
        {
          (mode === 2 && type !== 'txs') && (
            <ListWrapper
              lang={lang}
              titles={['Transaction Hash']}
              data={listMapper(type === 'block' ? txs.slice(from, to) : txs, 'tx')}
              spacing={spaceMapper([1])}
              linkTo={['tx/hash']}
              centerList={txCenterList}
              rightList={txRightList}
              copyList={txCopyList}
            />
          )
        }
        {
          (mode === 2 && type === 'txs') && (
            <TableWithIcon
              type="tx"
              data={txList}
              lang={lang}
              mode={mode}
            />
          )
        }
        {
          (mode !== 2 && type === 'txs') && (
            <ListWrapper
              lang={lang}
              titles={titles}
              data={listMapper(txList, 'tx')}
              spacing={spaceMapper(spaces)}
              linkTo={txLinkTo}
              centerList={txCenterList}
              rightList={txRightList}
              copyList={txCopyList}
            />
          )
        }
      </div>
    );
  }
}

TxList.propTypes = {
  account: PropTypes.object,
  medState: PropTypes.object,
  txList: PropTypes.array.isRequired,
  txs: PropTypes.array.isRequired,

  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

TxList.defaultProps = {
  account: {},
  medState: {},
};

export default TxList;
