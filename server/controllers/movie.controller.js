// import Movie from '../models/movie';
import Movie from '../models/movie';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import Post from "../models/post";
import {fetchMovieUrlFromSrc} from '../util/fetchFromSrc';
import request from "request";


/**
 * Get all movies
 * @param req
 * @param res
 * @returns void
 */
export function getMovies(req, res) {
  Movie.find().sort('-dateAdded').exec((err, movies) => {
    if (err) {
      res.status(500).send(err);
    }

    // const movies = moviesResp.map((m)=> {
    //   const { _id, ...movie } = m;
    //   return { id: m.title, title: m.title, description: m.title };
    // });

    // console.log(movies);


    res.json({movies});
  });
}


function getDummyMovie(id, title, directors, description) {

  return {
    "id": id,
    "type": "v",
    "title": title,
    "duration": 6737,
    "ratings": [
      {
        "system": "mpaa",
        "value": "NR"
      }
    ],
    "actors": [
      "Min-ki Lee",
      "Ye-won Kang",
      "In-kwon Kim",
      "Lilian Harvey",
      "Jeanne Fusier-Gir"
    ],
    "directors": [
      directors
    ],
    "tags": [
      "Action",
      "Comedy",
      "Thriller"
    ],
    "description": description,
    "year": 2011,
    "posterarts": [
      "http://image-server.staging-public.tubi.io/SFqfrFgyC3IAsspvkrnmOitNBGY=/210x300/smart/img.adrise.tv/5bebfbe1-ce3e-46c0-8fd0-eeb45c2959c9.png"
    ],
    "thumbnails": [
      "http://image-server.staging-public.tubi.io/3Nt6PL7gYDe-TzdL4v3n5TRHL6g=/456x256/smart/img.adrise.tv/8043ead5-0be8-4614-9f37-3682a952f961.jpg"
    ],
    "hero_images": [],
    "landscape_images": [],
    "backgrounds": [
      "http://image-server.staging-public.tubi.io/PLY6xty_dk7uXhGIu5Fd8MTH4H4=/1920x1080/smart/img.adrise.tv/8043ead5-0be8-4614-9f37-3682a952f961.jpg"
    ],
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
export function addMovie(req, res) {

  // validation : TODO
  /*
  if (!req.body.movie.title || !req.body.movie.directors || !req.body.movie.description) {
    res.status(403).end();
  }
  */

  // const movie = getDummyMovie(cuid(), req.body.movie.title, req.body.movie.directors, req.body.movie.description);
  // const newMovie = new Movie(movie);

  const newMovie = new Movie(req.body.movie);
  newMovie.id = cuid();

  newMovie.save((err, saved) => {
    if (err) {
      console.log('###### err');
      console.log(err);

      res.status(500).send(err);
    }
    res.json({movie: saved});
  });
}

/**
 * Get a single movie
 * @param req
 * @param res
 * @returns void
 */
export function getMovie(req, res) {

  // console.log('### req.params.id:', req.params.id);

  Movie.findOne({id: req.params.id}).exec((err, movie) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({movie});
  });
}


/**
 * Get a single movie URL from source
 * @param req
 * @param res
 * @returns void
 */
export function getMovieUrlFromSrc(req, res) {

  console.log('### req.params.id:', req.params.id);

  Movie.findOne({id: req.params.id}).lean().exec((err, movie) => {
    if (err) {
      res.status(500).send(err);
    }

    console.log('### movie.sInfo:', movie.sInfo);

    fetchMovieUrlFromSrc(movie.sInfo)
      .then(function (movieUrl) {

        console.log('### success:', movieUrl);

        res.json({movieUrl});

      }).catch(function (err) {

      console.log('### err:', err);

      res.status(500).send(err);

    });


  });
}


/**
 * Delete a movie
 * @param req
 * @param res
 * @returns void
 */
export function deleteMovie(req, res) {
  Movie.findOne({id: req.params.id}).exec((err, movie) => {
    if (err) {
      res.status(500).send(err);
    }

    movie.remove(() => {
      res.status(200).end();
    });
  });
}


/**
 * proxy Movies
 * @param req
 * @param res
 * @returns void
 */
export function testMovies(req, res) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('## proxyMovies fullUrl: '+ fullUrl);

  const srcUrl = req.originalUrl.split('/api/movies/pxy/')[1];
  console.log('## proxyMovies srcUrl: '+ srcUrl);

  const options = {
    url: srcUrl,
    headers: {
      'Accept': '*/*',
      'Cookie': '',
      'Cache-Control': 'no-cache'
    }
  };
  // console.log(options);
  // req.pipe(request(options)).pipe(res);


  res.json(options);

}

/**
 * proxy Movies
 * @param req
 * @param res
 * @returns void
 */
export function proxyMovies(req, res) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('## proxyMovies fullUrl: '+ fullUrl);

  const srcUrl = req.originalUrl.split('/api/movies/pxy/')[1];
  console.log('## proxyMovies srcUrl: '+ srcUrl);

  const options = {
    url: srcUrl,
    headers: {
      'Accept': '*/*',
      'Cookie': '',
      'Cache-Control': 'no-cache'
    }
  };
  // console.log(options);
  req.pipe(request(options)).pipe(res);

}
