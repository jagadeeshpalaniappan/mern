const fs = require('fs');
const cuid = require('cuid');
var promiseLimit = require('promise-limit')

const {getPageVideoUrl} = require('./geturl');

const args = process.argv.slice(2);
const lang = args[0];




function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function getAllMovies(tamilMovies) {
  const allMovies = [];
  const tamilMoviesPageKeys = Object.keys(tamilMovies);
  for (const eachPage of tamilMoviesPageKeys) {
    const eachPageMovies = tamilMovies[eachPage];
    // console.log(eachPageMovies.length);
    for (const eachMovie of eachPageMovies) {
      // eachMovie.enData = eachMovie;
      allMovies.push(eachMovie);
    }
  }
  // console.log(allMovies);
  return allMovies;
}




function readFile() {

  console.log('lang:'+lang);

  fs.readFile('./'+lang+'.final.json', (err, data) => {
    if (err) throw err;
    let tamilMovies = JSON.parse(data);
    const allMovies = getAllMovies(tamilMovies);

    console.log('No of Records to Process: '+allMovies.length);

    // addVideoLinkToMoviesAndWrite(allMovies);
    addVideoLinkToMoviesAndWriteAsyn(allMovies);

  });

}





function addVideoLinkToMoviesAndWriteAsyn (allMovies) {

  function apiRequest(eachMovie) {

    return new Promise(function (resolve, reject) {

      setTimeout(function () {

        var obj = {};

        if (eachMovie.enLink) {

          const url = 'https://einthusan.tv' + eachMovie.enLink;
          console.log('--------------'+url);

          getPageVideoUrl(url)
            .then(function (eachMovieVideoUrl) {

              obj.isSuccess = true;

              eachMovie.videoUrl = eachMovieVideoUrl;
              console.log(eachMovieVideoUrl);

              eachMovie.id  = cuid();

              obj.data = eachMovie;

              resolve(obj);

            })
            .catch(function (err) {

              console.log('------err--------'+ url);
              console.log(err);


              obj.isSuccess = false;
              obj.data = eachMovie;

              reject(obj);
            });

        } else {

          console.log('------url: err--------');
          console.log(eachMovie.enLink);

          obj.isSuccess = false;
          obj.data = eachMovie;
          reject(obj);

        }

      }, 10000);

    })
      .catch(function (err) {
        //return error;
        return err;
      });
  }

  const successRecords = [];
  const failedRecords = [];


  var limit = promiseLimit(5);

  var arrayOfPromises = allMovies.map((eachMovie) => {
    return limit(() => apiRequest(eachMovie))
  });


  Promise.all(arrayOfPromises)
    .then(function (allData) {

      // console.log('Promise.all', allData);

      allData.forEach(resp => {
        if (resp.isSuccess) {
          successRecords.push(resp.data)
        } else {
          failedRecords.push(resp.data)
        }

      });

      console.log('successRecords', successRecords.length);
      console.log('failedRecords', failedRecords.length);

      writeMovie(successRecords, failedRecords);

    })
    .catch(function (err) {
      console.error('err', err);
    });

}



function writeMovie(allMoviesFinalStruct, failedMovies) {

  console.log('No of Records (Success): '+allMoviesFinalStruct.length);

  const allMoviesByPageStr =JSON.stringify(allMoviesFinalStruct);

  fs.writeFile(lang+'.final.async.json', allMoviesByPageStr, 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed): '+failedMovies.length);

  if (failedMovies.length > 0) {
    const failedMoviesStr =JSON.stringify(failedMovies);
    fs.writeFile(lang+'.failed.async.json', failedMoviesStr, 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }
}



readFile();




