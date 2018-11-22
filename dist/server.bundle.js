/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleAddMovie = toggleAddMovie;
// Export Constants
var TOGGLE_ADD_MOVIE = exports.TOGGLE_ADD_MOVIE = 'TOGGLE_ADD_MOVIE';

// Export Actions
function toggleAddMovie() {
  return {
    type: TOGGLE_ADD_MOVIE
  };
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovie = exports.getMovies = undefined;

var _MovieActions = __webpack_require__(9);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Initial State
var initialState = { data: [] };

var MovieReducer = function MovieReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _MovieActions.ADD_MOVIE:
      return {
        data: [action.movie].concat(_toConsumableArray(state.data))
      };

    case _MovieActions.ADD_MOVIES:
      return {
        data: action.movies
      };

    case _MovieActions.DELETE_MOVIE:
      return {
        data: state.data.filter(function (movie) {
          return movie.id !== action.id;
        })
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all movies
var getMovies = exports.getMovies = function getMovies(state) {
  return state.movies.data;
};

// Get movie by cuid
var getMovie = exports.getMovie = function getMovie(state, cuid) {
  return state.movies.data.filter(function (movie) {
    return movie.cuid === cuid;
  })[0];
};

// Export Reducer
exports.default = MovieReducer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE_MOVIE = exports.ADD_MOVIES = exports.ADD_MOVIE = undefined;
exports.addMovie = addMovie;
exports.addMovieRequest = addMovieRequest;
exports.addMovies = addMovies;
exports.fetchMovies = fetchMovies;
exports.fetchMovie = fetchMovie;
exports.deleteMovie = deleteMovie;
exports.deleteMovieRequest = deleteMovieRequest;

var _apiCaller = __webpack_require__(14);

var _apiCaller2 = _interopRequireDefault(_apiCaller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export Constants
var ADD_MOVIE = exports.ADD_MOVIE = 'ADD_MOVIE';
var ADD_MOVIES = exports.ADD_MOVIES = 'ADD_MOVIES';
var DELETE_MOVIE = exports.DELETE_MOVIE = 'DELETE_MOVIE';

// Export Actions
function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    movie: movie
  };
}

function addMovieRequest(movie) {
  return function (dispatch) {
    return (0, _apiCaller2.default)('movies', 'POST', {
      movie: movie
    }).then(function (res) {
      return dispatch(addMovie(res.movie));
    });
  };
}

function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies: movies
  };
}

function fetchMovies() {
  return function (dispatch) {
    return (0, _apiCaller2.default)('movies').then(function (res) {
      dispatch(addMovies(res.movies));
    });
  };
}

function fetchMovie(cuid) {
  return function (dispatch) {
    return (0, _apiCaller2.default)('movies/' + cuid).then(function (res) {
      return dispatch(addMovie(res.movie));
    });
  };
}

function deleteMovie(id) {
  return {
    type: DELETE_MOVIE,
    id: id
  };
}

function deleteMovieRequest(cuid) {
  return function (dispatch) {
    return (0, _apiCaller2.default)('movies/' + cuid, 'DELETE').then(function () {
      return dispatch(deleteMovie(cuid));
    });
  };
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

exports.default = _mongoose2.default.model('Post', postSchema);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShowAddMovie = undefined;

var _AppActions = __webpack_require__(7);

// Initial State
var initialState = {
  showAddMovie: false
}; // Import Actions


var AppReducer = function AppReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _AppActions.TOGGLE_ADD_MOVIE:
      return {
        showAddMovie: !state.showAddMovie
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddMovie
var getShowAddMovie = exports.getShowAddMovie = function getShowAddMovie(state) {
  return state.app.showAddMovie;
};

// Export Reducer
exports.default = AppReducer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_URL = undefined;
exports.default = callApi;

var _isomorphicFetch = __webpack_require__(35);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _config = __webpack_require__(15);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';

function callApi(endpoint) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
  var body = arguments[2];

  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
    headers: { 'content-type': 'application/json' },
    method: method,
    body: JSON.stringify(body)
  }).then(function (response) {
    return response.json().then(function (json) {
      return { json: json, response: response };
    });
  }).then(function (_ref) {
    var json = _ref.json,
        response = _ref.response;

    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  }).then(function (response) {
    return response;
  }, function (error) {
    return error;
  });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000
};

exports.default = config;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localizationData = exports.enabledLanguages = undefined;

var _reactIntl = __webpack_require__(2);

var _intl = __webpack_require__(37);

var _intl2 = _interopRequireDefault(_intl);

var _intlLocalesSupported = __webpack_require__(38);

var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

__webpack_require__(39);

var _en = __webpack_require__(40);

var _en2 = _interopRequireDefault(_en);

var _en3 = __webpack_require__(41);

var _en4 = _interopRequireDefault(_en3);

__webpack_require__(42);

var _fr = __webpack_require__(43);

var _fr2 = _interopRequireDefault(_fr);

var _fr3 = __webpack_require__(44);

var _fr4 = _interopRequireDefault(_fr3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// list of available languages
var enabledLanguages = exports.enabledLanguages = ['en', 'fr'];

// this object will have language-specific data added to it which will be placed in the state when that language is active
// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
var localizationData = exports.localizationData = {};

// here you bring in 'intl' browser polyfill and language-specific polyfills
// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
// as well as react-intl's language-specific data
// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)


// need Intl polyfill, Intl not supported in Safari


if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!(0, _intlLocalesSupported2.default)(enabledLanguages)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    global.Intl.NumberFormat = _intl2.default.NumberFormat;
    global.Intl.DateTimeFormat = _intl2.default.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = _intl2.default;
}

// use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
function flattenMessages() {
  var nestedMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return Object.keys(nestedMessages).reduce(function (messages, key) {
    var value = nestedMessages[key];
    var prefixedKey = prefix ? prefix + '.' + key : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

// bring in intl polyfill, react-intl, and app-specific language data

(0, _reactIntl.addLocaleData)(_en2.default);
localizationData.en = _en4.default;
localizationData.en.messages = flattenMessages(localizationData.en.messages);

(0, _reactIntl.addLocaleData)(_fr2.default);
localizationData.fr = _fr4.default;
localizationData.fr.messages = flattenMessages(localizationData.fr.messages);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SWITCH_LANGUAGE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.switchLanguage = switchLanguage;

var _setup = __webpack_require__(16);

// Export Constants
var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

function switchLanguage(newLang) {
  return _extends({
    type: SWITCH_LANGUAGE
  }, _setup.localizationData[newLang]);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = __webpack_require__(45);

var _reduxDevtoolsLogMonitor = __webpack_require__(46);

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _reduxDevtoolsDockMonitor = __webpack_require__(47);

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
  toggleVisibilityKey: 'ctrl-h',
  changePositionKey: 'ctrl-w'
}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(3);

var _MovieList = __webpack_require__(53);

var _MovieList2 = _interopRequireDefault(_MovieList);

var _MovieCreateWidget = __webpack_require__(55);

var _MovieCreateWidget2 = _interopRequireDefault(_MovieCreateWidget);

var _MovieActions = __webpack_require__(9);

var _AppActions = __webpack_require__(7);

var _AppReducer = __webpack_require__(13);

var _MovieReducer = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import Components


// Import Actions


// Import Selectors


var MovieListPage = function (_Component) {
  _inherits(MovieListPage, _Component);

  function MovieListPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MovieListPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MovieListPage.__proto__ || Object.getPrototypeOf(MovieListPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleDeleteMovie = function (movie) {
      if (confirm('Do you want to delete this movie')) {
        // eslint-disable-line
        _this.props.dispatch((0, _MovieActions.deleteMovieRequest)(movie));
      }
    }, _this.handleAddMovie = function (movie) {
      _this.props.dispatch((0, _AppActions.toggleAddMovie)());
      _this.props.dispatch((0, _MovieActions.addMovieRequest)(movie));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MovieListPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.dispatch((0, _MovieActions.fetchMovies)());
    }
  }, {
    key: 'render',
    value: function render() {
      return _jsx('div', {}, void 0, _jsx(_MovieCreateWidget2.default, {
        addMovie: this.handleAddMovie,
        showAddMovie: this.props.showAddMovie
      }), _jsx(_MovieList2.default, {
        handleDeleteMovie: this.handleDeleteMovie,
        movies: this.props.movies
      }));
    }
  }]);

  return MovieListPage;
}(_react.Component);

// Actions required to provide data for this component to render in sever side.


MovieListPage.need = [function () {
  return (0, _MovieActions.fetchMovies)();
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddMovie: (0, _AppReducer.getShowAddMovie)(state),
    movies: (0, _MovieReducer.getMovies)(state)
  };
}

MovieListPage.contextTypes = {
  router: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MovieListPage);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

// Import Style


// Import Actions


// Import Selectors


exports.MovieDetailPage = MovieDetailPage;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(3);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = __webpack_require__(2);

var _MovieListItem = {
  "single-movie": "xz5I78-4Hu5rFk9PG7Oav",
  "movie-title": "_1Poxe5xn-hD4NNYseWWPPa",
  "author-name": "_1mS9-sy18ePvK8h4mukhRa",
  "movie-desc": "cejcznom8lOCenBAeQoRv",
  "movie-action": "_1zO5o3GIrBo7i3muCaxxyN",
  "divider": "N_istcFNRHwmhAGNHGYFV",
  "movie-detail": "Mx4AH7XJwWI5hjKstLOJ0",
  "movie-more-info": "_1iqwLvnRfSsSQ6-fsUS6y_"
};

var _MovieListItem2 = _interopRequireDefault(_MovieListItem);

var _MovieActions = __webpack_require__(9);

var _MovieReducer = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _jsx(_reactIntl.FormattedMessage, {
  id: 'by'
});

function MovieDetailPage(props) {
  return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
    title: props.movie.title
  }), _jsx('div', {
    className: _MovieListItem2.default['single-movie'] + ' ' + _MovieListItem2.default['movie-detail']
  }, void 0, _jsx('h3', {
    className: _MovieListItem2.default['movie-title']
  }, void 0, props.movie.title), _jsx('p', {
    className: _MovieListItem2.default['author-name']
  }, void 0, _ref, ' ', props.movie.name), _jsx('p', {
    className: _MovieListItem2.default['movie-desc']
  }, void 0, props.movie.content)));
}

// Actions required to provide data for this component to render in server side.
MovieDetailPage.need = [function (params) {
  return (0, _MovieActions.fetchMovie)(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    movie: (0, _MovieReducer.getMovie)(state, props.params.cuid)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MovieDetailPage);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("cuid");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("limax");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(26);

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = __webpack_require__(27);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = __webpack_require__(28);

var _path2 = _interopRequireDefault(_path);

var _IntlWrapper = __webpack_require__(29);

var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);

var _store = __webpack_require__(30);

var _reactRedux = __webpack_require__(3);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(48);

var _reactRouter = __webpack_require__(4);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _routes = __webpack_require__(49);

var _routes2 = _interopRequireDefault(_routes);

var _fetchData = __webpack_require__(56);

var _post = __webpack_require__(58);

var _post2 = _interopRequireDefault(_post);

var _movie = __webpack_require__(60);

var _movie2 = _interopRequireDefault(_movie);

var _dummyData = __webpack_require__(63);

var _dummyData2 = _interopRequireDefault(_dummyData);

var _config = __webpack_require__(15);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the Express App
var app = new _express2.default();

// Set Development modes checks
var isDevMode = process.env.NODE_ENV === 'development' || false;
var isProdMode = process.env.NODE_ENV === 'production' || false;

// Run Webpack dev server in development mode
if (isDevMode) {
  // Webpack Requirements
  // eslint-disable-next-line global-require
  var webpack = __webpack_require__(24);
  // eslint-disable-next-line global-require
  var config = __webpack_require__(64);
  // eslint-disable-next-line global-require
  var webpackDevMiddleware = __webpack_require__(68);
  // eslint-disable-next-line global-require
  var webpackHotMiddleware = __webpack_require__(69);
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
      poll: 1000
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup


// Import required modules


// Set native promises as mongoose promise
_mongoose2.default.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  _mongoose2.default.connect(_config2.default.mongoURL, function (error) {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }

    // feed some dummy data in DB.
    (0, _dummyData2.default)();
  });
}

// Apply body Parser and server public assets and routes
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json({ limit: '20mb' }));
app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client')));
app.use('/api', _post2.default);
app.use('/api', _movie2.default);

// Render Initial HTML
var renderFullPage = function renderFullPage(html, initialState) {
  var head = _reactHelmet2.default.rewind();

  // Import Manifests
  var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return '\n    <!doctype html>\n    <html>\n      <head>\n        ' + head.base.toString() + '\n        ' + head.title.toString() + '\n        ' + head.meta.toString() + '\n        ' + head.link.toString() + '\n        ' + head.script.toString() + '\n\n        ' + (isProdMode ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n        <link href=\'https://fonts.googleapis.com/css?family=Lato:400,300,700\' rel=\'stylesheet\' type=\'text/css\'/>\n        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />\n      </head>\n      <body>\n        <div id="root">' + (process.env.NODE_ENV === 'production' ? html : '<div>' + html + '</div>') + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n          ' + (isProdMode ? '//<![CDATA[\n          window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n          //]]>' : '') + '\n        </script>\n        <script src=\'' + (isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n        <script src=\'' + (isProdMode ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n      </body>\n    </html>\n  ';
};

var renderError = function renderError(err) {
  var softTab = '&#32;&#32;&#32;&#32;';
  var errTrace = isProdMode ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
  return renderFullPage('Server Error' + errTrace, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use(function (req, res, next) {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    var store = (0, _store.configureStore)();

    return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
      var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
        store: store
      }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
      var finalState = store.getState();

      res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
    }).catch(function (error) {
      return next(error);
    });
  });
});

// start app
app.listen(_config2.default.port, function (error) {
  if (!error) {
    console.log('MERN is running on port: ' + _config2.default.port + '! Build something amazing!'); // eslint-disable-line
  }
});

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntlWrapper = IntlWrapper;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = __webpack_require__(2);

var _reactRedux = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IntlWrapper(props) {
  return _react2.default.createElement(
    _reactIntl.IntlProvider,
    props.intl,
    props.children
  );
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;

var _redux = __webpack_require__(12);

var _reduxThunk = __webpack_require__(31);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(32);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevTools = void 0; /**
                        * Main store function
                        */

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = __webpack_require__(18).default;
}

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Middleware and store enhancers
  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));

  // For hot reloading reducers
  if (false) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', function () {
      var nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(12);

var _AppReducer = __webpack_require__(13);

var _AppReducer2 = _interopRequireDefault(_AppReducer);

var _PostReducer = __webpack_require__(33);

var _PostReducer2 = _interopRequireDefault(_PostReducer);

var _MovieReducer = __webpack_require__(8);

var _MovieReducer2 = _interopRequireDefault(_MovieReducer);

var _IntlReducer = __webpack_require__(36);

var _IntlReducer2 = _interopRequireDefault(_IntlReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Combine all reducers into one root reducer


// Import Reducers
exports.default = (0, _redux.combineReducers)({
  app: _AppReducer2.default,
  posts: _PostReducer2.default,
  movies: _MovieReducer2.default,
  intl: _IntlReducer2.default
}); /**
     * Root Reducer
     */

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPost = exports.getPosts = undefined;

var _PostActions = __webpack_require__(34);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Initial State
var initialState = { data: [] };

var PostReducer = function PostReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _PostActions.ADD_POST:
      return {
        data: [action.post].concat(_toConsumableArray(state.data))
      };

    case _PostActions.ADD_POSTS:
      return {
        data: action.posts
      };

    case _PostActions.DELETE_POST:
      return {
        data: state.data.filter(function (post) {
          return post.cuid !== action.cuid;
        })
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
var getPosts = exports.getPosts = function getPosts(state) {
  return state.posts.data;
};

// Get post by cuid
var getPost = exports.getPost = function getPost(state, cuid) {
  return state.posts.data.filter(function (post) {
    return post.cuid === cuid;
  })[0];
};

// Export Reducer
exports.default = PostReducer;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE_POST = exports.ADD_POSTS = exports.ADD_POST = undefined;
exports.addPost = addPost;
exports.addPostRequest = addPostRequest;
exports.addPosts = addPosts;
exports.fetchPosts = fetchPosts;
exports.fetchPost = fetchPost;
exports.deletePost = deletePost;
exports.deletePostRequest = deletePostRequest;

var _apiCaller = __webpack_require__(14);

var _apiCaller2 = _interopRequireDefault(_apiCaller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export Constants
var ADD_POST = exports.ADD_POST = 'ADD_POST';
var ADD_POSTS = exports.ADD_POSTS = 'ADD_POSTS';
var DELETE_POST = exports.DELETE_POST = 'DELETE_POST';

// Export Actions
function addPost(post) {
  return {
    type: ADD_POST,
    post: post
  };
}

function addPostRequest(post) {
  return function (dispatch) {
    return (0, _apiCaller2.default)('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content
      }
    }).then(function (res) {
      return dispatch(addPost(res.post));
    });
  };
}

function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts: posts
  };
}

function fetchPosts() {
  return function (dispatch) {
    return (0, _apiCaller2.default)('posts').then(function (res) {
      dispatch(addPosts(res.posts));
    });
  };
}

function fetchPost(cuid) {
  return function (dispatch) {
    return (0, _apiCaller2.default)('posts/' + cuid).then(function (res) {
      return dispatch(addPost(res.post));
    });
  };
}

function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid: cuid
  };
}

function deletePostRequest(cuid) {
  return function (dispatch) {
    return (0, _apiCaller2.default)('posts/' + cuid, 'delete').then(function () {
      return dispatch(deletePost(cuid));
    });
  };
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _setup = __webpack_require__(16);

var _IntlActions = __webpack_require__(17);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var initLocale = global.navigator && global.navigator.language || 'en';

var initialState = _extends({
  locale: initLocale,
  enabledLanguages: _setup.enabledLanguages
}, _setup.localizationData[initLocale] || {});

var IntlReducer = function IntlReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _IntlActions.SWITCH_LANGUAGE:
      {
        var type = action.type,
            actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line


        return _extends({}, state, actionWithoutType);
      }

    default:
      return state;
  }
};

exports.default = IntlReducer;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("intl");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("intl-locales-supported");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/en");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/en");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
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
    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t}',
    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t}',
    nestedDateComment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} as of {date}',

    type: 'type',
    title: 'title',
    duration: 'duration',
    ratings: 'ratings',
    actors: 'actors',
    directors: 'directors',
    tags: 'tags',
    description: 'description',
    year: 'year',
    posterarts: 'posterarts',
    thumbnails: 'thumbnails',
    hero_images: 'hero_images',
    landscape_images: 'landscape_images',
    backgrounds: 'backgrounds',
    publisher_id: 'publisher_id',
    has_trailer: 'has_trailer',
    has_subtitle: 'has_subtitle',
    import_id: 'import_id',
    channel_id: 'channel_id',
    channel_logo: 'channel_logo',
    channel_name: 'channel_name'

  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/fr");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/fr");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  locale: 'fr',
  messages: {
    siteTitle: 'MERN blog de démarrage',
    addPost: 'Ajouter Poster',
    switchLanguage: 'Changer de langue',
    twitterMessage: 'Nous sommes sur Twitter',
    by: 'Par',
    deletePost: 'Supprimer le message',
    createNewPost: 'Créer un nouveau message',
    authorName: 'Nom de l\'auteur',
    postTitle: 'Titre de l\'article',
    postContent: 'Contenu après',
    submit: 'Soumettre',
    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to French)',
    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to French)',
    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to French)'
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-log-monitor");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-dock-monitor");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(4);

var _App = __webpack_require__(50);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require.ensure polyfill for node
if (false) {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  __webpack_require__(19);
  __webpack_require__(20);
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
exports.default = _jsx(_reactRouter.Route, {
  path: '/',
  component: _App2.default
}, void 0, _jsx(_reactRouter.IndexRoute, {
  getComponent: function getComponent(nextState, cb) {
    new Promise(function(resolve) { resolve(); }).then((function (require) {
      cb(null, __webpack_require__(19).default);
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}), _jsx(_reactRouter.Route, {
  path: '/movies/:slug-:cuid',
  getComponent: function getComponent(nextState, cb) {
    new Promise(function(resolve) { resolve(); }).then((function (require) {
      cb(null, __webpack_require__(20).default);
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(3);

var _App = {
  "container": "_4uEyKcd5WHob5qPzotT7"
};

var _App2 = _interopRequireDefault(_App);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Header = __webpack_require__(51);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(52);

var _Footer2 = _interopRequireDefault(_Footer);

var _AppActions = __webpack_require__(7);

var _IntlActions = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import Style


// Import Components


// Import Actions


var DevTools = void 0;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = __webpack_require__(18).default;
}

var _ref = _jsx(_Footer2.default, {});

var App = exports.App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.toggleAddMovieSection = function () {
      _this.props.dispatch((0, _AppActions.toggleAddMovie)());
    };

    _this.state = { isMounted: false };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isMounted: true }); // eslint-disable-line
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _jsx('div', {}, void 0, _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
        title: 'Movie Management Tool',
        titleTemplate: '%s - App',
        meta: [{ charset: 'utf-8' }, {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        }, {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }]
      }), _jsx(_Header2.default, {
        switchLanguage: function switchLanguage(lang) {
          return _this2.props.dispatch((0, _IntlActions.switchLanguage)(lang));
        },
        intl: this.props.intl,
        toggleAddMovie: this.toggleAddMovieSection
      }), _jsx('div', {
        className: _App2.default.container
      }, void 0, this.props.children), _ref));
    }
  }]);

  return App;
}(_react.Component);

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

// Import Style


exports.Header = Header;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(4);

var _reactIntl = __webpack_require__(2);

var _Header = {
  "header": "_2sEZYfHlvDy9uXqVIXG1aM",
  "content": "_1eavAvnySzoZc5rld6Q4pa",
  "site-title": "UfFn6muOcOBjkVI5_yltp",
  "add-movie-button": "_1gwlkPWcGzQ4_lVnMMBCqC",
  "language-switcher": "_3bviQya5ZWCvWr6lGdfO9h",
  "selected": "_3IRlmCpgSZBcTGVIGHvgaI"
};

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _jsx('li', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
  id: 'switchLanguage'
}));

var _ref2 = _jsx(_reactRouter.Link, {
  to: '/'
}, void 0, _jsx(_reactIntl.FormattedMessage, {
  id: 'siteTitle'
}));

var _ref3 = _jsx(_reactIntl.FormattedMessage, {
  id: 'addMovie'
});

function Header(props, context) {
  var languageNodes = props.intl.enabledLanguages.map(function (lang) {
    return _jsx('li', {
      onClick: function onClick() {
        return props.switchLanguage(lang);
      },
      className: lang === props.intl.locale ? _Header2.default.selected : ''
    }, lang, lang);
  });

  return _jsx('div', {
    className: _Header2.default.header
  }, void 0, _jsx('div', {
    className: _Header2.default['language-switcher']
  }, void 0, _jsx('ul', {}, void 0, _ref, languageNodes)), _jsx('div', {
    className: _Header2.default.content
  }, void 0, _jsx('h1', {
    className: _Header2.default['site-title']
  }, void 0, _ref2), context.router.isActive('/', true) ? _jsx('a', {
    className: _Header2.default['add-movie-button'],
    onClick: props.toggleAddMovie
  }, void 0, _ref3) : null));
}

Header.contextTypes = {
  router: _propTypes2.default.object
};

exports.default = Header;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

// Import Style


// Import Images


exports.Footer = Footer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactIntl = __webpack_require__(2);

var _Footer = {
  "footer": "_3vPEi87A1wyh1iLR3bsBGf"
};

var _Footer2 = _interopRequireDefault(_Footer);

var _headerBk = '/' + "bbaeb5f32b7042f0def39648a1d111b9.png";

var _headerBk2 = _interopRequireDefault(_headerBk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _jsx('p', {}, void 0, '\xA9 2018 \xB7 Movie Management Tool \xB7 Xxxxx Inc.');

function Footer() {
  return _jsx('div', {
    style: { background: '#FFF url(' + _headerBk2.default + ') center' },
    className: _Footer2.default.footer
  }, void 0, _ref);
}

exports.default = Footer;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

// Import Components


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MovieListItem = __webpack_require__(54);

var _MovieListItem2 = _interopRequireDefault(_MovieListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MovieList(props) {
  return _jsx('div', {
    className: 'listView'
  }, void 0, props.movies.map(function (movie) {
    return _jsx(_MovieListItem2.default, {
      movie: movie,
      onDelete: function onDelete() {
        return props.handleDeleteMovie(movie.id);
      }
    }, movie.id);
  }));
}

exports.default = MovieList;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(4);

var _reactIntl = __webpack_require__(2);

var _MovieListItem = {
  "single-movie": "xz5I78-4Hu5rFk9PG7Oav",
  "movie-title": "_1Poxe5xn-hD4NNYseWWPPa",
  "author-name": "_1mS9-sy18ePvK8h4mukhRa",
  "movie-desc": "cejcznom8lOCenBAeQoRv",
  "movie-action": "_1zO5o3GIrBo7i3muCaxxyN",
  "divider": "N_istcFNRHwmhAGNHGYFV",
  "movie-detail": "Mx4AH7XJwWI5hjKstLOJ0",
  "movie-more-info": "_1iqwLvnRfSsSQ6-fsUS6y_"
};

var _MovieListItem2 = _interopRequireDefault(_MovieListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import Style


var _ref = _jsx(_reactIntl.FormattedMessage, {
  id: 'deleteMovie'
});

var _ref2 = _jsx('strong', {}, void 0, 'language: ');

var _ref3 = _jsx('strong', {}, void 0, 'id: ');

var _ref4 = _jsx('strong', {}, void 0, 'year: ');

var _ref5 = _jsx('strong', {}, void 0, 'isHd: ');

var _ref6 = _jsx('strong', {}, void 0, 'hasCC: ');

var _ref7 = _jsx('strong', {}, void 0, 'professionals: ');

var MovieListItem = function (_React$Component) {
  _inherits(MovieListItem, _React$Component);

  function MovieListItem(props) {
    _classCallCheck(this, MovieListItem);

    var _this = _possibleConstructorReturn(this, (MovieListItem.__proto__ || Object.getPrototypeOf(MovieListItem)).call(this, props));

    _this.state = {
      moreInfoHidden: true
    };

    _this.onToggleMoreInfo = _this.onToggleMoreInfo.bind(_this);

    return _this;
  }

  _createClass(MovieListItem, [{
    key: 'onToggleMoreInfo',
    value: function onToggleMoreInfo() {
      this.setState({ moreInfoHidden: !this.state.moreInfoHidden });
    }
  }, {
    key: 'render',
    value: function render() {

      var props = this.props;

      return _jsx('div', {
        className: _MovieListItem2.default['single-movie']
      }, void 0, _jsx('h3', {
        className: _MovieListItem2.default['movie-title']
      }, void 0, _jsx(_reactRouter.Link, {
        to: '/movies/' + props.movie.id
      }, void 0, props.movie.title)), _jsx('p', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, props.movie.description), _jsx('p', {
        className: _MovieListItem2.default['movie-action']
      }, void 0, _jsx('a', {
        onClick: props.onDelete
      }, void 0, _ref), ' | \xA0 ', _jsx('a', {
        onClick: this.onToggleMoreInfo
      }, void 0, 'Toggle More Info')), _jsx('ul', {
        className: _MovieListItem2.default['movie-more-info'],
        hidden: this.state.moreInfoHidden
      }, void 0, _jsx('li', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, ' ', _ref2, props.movie.language), _jsx('li', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, ' ', _ref3, props.movie.id), _jsx('li', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, ' ', _ref4, props.movie.year), _jsx('li', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, ' ', _ref5, props.movie.isHd), _jsx('li', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, ' ', _ref6, props.movie.hasCC), _jsx('li', {
        className: _MovieListItem2.default['movie-desc']
      }, void 0, ' ', _ref7, props.movie.professionals)), _jsx('hr', {
        className: _MovieListItem2.default.divider
      }));
    }
  }]);

  return MovieListItem;
}(_react2.default.Component);

exports.default = MovieListItem;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieCreateWidget = undefined;

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = __webpack_require__(2);

var _MovieCreateWidget = {
  "form": "_3dBezx4eX12HD0X2Po60ZT",
  "form-content": "SGDATVbiOe5urjMfAFa_A",
  "form-title": "_15C5pcqHW0YFtuKeXbKMkO",
  "form-field": "_37PHoocs8M17xPIdw7Zibr",
  "movie-submit-button": "_331-yA-aUdMIDcyVMYRi7A",
  "appear": "EW7dGhHXO9maaxtQWeLnK"
};

var _MovieCreateWidget2 = _interopRequireDefault(_MovieCreateWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import Style


var _ref2 = _jsx(_reactIntl.FormattedMessage, {
  id: 'submit'
});

var _ref3 = _jsx(_reactIntl.FormattedMessage, {
  id: 'createNewMovie'
});

var _ref4 = _jsx('option', {
  value: 'tamil'
}, void 0, 'Tamil');

var _ref5 = _jsx('option', {
  value: 'telugu'
}, void 0, 'Telugu');

var _ref6 = _jsx('option', {
  value: 'hindi'
}, void 0, 'Hindi');

var _ref7 = _jsx('option', {
  value: 'malayalam'
}, void 0, 'Malayalam');

var _ref8 = _jsx('option', {
  value: 'kanada'
}, void 0, 'Kanada');

var _ref9 = _jsx('option', {
  value: 'bengali'
}, void 0, 'Bengali');

var _ref10 = _jsx('option', {
  value: 'marathi'
}, void 0, 'Marathi');

var _ref11 = _jsx('option', {
  value: 'punjabi'
}, void 0, 'Punjabi');

var _ref12 = _jsx('option', {
  value: 'chinese'
}, void 0, 'Chinese');

var _ref13 = _jsx(_reactIntl.FormattedMessage, {
  id: 'submit'
});

var MovieCreateWidget = exports.MovieCreateWidget = function (_Component) {
  _inherits(MovieCreateWidget, _Component);

  function MovieCreateWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MovieCreateWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MovieCreateWidget.__proto__ || Object.getPrototypeOf(MovieCreateWidget)).call.apply(_ref, [this].concat(args))), _this), _this.addMovie = function () {

      var typeRef = _this.refs.type;
      var titleRef = _this.refs.title;
      var durationRef = _this.refs.duration;
      var ratingsRef = _this.refs.ratings;
      var actorsRef = _this.refs.actors;
      var directorsRef = _this.refs.directors;
      var tagsRef = _this.refs.tags;
      var descriptionRef = _this.refs.description;
      var yearRef = _this.refs.year;
      var posterartsRef = _this.refs.posterarts;
      var thumbnailsRef = _this.refs.thumbnails;
      var hero_imagesRef = _this.refs.hero_images;
      var landscape_imagesRef = _this.refs.landscape_images;
      var backgroundsRef = _this.refs.backgrounds;
      var publisher_idRef = _this.refs.publisher_id;
      var has_trailerRef = _this.refs.has_trailer;
      var has_subtitleRef = _this.refs.has_subtitle;
      var import_idRef = _this.refs.import_id;
      var channel_idRef = _this.refs.channel_id;
      var channel_logoRef = _this.refs.channel_logo;
      var channel_nameRef = _this.refs.channel_name;
      var languageRef = _this.refs.language;

      _this.props.addMovie({
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
    }, _this.populateDummyMovie = function () {

      var getRandomArbitrary = function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min);
      };
      var counter = getRandomArbitrary(1, 1000);

      _this.refs.title.value = 'title' + counter;
      _this.refs.description.value = 'description' + counter;
      _this.refs.year.value = 2000;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MovieCreateWidget, [{
    key: 'render',
    value: function render() {
      var cls = _MovieCreateWidget2.default.form + ' ' + (this.props.showAddMovie ? _MovieCreateWidget2.default.appear : '');
      return _jsx('div', {
        className: cls
      }, void 0, _jsx('div', {
        className: _MovieCreateWidget2.default['form-content']
      }, void 0, _jsx('a', {
        className: _MovieCreateWidget2.default['movie-submit-button'],
        onClick: this.populateDummyMovie
      }, void 0, 'Populate Dummy Values'), ' | \xA0', _jsx('a', {
        className: _MovieCreateWidget2.default['movie-submit-button'],
        onClick: this.addMovie
      }, void 0, _ref2), _jsx('h2', {
        className: _MovieCreateWidget2.default['form-title']
      }, void 0, _ref3), _react2.default.createElement(
        'select',
        { ref: 'language', className: _MovieCreateWidget2.default['form-field'] },
        _ref4,
        _ref5,
        _ref6,
        _ref7,
        _ref8,
        _ref9,
        _ref10,
        _ref11,
        _ref12
      ), _react2.default.createElement('input', { placeholder: this.props.intl.messages.movieTitle, className: _MovieCreateWidget2.default['form-field'], ref: 'title' }), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.description, className: _MovieCreateWidget2.default['form-field'], ref: 'description' }), _react2.default.createElement('input', { placeholder: this.props.intl.messages.year, className: _MovieCreateWidget2.default['form-field'], ref: 'year' }), _jsx('a', {
        className: _MovieCreateWidget2.default['movie-submit-button'],
        onClick: this.addMovie
      }, void 0, _ref13)));
    }
  }]);

  return MovieCreateWidget;
}(_react.Component);

exports.default = (0, _reactIntl.injectIntl)(MovieCreateWidget);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchComponentData = fetchComponentData;

var _promiseUtils = __webpack_require__(57);

function fetchComponentData(store, components, params) {
  var needs = components.reduce(function (prev, current) {
    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
  }, []);

  return (0, _promiseUtils.sequence)(needs, function (need) {
    return store.dispatch(need(params, store.getState()));
  });
} /*
  Utility function to fetch required data for component to render in server side.
  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
  */

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequence = sequence;
/**
 * Throw an array to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
function sequence(items, consumer) {
  var results = [];
  var runner = function runner() {
    var item = items.shift();
    if (item) {
      return consumer(item).then(function (result) {
        results.push(result);
      }).then(runner);
    }

    return Promise.resolve(results);
  };

  return runner();
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(5);

var _post = __webpack_require__(59);

var PostController = _interopRequireWildcard(_post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

exports.default = router;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = getPosts;
exports.addPost = addPost;
exports.getPost = getPost;
exports.deletePost = deletePost;

var _post = __webpack_require__(11);

var _post2 = _interopRequireDefault(_post);

var _cuid = __webpack_require__(21);

var _cuid2 = _interopRequireDefault(_cuid);

var _limax = __webpack_require__(22);

var _limax2 = _interopRequireDefault(_limax);

var _sanitizeHtml = __webpack_require__(23);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
function getPosts(req, res) {
  _post2.default.find().sort('-dateAdded').exec(function (err, posts) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts: posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  var newPost = new _post2.default(req.body.post);

  // Let's sanitize inputs
  newPost.title = (0, _sanitizeHtml2.default)(newPost.title);
  newPost.name = (0, _sanitizeHtml2.default)(newPost.name);
  newPost.content = (0, _sanitizeHtml2.default)(newPost.content);

  newPost.slug = (0, _limax2.default)(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = (0, _cuid2.default)();
  newPost.save(function (err, saved) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
function getPost(req, res) {
  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
function deletePost(req, res) {
  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(function () {
      res.status(200).end();
    });
  });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(5);

var _movie = __webpack_require__(61);

var MovieController = _interopRequireWildcard(_movie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/movies').get(MovieController.getMovies);

// Get one post by id
router.route('/movies/:id').get(MovieController.getMovie);

// Add a new Post
router.route('/movies').post(MovieController.addMovie);

// Delete a post by id
router.route('/movies/:id').delete(MovieController.deleteMovie);

exports.default = router;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovies = getMovies;
exports.addMovie = addMovie;
exports.getMovie = getMovie;
exports.deleteMovie = deleteMovie;

var _movie = __webpack_require__(62);

var _movie2 = _interopRequireDefault(_movie);

var _cuid = __webpack_require__(21);

var _cuid2 = _interopRequireDefault(_cuid);

var _limax = __webpack_require__(22);

var _limax2 = _interopRequireDefault(_limax);

var _sanitizeHtml = __webpack_require__(23);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _post = __webpack_require__(11);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all movies
 * @param req
 * @param res
 * @returns void
 */
function getMovies(req, res) {
  _movie2.default.find().sort('-dateAdded').exec(function (err, movies) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ movies: movies });
  });
} // import Movie from '../models/movie';


function getDummyMovie(id, title, directors, description) {

  return {
    "id": id,
    "type": "v",
    "title": title,
    "duration": 6737,
    "ratings": [{
      "system": "mpaa",
      "value": "NR"
    }],
    "actors": ["Min-ki Lee", "Ye-won Kang", "In-kwon Kim", "Lilian Harvey", "Jeanne Fusier-Gir"],
    "directors": [directors],
    "tags": ["Action", "Comedy", "Thriller"],
    "description": description,
    "year": 2011,
    "posterarts": ["http://image-server.staging-public.tubi.io/SFqfrFgyC3IAsspvkrnmOitNBGY=/210x300/smart/img.adrise.tv/5bebfbe1-ce3e-46c0-8fd0-eeb45c2959c9.png"],
    "thumbnails": ["http://image-server.staging-public.tubi.io/3Nt6PL7gYDe-TzdL4v3n5TRHL6g=/456x256/smart/img.adrise.tv/8043ead5-0be8-4614-9f37-3682a952f961.jpg"],
    "hero_images": [],
    "landscape_images": [],
    "backgrounds": ["http://image-server.staging-public.tubi.io/PLY6xty_dk7uXhGIu5Fd8MTH4H4=/1920x1080/smart/img.adrise.tv/8043ead5-0be8-4614-9f37-3682a952f961.jpg"],
    "publisher_id": "abc2558d54505d4f0f32be94f2e7108c",
    "has_trailer": false,
    "has_subtitle": true,
    "import_id": "shout-factory",
    "channel_id": "shoutfactory",
    "channel_logo": "http://cdn.adrise.tv/image/channels/shoutfactory/logo_long.png",
    "channel_name": "Shout Factory"
  };
}

/**
 * Save a movie
 * @param req
 * @param res
 * @returns void
 */
function addMovie(req, res) {

  // validation : TODO
  /*
  if (!req.body.movie.title || !req.body.movie.directors || !req.body.movie.description) {
    res.status(403).end();
  }
  */

  // const movie = getDummyMovie(cuid(), req.body.movie.title, req.body.movie.directors, req.body.movie.description);
  // const newMovie = new Movie(movie);

  var newMovie = new _movie2.default(req.body.movie);
  newMovie.id = (0, _cuid2.default)();

  newMovie.save(function (err, saved) {
    if (err) {
      console.log('###### err');
      console.log(err);

      res.status(500).send(err);
    }
    res.json({ movie: saved });
  });
}

/**
 * Get a single movie
 * @param req
 * @param res
 * @returns void
 */
function getMovie(req, res) {
  _movie2.default.findOne({ id: req.params.cuid }).exec(function (err, movie) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ movie: movie });
  });
}

/**
 * Delete a movie
 * @param req
 * @param res
 * @returns void
 */
function deleteMovie(req, res) {
  _movie2.default.findOne({ id: req.params.id }).exec(function (err, movie) {
    if (err) {
      res.status(500).send(err);
    }

    movie.remove(function () {
      res.status(200).end();
    });
  });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var movieSchema = new Schema({

  id: { type: 'String', required: true },

  sInfo: {
    id: { type: 'String', required: false },
    name: { type: 'String', required: false },
    link: { type: 'String', required: false }
  },

  posterImgUrl: { type: 'String', required: false },
  title: { type: 'String', required: false },
  isMustWatch: { type: 'Boolean', required: false },

  year: { type: 'Number', required: false },
  language: { type: 'String', required: false },
  description: { type: 'String', required: false },

  isHd: { type: 'Boolean', required: false },
  hasCC: { type: 'Boolean', required: false },

  professionals: {
    type: [{
      role: { type: 'String', required: false },
      name: { type: 'String', required: false },
      img: { type: 'String', required: false }
    }],
    default: [], required: false
  },

  ratings: {
    type: [{}],
    default: [], required: false
  },

  wikiUrl: { type: 'String', required: false },
  trailerUrl: { type: 'String', required: false },
  videoUrl: { type: 'String', required: false },

  // xtra: model
  dateAdded: { type: 'Date', default: Date.now, required: false }

});

exports.default = _mongoose2.default.model('Movie', movieSchema);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  _post2.default.count().exec(function (err, count) {
    if (count > 0) {
      return;
    }

    var content1 = 'Sed ut perspiciatis unde omnis iste natus error\n      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,\n      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae\n      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos\n      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem\n      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi\n      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\n      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id\n      est laborum';

    var content2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi\n      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\n      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id\n      est laborum. Sed ut perspiciatis unde omnis iste natus error\n      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,\n      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae\n      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos\n      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem\n      ipsum quia dolor sit amet.';

    var post1 = new _post2.default({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    var post2 = new _post2.default({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    _post2.default.create([post1, post2], function (error) {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
};

var _post = __webpack_require__(11);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var webpack = __webpack_require__(24);
var cssnext = __webpack_require__(65);
var postcssFocus = __webpack_require__(66);
var postcssReporter = __webpack_require__(67);

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
    vendor: ['react', 'react-dom']
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: 'http://0.0.0.0:8000/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  module: {
    rules: [{
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          localIdentName: '[name]__[local]__[hash:base64:5]',
          modules: true,
          importLoaders: 1,
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function plugins() {
            return [postcssFocus(), cssnext({
              browsers: ['last 2 versions', 'IE > 10']
            }), postcssReporter({
              clearMessages: true
            })];
          }
        }
      }]
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.jsx*$/,
      exclude: [/node_modules/, /.+\.config.js/],
      use: 'babel-loader'
    }, {
      test: /\.(jpe?g|gif|png|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }]
  },

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.js'
  }), new webpack.DefinePlugin({
    'process.env': {
      CLIENT: JSON.stringify(true),
      'NODE_ENV': JSON.stringify('development')
    }
  })]
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("postcss-focus");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ })
/******/ ]);