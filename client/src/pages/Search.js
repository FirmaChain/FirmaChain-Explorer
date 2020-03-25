import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux";
import {GlobalActions} from "../redux/actionCreators";

import history from '../history';

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
              <div className="loading">
                Loading...
              </div>
            )
          }
          {
            (!this.props.searching && this.props.searchResult.length === 0) && (
              <div>
                <div className="q">{this.props.match.params.query}</div>
                <div className="desc">
                  <FormattedMessage id="searchNoResult" />
                </div>
                <button>메인으로 돌아가기</button>
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
