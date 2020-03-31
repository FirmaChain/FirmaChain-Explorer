import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux";
import {GlobalActions} from "../redux/actionCreators";

import history from '../history';
import lottie from 'lottie-web';
import loadingJson from '../lottie/loading/lottie.json';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const params = this.props.match.params;
    this.searchQuery(params.query)

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const params = this.props.match.params;

    if (params.query !== prevProps.match.params.query) {
      this.searchQuery(params.query);
    }

    if (prevProps.searching && !this.props.searching && this.props.searchResult.length > 0) {
      const search = this.props.searchResult[0];
      history.push(`/${this.props.lang}/${search.type}/${search.data}`);
    }

    if(this.props.searching) {
      this.lottie = lottie.loadAnimation({
        container: this.ref, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        animationData: loadingJson // the path to the animation json
      });

      this.lottie.setSpeed(1.3);
      this.lottie.play()
    }else{
      this.lottie.stop();
    }
  }

  searchQuery = (query) => {
    GlobalActions.setSearchText(query)
  }

  render() {
    return (
      <div className="search">
        <div className="content">
          {
            this.props.searching && (
              <div ref={r => this.ref = r}/>
            )
          }
          {
            (!this.props.searching && this.props.searchResult.length === 0) && (
              <div>
                <div className="q">{this.props.match.params.query}</div>
                <div className="desc">
                  <FormattedMessage id="searchNoResult" />
                </div>
                <button onClick={() => {history.push(`/${this.props.lang}/`)}}>
                  <FormattedMessage id="returnToMain" />
                </button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({global}) => ({
  lang: global.language,
  search: global.search,
  searching: global.searching,
  searchResult: global.searchResult,
});

export default connect(mapStateToProps)(Search);
