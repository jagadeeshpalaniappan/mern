import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import MovieListItem from './MovieListItem/MovieListItem';

function MovieList(props) {
  return (
    <div className="listView">
      {
        props.movies.map(movie => (
          <MovieListItem
            movie={movie}
            key={movie.cuid}
            onDelete={() => props.handleDeleteMovie(movie.id)}
          />
        ))
      }
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteMovie: PropTypes.func.isRequired,
};

export default MovieList;
