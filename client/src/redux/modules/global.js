import {createAction, handleActions} from 'redux-actions';
import {searcher, searchTextSetter, searchWorker} from '../helpers/global';
import {maxResult, contentsInPage} from '../../config';


// ACTION TYPES
const SET_WINDOW_SIZE = 'global/SET_WINDOW_SIZE';
const SET_BROWSE_WALLET = 'global/SET_BROWSE_WALLET';

const REMOVE_SEARCH_RESULT = 'global/REMOVE_SEARCH_RESULT';
const SEARCH = 'global/SEARCH';
const SET_SEARCH_TEXT = 'global/SET_SEARCH_TEXT';
const SET_SEARCHING = 'global/SET_SEARCHING';

const CLOSE_LANGUAGE = 'global/CLOSE_LANGUAGE';
const CLOSE_NAVBAR = 'global/CLOSE_NAVBAR';
const OPEN_LANGUAGE = 'global/OPEN_LANGUAGE';
const OPEN_NAVBAR = 'global/OPEN_NAVBAR';

const CLOSE_MODAL = 'global/CLOSE_MODAL';
const OPEN_MODAL = 'global/OPEN_MODAL';

const CHANGE_LANGUAGE = 'global/CHANGE_LANGUAGE';

const MOVE_PAGE = 'global/MOVE_PAGE';
const SET_COUNT_PER_PAGE = 'global/SET_COUNT_PER_PAGE';
const MOVE_URL = 'global/MOVE_URL';

const initialState = {
  // Mode - 0 : Desktop,  1 : Mobile
  mode: 0,
  isWallet: false,
  width: null,

  searching: false,
  search: '',
  // searchFrom : 'main', 'top', 'mobile', 'side'
  searchFrom: '',
  searchResult: [],

  languageOpen: false,
  navBarOpen: false,

  modalData: null,
  modalOpen: true,
  modalType: 'Loading',

  language: 'en',

  page: 1,
  countPerPage: contentsInPage,

  currentUrl: '/',
};

// REDUCER
const reducer = handleActions({
  [SET_WINDOW_SIZE]: (state, action) => {
    const width = action.payload;
    let mode = 0;

    if (width <= 900) {
      mode = 1;
    } else {
      mode = 0;
    }
    return {
      ...state,
      width,
      mode,
      languageOpen: mode === 2,
      navBarOpen: false,
    };
  },

  [SET_BROWSE_WALLET]: state => {
    return {
      ...state,
      isWallet: true
    }
  },

  [REMOVE_SEARCH_RESULT]: state => ({...state, searchResult: []}),
  [SEARCH]: (state, action) => {
    let result = [];
    if (state.searchResult.length >= maxResult) {
      result = state.searchResult;
    } else {
      result = result.concat(state.searchResult).concat(searchWorker(action.payload));
    }

    return {
      ...state,
      searching: false,
      searchResult: result,
    };
  },
  [SET_SEARCH_TEXT]: (state, action) => ({
    ...state,
    searching: true,
    search: action.payload.searchText,
    searchFrom: action.payload.searchFrom,
    searchResult: [],
  }),

  [CLOSE_LANGUAGE]: state => ({...state, languageOpen: false}),
  [CLOSE_NAVBAR]: state => ({...state, navBarOpen: false, modalOpen: false}),
  [OPEN_LANGUAGE]: state => ({...state, languageOpen: !state.languageOpen}),
  [OPEN_NAVBAR]: state => ({...state, navBarOpen: true, modalOpen: false}),

  [CLOSE_MODAL]: state => ({
    ...state,
    modalOpen: false,
    search: '',
    searchResult: [],
  }),
  [OPEN_MODAL]: (state, action) => ({
    ...state,
    modalData: action.payload && action.payload.modalData,
    modalOpen: true,
    modalType: action.payload && action.payload.modalType,
    navBarOpen: false,
  }),

  [CHANGE_LANGUAGE]: (state, action) => ({
    ...state,
    language: action.payload,
    languageOpen: false,
    navBarOpen: false,
  }),

  [MOVE_PAGE]: (state, action) => {
    let page = action.payload;
    if (page < 1) page = 1;
    return {...state, page};
  },

  [SET_COUNT_PER_PAGE]: (state, action) => {
    return {
      ...state,
      countPerPage: action.payload
    };
  },

  [MOVE_URL]: (state, action) => ({
    ...state,
    currentUrl: action.payload,
    navBarOpen: false,
  }),
}, initialState);

// ACTION CREATORS
export const changeLanguage = createAction(CHANGE_LANGUAGE);
export const closeLanguage = createAction(CLOSE_LANGUAGE);
export const closeModal = createAction(CLOSE_MODAL);
export const closeNavBar = createAction(CLOSE_NAVBAR);
export const movePage = createAction(MOVE_PAGE);
export const setCountPerPage = createAction(SET_COUNT_PER_PAGE);
export const moveUrl = createAction(MOVE_URL);
export const openLanguage = createAction(OPEN_LANGUAGE);
export const openModal = createAction(OPEN_MODAL); // { modalData, modalType }
export const openNavBar = createAction(OPEN_NAVBAR);
export const setSearching = createAction(SET_SEARCHING);
export const setSearchText = (searchText, searchFrom) => (dispatch) => {
  searchTextSetter(dispatch, SET_SEARCH_TEXT, null, searchText, searchFrom);
  if (searchText !== '') searcher(dispatch, SEARCH, () => {

  }, searchText);
};
export const removeSearchResult = createAction(REMOVE_SEARCH_RESULT);
export const setWindowSize = createAction(SET_WINDOW_SIZE);
export const setBrowseWallet = createAction(SET_BROWSE_WALLET);

export default reducer;
