import PropTypes from 'prop-types';
import React from 'react';

import SimpleWrapper from '../SimpleWrapper';
import { GlobalActions } from '../../redux/actionCreators';

import './SearchBar.scss';


const SearchBar = ({
  focus = false,
  search,
  searchFrom,
  searchResult,
  type,
}) => {
  const { setSearchText } = GlobalActions;

  return (
    <div className="searchBar" id={type}>
      <div className="searchBarSearch">
        <input
          autoFocus={focus} // eslint-disable-line
          placeholder="검색 (블록, 거래, 주소, 생성자)"
          onClick={() => {
            if (type === 'side') GlobalActions.openModal({ modalType: 'Search' });
          }}
          onChange={(e) => {
            setSearchText(e.target.value, type);
          }}
          onBlur={(e) => {
            e.target.value = '';
          }}
        />
        <div className="searchBarIcon">
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

export default SearchBar;
