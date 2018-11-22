import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './MovieListItem.css';



class MovieListItem  extends  React.Component{

  constructor(props){
    super(props);

    this.state = {
      moreInfoHidden: true
    };

    this.onToggleMoreInfo = this.onToggleMoreInfo.bind(this);

  }

  onToggleMoreInfo(){
    this.setState({ moreInfoHidden: !this.state.moreInfoHidden });
  };

  render(){

    const props = this.props;

    return (
      <div className={styles['single-movie']}>
        <h3 className={styles['movie-title']}>
          <Link to={`/movies/${props.movie.id}`} >
            {props.movie.title}
          </Link>
        </h3>

        <p className={styles['movie-desc']}>{props.movie.description}</p>
        <p className={styles['movie-action']}>
          <a onClick={props.onDelete}><FormattedMessage id="deleteMovie" /></a> |
          &nbsp; <a onClick={this.onToggleMoreInfo}>Toggle More Info</a>
        </p>

        <ul className={styles['movie-more-info']} hidden={this.state.moreInfoHidden}>

          <li className={styles['movie-desc']}> <strong>language: </strong>{props.movie.language}</li>
          <li className={styles['movie-desc']}> <strong>id: </strong>{props.movie.id}</li>
          <li className={styles['movie-desc']}> <strong>year: </strong>{props.movie.year}</li>
          <li className={styles['movie-desc']}> <strong>isHd: </strong>{props.movie.isHd}</li>
          <li className={styles['movie-desc']}> <strong>hasCC: </strong>{props.movie.hasCC}</li>
          <li className={styles['movie-desc']}> <strong>professionals: </strong>{props.movie.professionals}</li>

        </ul>
        <hr className={styles.divider} />
      </div>
    );
  }
}



MovieListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovieListItem;
