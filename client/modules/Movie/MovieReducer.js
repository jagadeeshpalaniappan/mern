import { ADD_MOVIE, ADD_MOVIES, DELETE_MOVIE } from './MovieActions';

// Initial State
const initialState = { data: [] };

const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE :
      return {
        data: [action.movie, ...state.data],
      };

    case ADD_MOVIES :
      return {
        data: action.movies,
      };

    case DELETE_MOVIE :
      return {
        data: state.data.filter(movie => movie.id !== action.id),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all movies
export const getMovies = state => state.movies.data;

// Get movie by cuid
export const getMovie = (state, cuid) => state.movies.data.filter(movie => movie.cuid === cuid)[0];

// Export Reducer
export default MovieReducer;
