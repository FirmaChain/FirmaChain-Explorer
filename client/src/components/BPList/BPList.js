import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import TableWithIcon from '../TableWithIcon';
import {
  BlockchainActions,
  GlobalActions,
  WidgetActions as w,
} from '../../redux/actionCreators';
import { bpListConfig, bpsInPage } from '../../config';
import {
  bpMapper, divider, ranger, spaceMapper,
} from '../../lib';

import './BPList.scss';


const mappedBPs = (BPs = [], page, totalSupply, bondedTokens) => {
  const BPList = [];
  BPs.forEach((preBP, i) => {
    const BP = bpMapper(preBP);
    BP.Ranking = (page - 1) * bpsInPage + i + 1;
    BP.voteRate = `${divider(BP.votes, [bondedTokens / 100], 2)}%`;
    BP.votes = `${BP.votes} FIRMA`;
    BPList.push(BP);
  });
  return BPList;
};

class BPList extends Component {
  constructor(props) {
    super(props);
    this.getBPs = this.getBPs.bind(this);
  }

  componentDidMount() {
    this.getBPs(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { mode, page, countPerPage, bpList } = this.props;
    if (mode !== nextProps.mode) return true;
    if (page !== nextProps.page) return true;
    if (countPerPage !== nextProps.countPerPage) return true;
    if (bpList !== nextProps.bpList) return true;
    return false;
  }

  componentWillUpdate(nextProps) {
    const { countPerPage, location: { search } } = this.props;
    if (nextProps.location.search !== search) {
      this.getBPs(nextProps);
    }

    if(nextProps.countPerPage !== countPerPage) {
      this.getBPs(nextProps);
    }
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getBPs(nextProps) {
    const props = nextProps || this.props;
    const { location: { search } } = props;
    const { page = 1 } = qs.parse(search);
    const { medState: { numCandidate } } = props;
    const { from, to } = ranger(page, numCandidate, bpsInPage);
    w.loader(BlockchainActions.getBPs({ from, to }));
  }

  render() {
    const {
      bpList,
      mode,
      page,
      totalSupply,
      bondedTokens,
      lang,
    } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          lang={lang}
          titles={bpListConfig.titles}
          data={mappedBPs(bpList, page, totalSupply, bondedTokens)}
          spacing={spaceMapper(bpListConfig.spaces)}
          linkTo={bpListConfig.linkTo}
          centerList={bpListConfig.centerList}
          rightList={bpListConfig.rightList}
        />
      ) : (
        <div className="bpList">
          <TableWithIcon
            type="bp"
            data={mappedBPs(bpList, page, totalSupply, bondedTokens)}
            lang={lang}
            mode={mode}
          />
        </div>
      )
    );
  }
}

BPList.propTypes = {
  bpList: PropTypes.array.isRequired,
  mode: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalSupply: PropTypes.string.isRequired,
  bondedTokens: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  countPerPage: PropTypes.number.isRequired,
};

export default BPList;
