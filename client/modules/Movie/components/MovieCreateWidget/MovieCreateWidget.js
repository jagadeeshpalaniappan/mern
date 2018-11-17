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


    this.props.addMovie({
      type: typeRef.value,
      title: titleRef.value,
      duration: durationRef.value,
      ratings: ratingsRef.value,
      actors: actorsRef.value,
      directors: directorsRef.value,
      tags: tagsRef.value,
      description: descriptionRef.value,
      year: yearRef.value,
      posterarts: posterartsRef.value,
      thumbnails: thumbnailsRef.value,
      hero_images: hero_imagesRef.value,
      landscape_images: landscape_imagesRef.value,
      backgrounds: backgroundsRef.value,
      publisher_id: publisher_idRef.value,
      has_trailer: has_trailerRef.value,
      has_subtitle: has_subtitleRef.value,
      import_id: import_idRef.value,
      channel_id: channel_idRef.value,
      channel_logo: channel_logoRef.value,
      channel_name: channel_nameRef.value,
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

    this.refs.type.value = `type${counter}`;
    this.refs.title.value = `title${counter}`;
    this.refs.duration.value = 6737;
    this.refs.ratings.value = `ratings${counter}`;
    this.refs.actors.value = `actors${counter}`;
    this.refs.directors.value = `directors${counter}`;
    this.refs.tags.value = `tags${counter}`;
    this.refs.description.value = `description${counter}`;
    this.refs.year.value = 2000;
    this.refs.posterarts.value = `posterarts${counter}`;
    this.refs.thumbnails.value = `thumbnails${counter}`;
    this.refs.hero_images.value = `hero_images${counter}`;
    this.refs.landscape_images.value = `landscape_images${counter}`;
    this.refs.backgrounds.value = `backgrounds${counter}`;
    this.refs.publisher_id.value = `publisher_id${counter}`;
    this.refs.has_trailer.value = `has_trailer${counter}`;
    this.refs.has_subtitle.value = `has_subtitle${counter}`;
    this.refs.import_id.value = `import_id${counter}`;
    this.refs.channel_id.value = `channel_id${counter}`;
    this.refs.channel_logo.value = `channel_logo${counter}`;
    this.refs.channel_name.value = `channel_name${counter}`;


  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddMovie ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>

          <a className={styles['movie-submit-button']} onClick={this.populateDummyMovie}>Populate Dummy Values</a> | &nbsp;
          <a className={styles['movie-submit-button']} onClick={this.addMovie}><FormattedMessage id="submit" /></a>

          <h2 className={styles['form-title']}><FormattedMessage id="createNewMovie" /></h2>

          <input placeholder={this.props.intl.messages.type} className={styles['form-field']} ref="type" />
          <input placeholder={this.props.intl.messages.movieTitle} className={styles['form-field']} ref="title" />
          <input placeholder={this.props.intl.messages.duration} className={styles['form-field']} ref="duration" />
          <input placeholder={this.props.intl.messages.ratings} className={styles['form-field']} ref="ratings" />
          <input placeholder={this.props.intl.messages.actors} className={styles['form-field']} ref="actors" />
          <input placeholder={this.props.intl.messages.directors} className={styles['form-field']} ref="directors" />
          <input placeholder={this.props.intl.messages.tags} className={styles['form-field']} ref="tags" />

          <textarea placeholder={this.props.intl.messages.description} className={styles['form-field']} ref="description" />

          <input placeholder={this.props.intl.messages.year} className={styles['form-field']} ref="year" />
          <input placeholder={this.props.intl.messages.posterarts} className={styles['form-field']} ref="posterarts" />
          <input placeholder={this.props.intl.messages.thumbnails} className={styles['form-field']} ref="thumbnails" />
          <input placeholder={this.props.intl.messages.hero_images} className={styles['form-field']} ref="hero_images" />
          <input placeholder={this.props.intl.messages.landscape_images} className={styles['form-field']} ref="landscape_images" />
          <input placeholder={this.props.intl.messages.backgrounds} className={styles['form-field']} ref="backgrounds" />
          <input placeholder={this.props.intl.messages.publisher_id} className={styles['form-field']} ref="publisher_id" />
          <input placeholder={this.props.intl.messages.has_trailer} className={styles['form-field']} ref="has_trailer" />
          <input placeholder={this.props.intl.messages.has_subtitle} className={styles['form-field']} ref="has_subtitle" />
          <input placeholder={this.props.intl.messages.import_id} className={styles['form-field']} ref="import_id" />
          <input placeholder={this.props.intl.messages.channel_id} className={styles['form-field']} ref="channel_id" />
          <input placeholder={this.props.intl.messages.channel_logo} className={styles['form-field']} ref="channel_logo" />
          <input placeholder={this.props.intl.messages.channel_name} className={styles['form-field']} ref="channel_name" />


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
