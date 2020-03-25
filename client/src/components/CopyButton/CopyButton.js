import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";

import './CopyButton.scss';

class CopyButton extends React.Component {
  constructor() {
    super();
    this.state = {
      isCopied: false,
    }
  }

  onCopy = () => {
    this.setState({isCopied: true});

    setTimeout(() => {
      this.setState({isCopied: false})
    }, 3000)
  };

  render() {
    return (
      <CopyToClipboard text={this.props.value} onCopy={this.onCopy}>
        <div className={`copyButton${this.state.isCopied ? ' copied' : ''}`}></div>
      </CopyToClipboard>
    );
  }
}

export default CopyButton;
