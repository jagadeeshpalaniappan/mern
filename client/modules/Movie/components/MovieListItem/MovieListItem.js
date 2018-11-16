import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './MovieListItem.css';

function MovieListItem(props) {
  return (
    <div className={styles['single-movie']}>
      <h3 className={styles['movie-title']}>
        <Link to={`/movies/${props.movie.slug}-${props.movie.cuid}`} >
          {props.movie.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.movie.directors}</p>
      <p className={styles['movie-desc']}>{props.movie.description}</p>
      <p className={styles['movie-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteMovie" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    directors: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovieListItem;
