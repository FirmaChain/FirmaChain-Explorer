import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
export const LOAD = 'widgets/LOAD';
export const LOAD_SUCCESS = 'widgets/LOAD_SUCCESS';
export const LOAD_FAIL = 'widgets/LOAD_FAIL';


const initialState = {
  isFirstLoad: true,
  loaded: false,
  loading: true,

  error: null,
};

// REDUCER
const reducer = handleActions({
  [LOAD]: state => ({ ...state, loading: true }),
  [LOAD_SUCCESS]: state => ({
    ...state,
    isFirstLoad: false,
    loaded: true,
    loading: false,
  }),
  [LOAD_FAIL]: (state, action) => ({
    ...state,
    loaded: false,
    loading: false,
    error: action.payload,
  }),
}, initialState);


// ACTION CREATORS
export const load = createAction(LOAD);
export const loadFail = createAction(LOAD_FAIL); // loadFail(error)
export const loadSuccess = createAction(LOAD_SUCCESS);

export const loader = actions => (dispatch) => {
  dispatch({ type: LOAD });
  actions
    .then(() => dispatch({ type: LOAD_SUCCESS }))
    .catch(err => dispatch({ type: LOAD_FAIL, payload: err.message }));
};

export default reducer;
