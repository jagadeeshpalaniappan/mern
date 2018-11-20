const fs = require('fs');
const cuid = require('cuid');
var promiseLimit = require('promise-limit');

const {getPageVideoUrl} = require('./geturl');
const {download} = require('./downloadFile');
const {sendEmail} = require('./email');

const args = process.argv.slice(2);
const lang = args[0];
const pageNo = args[1];



function getRequiredMovies(tamilMovies) {
  var pageNoStr = 'page'+pageNo;
  return tamilMovies[pageNoStr];
}


function readFile() {

  console.log('lang:'+lang);

  fs.readFile('../enMetaData/'+lang+'.json', (err, data) => {
    if (err) throw err;
    let tamilMovies = JSON.parse(data);
    const allMovies = getRequiredMovies(tamilMovies);

    console.log('No of Records to Process: '+allMovies.length);

    getMp4VideoUrl(allMovies);

  });

}


async function getMp4VideoUrl (allMovies) {

  const sucessMoviesToGetMp4Url = [];
  const failedMoviesToGetMp4Url = [];

  const sucessMoviesToUpload = [];
  const failedMoviesToUpload = [];

  let count = 0;

  for (const eachMovie of allMovies) {
    if (eachMovie.enLink) {

      try {

        const url = 'https://einthusan.tv' + eachMovie.enLink;

        console.log((count) + '--------------'+url);
        const eachMovieVideoUrl = await getPageVideoUrl(url);
        eachMovie.videoUrl = eachMovieVideoUrl;
        console.log(eachMovieVideoUrl);

        eachMovie.id  = cuid();

        sucessMoviesToGetMp4Url.push(eachMovie);


        await getEachMovieAndDownloadToLocal(eachMovie)
          .then(function (obj) {
            sucessMoviesToUpload.push(obj);

            // send: email (success upload)
            /*
            sendEmail('jaganttpus@gmail.com', 'jagadeeshthegeek@gmail.com', 'Upload DONE', JSON.stringify(eachMovie))
              .then(function (info) {
                console.log('EMAIL: DONE');
              })
              .catch(function (err) {
                console.log('EMAIL: ERR');
              });
            */

          })
          .catch(function (obj) {
            failedMoviesToUpload.push(obj);
          });

        console.log((count) + '--------------/'+url);

        count++;

        // await timeout(3000);

      } catch(e) {
        failedMoviesToGetMp4Url.push(eachMovie);
      }

    } else {
      failedMoviesToGetMp4Url.push(eachMovie);
    }

  }

  writeMovie(sucessMoviesToUpload, failedMoviesToUpload, sucessMoviesToGetMp4Url, failedMoviesToGetMp4Url);

}


function getEachMovieAndDownloadToLocal(eachMovie) {

  return new Promise(function (resolve, reject) {

    // console.log('U:' + eachMovie.enLink);

    var fileName = eachMovie.id + '.mp4';

    if (eachMovie && eachMovie.videoUrl && eachMovie.videoUrl['MP4Link']) {

      var srcUrl = eachMovie.videoUrl['MP4Link'];

      console.log('DOWNLOAD: START');

      var destLoc = '../../../download/tamil/page'+pageNo+'/';
      download(srcUrl, destLoc, fileName)
        .then(function (obj) {
          console.log('DOWNLOAD: DONE');
          resolve({ eachMovie: eachMovie, isSuccess: true });
        })
        .catch(function (obj) {
          console.log('DOWNLOAD: ERR');
          reject({ eachMovie: eachMovie, isSuccess: false });
        });

    } else {

      reject({eachMovie: eachMovie, isSuccess: false });

    }

  });

}



function getFileBaseName() {
  return '../downloadStatus/'+lang+'.p.'+pageNo+'.'+Date.now();
}


function writeMovie(sucessMoviesToUpload, failedMoviesToUpload, sucessMoviesToGetMp4Url, failedMoviesToGetMp4Url) {

  console.log('No of Records (Success) download: '+sucessMoviesToUpload.length);
  fs.writeFile(getFileBaseName()+'.download.success.json', JSON.stringify(sucessMoviesToUpload), 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed) download: '+failedMoviesToUpload.length);

  if (failedMoviesToUpload.length > 0) {
    fs.writeFile(getFileBaseName()+'.download.failed.json', JSON.stringify(failedMoviesToUpload), 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }

  console.log('No of Records (Success) Mp4 Url: '+sucessMoviesToGetMp4Url.length);
  fs.writeFile(getFileBaseName()+'.mp4url.success.json', JSON.stringify(sucessMoviesToGetMp4Url), 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed) Mp4 Url: '+failedMoviesToGetMp4Url.length);
  if (failedMoviesToGetMp4Url.length > 0) {
    fs.writeFile(getFileBaseName()+'.mp4url.failed.json', JSON.stringify(failedMoviesToGetMp4Url), 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }
}



readFile();




