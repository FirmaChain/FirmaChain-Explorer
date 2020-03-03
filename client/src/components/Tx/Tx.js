import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DetailWrapper from '../DetailWrapper';
import { txMapper } from '../../lib';
import { BlockchainActions, WidgetActions as w } from '../../redux/actionCreators';


class Tx extends Component {
  constructor(props) {
    super(props);
    this.callTx = this.callTx.bind(this);
  }

  componentDidMount() {
    this.callTx();
  }

  callTx() {
    const { hash } = this.props;
    w.loader(
      BlockchainActions.getTx(hash),
    );
  }

  render() {
    const { tx, language, mode } = this.props;

    return tx && (
        <DetailWrapper
          data={txMapper(tx)}
          lang={language}
          mode={mode}
          type="tx"
        />
    );
  }
}

Tx.propTypes = {
  hash: PropTypes.string.isRequired,
  tx: PropTypes.object,
  language: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
};

Tx.defaultProps = {
  tx: null,
};

export default Tx;
