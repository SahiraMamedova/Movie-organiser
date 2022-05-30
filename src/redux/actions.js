import {
  SEARCH_MOVIE,
  ADD_FAVORITES_LIST,
  REMOVE_MOVIE_FROM_FAVORITE_LIST,
  FINISH_FAVORITES,
  GET_LIST_INTO_STATE,
  GET_MOVIE_INFO_INTO_STATE,
} from "./actiontypes";

import axios from "axios";
const key = "dddc9f9f";
// name is the name of movie that comes from searchline
export function fetchMovies(name) {
  return async (dispatch) => {
    try {
      const { data } = await axios
        .get(`http://www.omdbapi.com/?s=${name}&apikey=${key}`);
      // search results 
      dispatch(searchMovies(data.Search));
      console.log(data.Search);
    } catch (err) {
      alert("Not found", err);
    }
  };
}
// movies===data.Search
// data.Search comes from action fetchmovies
export function searchMovies(movies) {
  return {
    type: SEARCH_MOVIE,
    payload: {
      movies: movies,
    },
  };
}

// we add movies to favorite list by its id
export function addFavoriteList(id) {
  return {
    type: ADD_FAVORITES_LIST,
    payload: {
      id: id,
    },
  };
}
// we remove movie from favorite list by its id
export function removeMovieFromFavoriteList(id) {
  return {
    type: REMOVE_MOVIE_FROM_FAVORITE_LIST,
    payload: {
      id: id,
    },
  };
}
// we complete favorite list by its id
export function finishFavoriteList(listID) {
  return {
    type: FINISH_FAVORITES,
    payload: {
      listID: listID,
    },
  };
}
// after completing we make post request 
export function postList(title, favoritesIDArray) {
  return function (dispatch) {
    let savedList = {
      title: title,
      movies: favoritesIDArray,
    };
    fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedList),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(finishFavoriteList(data.id));
      });
  };
}

export function getMovieInfoToState(movieDetails) {
  return {
    type: GET_MOVIE_INFO_INTO_STATE,
    payload: {
      movieDetails: movieDetails,
    },
  };
}

export function getListIntoState(title, movies) {
  return {
    type: GET_LIST_INTO_STATE,
    payload: {
      title: title,
      listMovies: movies,
    },
  };
}

export function getList(id) {
  return function (dispatch) {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getListIntoState(data.title, data.movies));
        dispatch(getMovieInfoByImdbID(data.movies));
      });
  };
}

export function getMovieInfoByImdbID(movies) {
  return function (dispatch) {
    let movieDetailArray = [];
    console.log(movies);
    movies.forEach((e) => {  
      console.log(e);
      fetch(`http://www.omdbapi.com/?i=${e}&apikey=${key}`)
        .then((res) => res.json())
        .then((data) => {
          movieDetailArray = [...movieDetailArray, { ...data }];
          dispatch(getMovieInfoToState(movieDetailArray));
        });
    });
  };
}
