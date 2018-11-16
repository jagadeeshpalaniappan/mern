import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/MovieListItem/MovieListItem.css';

// Import Actions
import { fetchMovie } from '../../MovieActions';

// Import Selectors
import { getMovie } from '../../MovieReducer';

export function MovieDetailPage(props) {
  return (
    <div>
      <Helmet title={props.movie.title} />
      <div className={`${styles['single-movie']} ${styles['movie-detail']}`}>
        <h3 className={styles['movie-title']}>{props.movie.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.movie.name}</p>
        <p className={styles['movie-desc']}>{props.movie.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
MovieDetailPage.need = [params => {
  return fetchMovie(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    movie: getMovie(state, props.params.cuid),
  };
}

MovieDetailPage.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(MovieDetailPage);
