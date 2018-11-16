export default {
  locale: 'en',
  messages: {
    siteTitle: 'Movies Management Tool',
    addMovie: 'Add Movie',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are NOT on Twitter',
    by: 'By',
    deleteMovie: 'Delete Movie',
    createNewMovie: 'Create New Movie',
    authorName: 'Director Name',
    movieTitle: 'Movie Title',
    movieContent: 'Movie Content',
    submit: 'Submit',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
