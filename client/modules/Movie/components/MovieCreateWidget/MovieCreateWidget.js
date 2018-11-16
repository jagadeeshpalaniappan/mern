import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './MovieCreateWidget.css';

export class MovieCreateWidget extends Component {
  addMovie = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addMovie(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddMovie ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewMovie" /></h2>

          <input placeholder={this.props.intl.messages.movieTitle} className={styles['form-field']} ref="title" />
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={this.props.intl.messages.movieContent} className={styles['form-field']} ref="content" />
          <a className={styles['movie-submit-button']} href="#" onClick={this.addMovie}><FormattedMessage id="submit" /></a>
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
