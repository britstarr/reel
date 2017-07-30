import { SET_SEARCH_TERM, ADD_OMDB_DATA } from '../actions/actions';

const DEFAULT_STATE = {
  searchTerm: '',
  omdbData: {}
};

const setSearchTerm = (state, action) => {
  return Object.assign({}, state, {
    searchTerm: action.searchTerm
  });
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    case ADD_OMDB_DATA:
      return addOMDBData(state, action);
    default:
      return state;
  }
};

const addOMDBData = (state, action) => {
  const newOMDBData = Object.assign({}, state.omdbData, {
    [action.imdbID]: action.omdbData
  });

  return Object.assign({}, state, {
    omdbData: newOMDBData
  });
};

export default rootReducer;
