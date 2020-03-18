import React from 'react';
import lottie from 'lottie-web';

import './loading.scss';

import loadingJson from '../../lottie/loading/lottie.json';

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }

  componentDidMount() {
    this.lottie = lottie.loadAnimation({
      container: this.ref, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      animationData: loadingJson // the path to the animation json
    });

    this.lottie.setSpeed(1.3);
    this.lottie.play()
  }

  render() {
      return (<div className="loading">
        <div ref={r => this.ref = r}/>
      </div>);
  }
}

export default Loading;
