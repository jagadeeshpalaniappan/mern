import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './MovieCreateWidget.css';

export class MovieCreateWidget extends Component {


  addMovie = () => {

    const typeRef = this.refs.type;
    const titleRef = this.refs.title;
    const durationRef = this.refs.duration;
    const ratingsRef = this.refs.ratings;
    const actorsRef = this.refs.actors;
    const directorsRef = this.refs.directors;
    const tagsRef = this.refs.tags;
    const descriptionRef = this.refs.description;
    const yearRef = this.refs.year;
    const posterartsRef = this.refs.posterarts;
    const thumbnailsRef = this.refs.thumbnails;
    const hero_imagesRef = this.refs.hero_images;
    const landscape_imagesRef = this.refs.landscape_images;
    const backgroundsRef = this.refs.backgrounds;
    const publisher_idRef = this.refs.publisher_id;
    const has_trailerRef = this.refs.has_trailer;
    const has_subtitleRef = this.refs.has_subtitle;
    const import_idRef = this.refs.import_id;
    const channel_idRef = this.refs.channel_id;
    const channel_logoRef = this.refs.channel_logo;
    const channel_nameRef = this.refs.channel_name;
    const languageRef = this.refs.language;


    this.props.addMovie({
      title: titleRef.value,
      description: descriptionRef.value,
      year: yearRef.value,
      language: languageRef.value
    });

    // Validation: TODO
    /*
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addMovie(titleRef.value, nameRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
    */
  };

  populateDummyMovie = () => {

    const getRandomArbitrary = (min, max) => {
      return parseInt(Math.random() * (max - min) + min);
    };
    const counter = getRandomArbitrary(1, 1000) ;

    this.refs.title.value = `title${counter}`;
    this.refs.description.value = `description${counter}`;
    this.refs.year.value = 2000;



  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddMovie ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>

          <a className={styles['movie-submit-button']} onClick={this.populateDummyMovie}>Populate Dummy Values</a> | &nbsp;
          <a className={styles['movie-submit-button']} onClick={this.addMovie}><FormattedMessage id="submit" /></a>

          <h2 className={styles['form-title']}><FormattedMessage id="createNewMovie" /></h2>

          <select ref="language" className={styles['form-field']}>
            <option value="tamil">Tamil</option>
            <option value="telugu">Telugu</option>
            <option value="hindi">Hindi</option>
            <option value="malayalam">Malayalam</option>
            <option value="kanada">Kanada</option>
            <option value="bengali">Bengali</option>
            <option value="marathi">Marathi</option>
            <option value="punjabi">Punjabi</option>
            <option value="chinese">Chinese</option>
          </select>

          <input placeholder={this.props.intl.messages.movieTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.description} className={styles['form-field']} ref="description" />
          <input placeholder={this.props.intl.messages.year} className={styles['form-field']} ref="year" />


          <a className={styles['movie-submit-button']} onClick={this.addMovie}><FormattedMessage id="submit" /></a>

        </div>
      </div>
    );
  }
}

MovieCreateWidget.propTypes = {
  addMovie: PropTypes.func.isRequired,
  showAddMovie: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MovieCreateWidget);
