import PropTypes from 'prop-types';
import React, {useState} from 'react';

import SimpleWrapper from '../SimpleWrapper';
import { GlobalActions } from '../../redux/actionCreators';
import { injectIntl, intlShape } from 'react-intl';

import './SearchBar.scss';


const SearchBar = ({
  intl,
  focus = false,
  search,
  searchFrom,
  searchResult,
  type,
}) => {
  // const { setSearchText } = GlobalActions;
  let [searchText, setSearchText] = useState('');

  return (
    <div className="searchBar" id={type}>
      <div className="searchBarSearch">
        <input
          placeholder={intl.formatMessage({id: 'searchLabel'})}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="searchBarIcon" onClick={() => {GlobalActions.setSearchText(searchText, type)}}>
          {
            type === 'mobile' ?
              <img
                src="/image/icon/back-btn.svg"
                alt="backBtn"
                onClick={GlobalActions.closeModal}
              />
              : <div alt="searchLogo" />
          }
        </div>
      </div>
      <SimpleWrapper
        data={searchResult}
        search={search}
        searchFrom={searchFrom}
        type={type}
      />
    </div>
  );
};

SearchBar.propTypes = {
  intl: intlShape.isRequired,
  focus: PropTypes.bool,
  searchFrom: PropTypes.string.isRequired,
  searchResult: PropTypes.array,
  type: PropTypes.string,
};

SearchBar.defaultProps = {
  focus: false,
  searchResult: [],
  type: null,
};

export default injectIntl(SearchBar);
