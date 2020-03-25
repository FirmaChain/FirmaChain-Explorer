import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import TableWithIcon from '../TableWithIcon';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import {blockListConfig, txCopyList} from '../../config';
import { blockMapper, ranger, spaceMapper } from '../../lib';

import './BlockList.scss';


const mappedBlocks = (blocks) => {
  const blockList = [];
  blocks.forEach(block => blockList.push(blockMapper(block)));
  return blockList;
};

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.getBlocks = this.getBlocks.bind(this);
  }

  componentDidMount() {
    this.getBlocks(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    if (props.mode !== nextProps.mode) return true;
    if (props.page !== nextProps.page) return true;
    if (props.countPerPage !== nextProps.countPerPage) return true;
    if (props.blockList !== nextProps.blockList) return true;
    return false;
  }

  componentWillUpdate(nextProps) {
    const { countPerPage, location: { search } } = this.props;
    if (nextProps.location.search !== search) {
      this.getBlocks(nextProps);
    }

    if(countPerPage !== nextProps.countPerPage) {
      this.getBlocks(nextProps);
    }
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getBlocks(nextProps) {
    const props = nextProps || this.props;
    const { location: { search } } = props;
    const { page = 1 } = qs.parse(search);
    const { medState: { height } } = props;
    const { from, to } = ranger(page, height, props.countPerPage);
    w.loader(
      BlockchainActions
        .getBlocks({ from, to }),
    );
  }

  render() {
    const { blockList, lang, mode } = this.props;

    return (
      mode !== 2 ? (
        <ListWrapper
          lang={lang}
          titles={mode === 0 ? blockListConfig.titles : blockListConfig.mtitles}
          data={mappedBlocks(blockList)}
          spacing={spaceMapper(mode === 0 ? blockListConfig.spaces : blockListConfig.mspaces)}
          linkTo={blockListConfig.linkTo}
          centerList={blockListConfig.centerList}
          rightList={blockListConfig.rightList}
          copyList={blockListConfig.copy}
        />
      ) : (
        <div className="blockList">
          <TableWithIcon
            type="block"
            data={blockList}
            lang={lang}
            mode={mode}
          />
        </div>
      )
    );
  }
}

BlockList.propTypes = {
  lang: PropTypes.string.isRequired,
  blockList: PropTypes.array.isRequired,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  countPerPage: PropTypes.number.isRequired
};

export default BlockList;
