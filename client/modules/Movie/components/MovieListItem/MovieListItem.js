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
          <Link to={`/movies/${props.movie.slug}-${props.movie.cuid}`} >
            {props.movie.title}
          </Link>
        </h3>

        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.movie.directors}</p>
        <p className={styles['movie-desc']}>{props.movie.description}</p>
        <p className={styles['movie-action']}>
          <a onClick={props.onDelete}><FormattedMessage id="deleteMovie" /></a> |
          &nbsp; <a onClick={this.onToggleMoreInfo}>Toggle More Info</a>
        </p>

        <ul className={styles['movie-more-info']} hidden={this.state.moreInfoHidden}>

          <li className={styles['movie-desc']}> <strong>language: </strong>{props.movie.language}</li>
          <li className={styles['movie-desc']}> <strong>id: </strong>{props.movie.id}</li>
          <li className={styles['movie-desc']}> <strong>type: </strong>{props.movie.type}</li>
          <li className={styles['movie-desc']}> <strong>title: </strong>{props.movie.title}</li>
          <li className={styles['movie-desc']}> <strong>duration: </strong>{props.movie.duration}</li>
          <li className={styles['movie-desc']}> <strong>ratings: </strong>{props.movie.ratings}</li>
          <li className={styles['movie-desc']}> <strong>actors: </strong>{props.movie.actors}</li>
          <li className={styles['movie-desc']}> <strong>directors: </strong>{props.movie.directors}</li>
          <li className={styles['movie-desc']}> <strong>tags: </strong>{props.movie.tags}</li>
          <li className={styles['movie-desc']}> <strong>description: </strong>{props.movie.description}</li>
          <li className={styles['movie-desc']}> <strong>year: </strong>{props.movie.year}</li>
          <li className={styles['movie-desc']}> <strong>posterarts: </strong>{props.movie.posterarts}</li>
          <li className={styles['movie-desc']}> <strong>thumbnails: </strong>{props.movie.thumbnails}</li>
          <li className={styles['movie-desc']}> <strong>hero_images: </strong>{props.movie.hero_images}</li>
          <li className={styles['movie-desc']}> <strong>landscape_images: </strong>{props.movie.landscape_images}</li>
          <li className={styles['movie-desc']}> <strong>backgrounds: </strong>{props.movie.backgrounds}</li>
          <li className={styles['movie-desc']}> <strong>publisher_id: </strong>{props.movie.publisher_id}</li>
          <li className={styles['movie-desc']}> <strong>has_trailer: </strong>{props.movie.has_trailer}</li>
          <li className={styles['movie-desc']}> <strong>has_subtitle: </strong>{props.movie.has_subtitle}</li>
          <li className={styles['movie-desc']}> <strong>import_id: </strong>{props.movie.import_id}</li>
          <li className={styles['movie-desc']}> <strong>channel_id: </strong>{props.movie.channel_id}</li>
          <li className={styles['movie-desc']}> <strong>channel_logo: </strong>{props.movie.channel_logo}</li>
          <li className={styles['movie-desc']}> <strong>channel_name: </strong>{props.movie.channel_name}</li>


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
    directors: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovieListItem;
