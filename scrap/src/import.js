var mongoose = require('mongoose');
const MovieTest = require("./movietest");

const fs = require('fs');
const args = process.argv.slice(2);

const lang = args[0];
const pageNo = args[1];
const maxPageNo = args[2];


async function processEachPage() {

  var allMovies = [];

  for (var i = pageNo; i <= maxPageNo; i++) {

    console.log('######## currentPageNo: ' + i + '########');

    await readFileAsync('../upload/tamil.p.' + i + '.upload.success.json')
      .then(function (data) {
        allMovies = allMovies.concat(data);
      })
      .catch(function (err) {
        console.log(err);
      });

  }


  // console.log(JSON.stringify(allMovies));
  console.log(allMovies.length);
  console.log('######## TOTAL --No of Records to Process: ' + allMovies.length + '########');

  writeToDB(allMovies);

}


function readFileAsync(path) {
  return new Promise(function (resolve, reject) {

    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });

  });
}


function createMovie(movie) {
  return new Promise(function (resolve, reject) {

    const newMovie = new MovieTest(movie.eachMovie);
    newMovie.videoUrl = movie.eachMovie.id + '.mp4';
    newMovie.language = movie.eachMovie.lang;
    const eid = movie.eachMovie.enLink.split("/")[3];
    newMovie.sInfo = {
      id: eid,
      name: 'ien',
      link: movie.eachMovie.enLink,
    };

    newMovie.save((err, saved) => {
      if (err) {
        console.log('###### db err id:'+movie.eachMovie.id);
        console.log(err);
        reject(err);
      } else {
        console.log('###### db success id:'+movie.eachMovie.id);
        resolve(saved);
      }

    });

  });
}


function dbconnect() {
  return new Promise(function (resolve, reject) {
    mongoose.connect('mongodb://admin:admin123@ds045147.mlab.com:45147/moviesmlab', function (err) {
      if (err) {
        reject(err);
      } else {
        console.log('Successfully connected');
        resolve()
      }
    });

  });

}


async function writeToDB(allMovies) {

  await dbconnect();

  for (let i = 0; i < allMovies.length; i++) {
    await createMovie(allMovies[i]);
  }

  mongoose.connection.close();
}



function importToMongo() {

  console.log('lang:' + lang);
  console.log('pageNo:' + pageNo);
  console.log('maxPageNo:' + maxPageNo);

  processEachPage();

  console.log('END:' + maxPageNo);

}

importToMongo();
