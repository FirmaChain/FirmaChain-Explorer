import PropTypes from 'prop-types';
import React, {useState} from 'react';

import SimpleWrapper from '../SimpleWrapper';
import {GlobalActions} from '../../redux/actionCreators';
import {injectIntl, intlShape} from 'react-intl';
import history from '../../history';

import './SearchBar.scss';

const search = (query) => {

}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);


    this.intl = props.intl;
    this.type = props.type;

    this.state = {
      searchText: '',
    }
  }

  goSearch = () => {
    if(!this.state.searchText.trim()) {
      return alert(this.props.intl.formatMessage({id: 'pleaseKeyword'}));
    }
    history.push(`/${this.props.lang}/search/${this.state.searchText}`)

    this.setSearchText('');
  }

  setSearchText = (text) => {
    this.setState({searchText: text});
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.goSearch();
    }
  }

  render() {
    return (
      <div className="searchBar" id={this.type}>
        <div className="searchBarSearch">
          <input
            placeholder={this.intl.formatMessage({id: 'searchLabel'})}
            onKeyPress={this.onKeyPress}
            value={this.state.searchText}
            onChange={(e) => {
              this.setSearchText(e.target.value);
            }}
          />
          <div className="searchBarIcon" onClick={this.goSearch}>
            <div alt="searchLogo" />
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  intl: intlShape.isRequired,
  lang: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  search: PropTypes.string.isRequired,
  searchResult: PropTypes.array,
  type: PropTypes.string,
};

SearchBar.defaultProps = {
  focus: false,
  search: '',
  searchResult: [],
  type: null,
};

export default injectIntl(SearchBar);
