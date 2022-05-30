import {
  SEARCH_MOVIE,
  ADD_FAVORITES_LIST,
  REMOVE_MOVIE_FROM_FAVORITE_LIST,
  FINISH_FAVORITES,
  GET_LIST_INTO_STATE,
  GET_MOVIE_INFO_INTO_STATE,
} from "./actiontypes";

const initialState = {
  movies: [],
  favoriteList: [], 
  movieDetails: [],
  title: "",
  listID: "",
  listMovies: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        movies: action.payload.movies,
      };
    case ADD_FAVORITES_LIST:
      const newState = { ...state };
      const id = action.payload.id;

      const find = newState.movies.find((item) => item.imdbID === id);

      if (find) {
        newState.favoriteList = [...newState.favoriteList, { ...find }];
      }
      return newState;
    case REMOVE_MOVIE_FROM_FAVORITE_LIST:
      const newFilms = state.favoriteList.filter(
        (item) => item.imdbID !== action.payload.id
      );
      return { ...state, favoriteList: newFilms };
    case FINISH_FAVORITES:
      return {
        ...state,
        listID: action.payload.listID,
      };
    case GET_LIST_INTO_STATE:
      return {
        ...state,
        title: action.payload.title,
        listMovies: action.payload.listMovies,
      };
    case GET_MOVIE_INFO_INTO_STATE:
      return {
        ...state,
        movieDetails: action.payload.movieDetails,
      };
    default:
      return state;
  }
}

export default reducer;
