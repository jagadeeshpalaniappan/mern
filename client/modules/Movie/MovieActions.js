import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_MOVIE = 'ADD_MOVIE';
export const ADD_MOVIES = 'ADD_MOVIES';
export const DELETE_MOVIE = 'DELETE_MOVIE';

// Export Actions
export function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    movie,
  };
}

export function addMovieRequest(movie) {
  return (dispatch) => {
    return callApi('movies', 'POST', {
      movie: {
        title: movie.title,
        directors: movie.directors,
        description: movie.description,
      },
    }).then(res => dispatch(addMovie(res.movie)));
  };
}

export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies,
  };
}

export function fetchMovies() {
  return (dispatch) => {
    return callApi('movies').then(res => {
      dispatch(addMovies(res.movies));
    });
  };
}

export function fetchMovie(cuid) {
  return (dispatch) => {
    return callApi(`movies/${cuid}`).then(res => dispatch(addMovie(res.movie)));
  };
}

export function deleteMovie(cuid) {
  return {
    type: DELETE_MOVIE,
    cuid,
  };
}

export function deleteMovieRequest(cuid) {
  return (dispatch) => {
    return callApi(`movies/${cuid}`, 'DELETE').then(() => dispatch(deleteMovie(cuid)));
  };
}
