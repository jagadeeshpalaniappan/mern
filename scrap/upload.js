const fs = require('fs');
const cuid = require('cuid');
var promiseLimit = require('promise-limit')

const {getBytesAndUploadToS3} = require('./uploadToS3');

const args = process.argv.slice(2);
const lang = args[0];


/*


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/



function readFile() {

  console.log('lang:'+lang);

  fs.readFile('./'+lang+'.final.json', (err, data) => {
    if (err) throw err;
    let allMovies = JSON.parse(data);
    console.log('No of Records to Process: '+allMovies.length);
    getAllMoviesAndUploadToS3(allMovies);

  });

}





function getAllMoviesAndUploadToS3 (allMovies) {

  function apiRequest(eachMovie) {

    return new Promise(function (resolve, reject) {

        var obj = {};

        var enId = eachMovie.enLink.split('/')[3];
        var lang = eachMovie.enLink.split('=')[1];
        var iMovieId = enId? cuid()+'$'+ enId : cuid()+'$';
        var keyName = lang ? iMovieId +'$'+ lang : iMovieId;

        if (eachMovie && eachMovie.videoUrl && eachMovie.videoUrl['MP4Link']) {

          var srcUrl = eachMovie.videoUrl['MP4Link'];

          console.log('START: ---------srcUrl:'+ srcUrl);

          getBytesAndUploadToS3(srcUrl, keyName)
            .then(function (obj) {

              console.log('DONE: ---------srcUrl:'+ srcUrl);

              obj.enLink = eachMovie.enLink;
              resolve(obj);
            })
            .catch(function (obj) {

              console.log('ERR: ---------srcUrl:'+ srcUrl);

              obj.enLink = eachMovie.enLink;
              reject(obj);
            });

        } else {

          reject({ srcUrl: null, keyName: keyName, resp: null, isSucess: false, enLink: eachMovie.enLink});

        }

    })
      .catch(function (err) {
        //return error;
        return err;
      });
  }

  const successRecords = [];
  const failedRecords = [];


  var limit = promiseLimit(10);

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

  fs.writeFile('./upload/'+lang+'.upload.success.json', allMoviesByPageStr, 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed): '+failedMovies.length);

  if (failedMovies.length > 0) {
    const failedMoviesStr =JSON.stringify(failedMovies);
    fs.writeFile('./upload/'+lang+'.upload.failed.json', failedMoviesStr, 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }
}



readFile();




