import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import MovieList from '../../components/MovieList';
import MovieCreateWidget from '../../components/MovieCreateWidget/MovieCreateWidget';

// Import Actions
import { addMovieRequest, fetchMovies, deleteMovieRequest } from '../../MovieActions';
import { toggleAddMovie } from '../../../App/AppActions';

// Import Selectors
import { getShowAddMovie } from '../../../App/AppReducer';
import { getMovies } from '../../MovieReducer';

class MovieListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchMovies());
  }

  handleDeleteMovie = movie => {
    if (confirm('Do you want to delete this movie')) { // eslint-disable-line
      this.props.dispatch(deleteMovieRequest(movie));
    }
  };

  handleAddMovie = (movie) => {
    this.props.dispatch(toggleAddMovie());
    this.props.dispatch(addMovieRequest(movie));
  };

  render() {
    return (
      <div>
        <MovieCreateWidget addMovie={this.handleAddMovie} showAddMovie={this.props.showAddMovie} />
        <MovieList handleDeleteMovie={this.handleDeleteMovie} movies={this.props.movies} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
MovieListPage.need = [() => { return fetchMovies(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddMovie: getShowAddMovie(state),
    movies: getMovies(state),
  };
}

MovieListPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    directors: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  showAddMovie: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

MovieListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(MovieListPage);
