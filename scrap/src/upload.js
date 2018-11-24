const fs = require('fs');
const cuid = require('cuid');
var promiseLimit = require('promise-limit');

const {getPageVideoUrl} = require('./geturl');
// const {getBytesAndUploadToS3} = require('./uploadToS3');
const {getBytesAndUploadToS3} = require('./uploadLargeFileToS3');
const {sendEmail} = require('./email');


const args = process.argv.slice(2);
const lang = args[0];
const pageNo = Number(args[1]);

// var currentPageNo = pageNo;
var LAST_PAGE_NO = 214;



/*


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/






function getRequiredMovies(tamilMovies, eachPageNo) {
  var pageNoStr = 'page'+eachPageNo;
  return tamilMovies[pageNoStr];
}


function getLastPorcessedPageNo(pageNo) {

  let maxVal = pageNo;

  fs.readdirSync('../upload/')
    .forEach(file => {
      const processedFilePageNo = Number(file.split('.')[2]);
      if (!isNaN(processedFilePageNo)) {
        maxVal = Math.max(maxVal, processedFilePageNo)
      }
  });

  // console.log(maxVal);

  return maxVal

}


async function processEachPage(tamilMovies) {

  // var allkeys = Object.keys(tamilMovies);

  let currentPageNo = pageNo;
  while (currentPageNo<=LAST_PAGE_NO) {

    const lastPorcessedPageNo = getLastPorcessedPageNo(pageNo);

    // console.log('######## currentPageNo: '+ currentPageNo);

    if (currentPageNo > lastPorcessedPageNo) {

      sendPageNo(currentPageNo);

      const allMovies = getRequiredMovies(tamilMovies, currentPageNo);

      if(allMovies && allMovies.length > 0) {
        console.log('######## currentPageNo: '+ currentPageNo +' --No of Records to Process: '+allMovies.length +'########');
        await getMp4VideoUrl(allMovies, currentPageNo);
      }

      currentPageNo++;
    } else {
      currentPageNo = lastPorcessedPageNo + 1;
    }

    console.log('######## (nextPageNo,lastPorcessedPageNo) : '+ currentPageNo, lastPorcessedPageNo);
  }


  /*

  for (var i=pageNo; i<= 214; i++) {

    currentPageNo = i;

    sendPageNo(currentPageNo);

    const allMovies = getRequiredMovies(tamilMovies, i);

    if(allMovies && allMovies.length > 0) {
      console.log('######## currentPageNo: '+ i +' --No of Records to Process: '+allMovies.length +'########');
      // await getMp4VideoUrl(allMovies, currentPageNo);
    }

  }
  */

}



function readFile() {

  console.log('lang:'+lang);

  fs.readFile('../enMetaData/'+lang+'.json', (err, data) => {
    if (err) throw err;
    let tamilMovies = JSON.parse(data);
    processEachPage(tamilMovies);
  });

}


async function getMp4VideoUrl (allMovies, currentPageNo) {

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

        /*
        const eachMovieVideoUrl = {
          "MP4Link": "https://s3-us-west-2.amazonaws.com/indiantv/cjorbezcy00001qqmc7931keo.mp4",
          "HLSLink": "https://s19.einthusan.tv/einthusancom/hot/DzAq4.mp4.m3u8?e=1542876154&md5=y5ErhYvnUC7ZL1xWQz42nw",
          "Datacenter": "San",
          "Premium": false,
          "V": 1
        };
        */

        eachMovie.videoUrl = eachMovieVideoUrl;
        console.log(eachMovieVideoUrl);

        eachMovie.id  = cuid();
        console.log('**MOVIE ID:'+eachMovie.id);

        sucessMoviesToGetMp4Url.push(eachMovie);


        await getEachMovieAndUploadToS3(eachMovie)
          .then(function (obj) {
            sucessMoviesToUpload.push(obj);
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

  writeMovie(sucessMoviesToUpload, failedMoviesToUpload, sucessMoviesToGetMp4Url, failedMoviesToGetMp4Url, currentPageNo);

}


function getEachMovieAndUploadToS3(eachMovie) {

  return new Promise(function (resolve, reject) {

    // console.log('U:' + eachMovie.enLink);

    var keyName = eachMovie.id + '.mp4';

    if (eachMovie && eachMovie.videoUrl && eachMovie.videoUrl['MP4Link']) {

      var srcUrl = eachMovie.videoUrl['MP4Link'];

      console.log('UPLOAD: START', keyName);

      getBytesAndUploadToS3(srcUrl, keyName)
        .then(function (obj) {
          console.log('UPLOAD: DONE');
          send({eachMovie: eachMovie, isSucess: true, obj: obj });
          resolve({eachMovie: eachMovie, isSucess: true });
        })
        .catch(function (obj) {
          console.log('UPLOAD: ERR');
          send({eachMovie: eachMovie, isSucess: false, obj: obj });
          reject({eachMovie: eachMovie, isSucess: false, obj: obj });
        });

    } else {

      reject({eachMovie: eachMovie, isSucess: false });

    }


  });

}



/*


function readFile() {

  console.log('lang:'+lang);

  fs.readFile('./'+lang+'.final.json', (err, data) => {
    if (err) throw err;
    let allMovies = JSON.parse(data);
    console.log('No of Records to Process: '+allMovies.length);
    getAllMoviesAndUploadToS3(allMovies);

  });

}
*/





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


  var limit = promiseLimit(1);

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



function getFileBaseName(currentPageNo) {
  return '../upload/'+lang+'.p.'+currentPageNo;
}


function writeMovie(sucessMoviesToUpload, failedMoviesToUpload, sucessMoviesToGetMp4Url, failedMoviesToGetMp4Url, currentPageNo) {

  console.log('No of Records (Success) Upload: '+sucessMoviesToUpload.length);
  fs.writeFile(getFileBaseName(currentPageNo)+'.upload.success.json', JSON.stringify(sucessMoviesToUpload), 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed) Upload: '+failedMoviesToUpload.length);

  if (failedMoviesToUpload.length > 0) {
    fs.writeFile(getFileBaseName(currentPageNo)+'.upload.failed.json', JSON.stringify(failedMoviesToUpload), 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }

  console.log('No of Records (Success) Mp4 Url: '+sucessMoviesToGetMp4Url.length);
  fs.writeFile(getFileBaseName(currentPageNo)+'.mp4url.success.json', JSON.stringify(sucessMoviesToGetMp4Url), 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed) Mp4 Url: '+failedMoviesToGetMp4Url.length);
  if (failedMoviesToGetMp4Url.length > 0) {
    fs.writeFile(getFileBaseName(currentPageNo)+'.mp4url.failed.json', JSON.stringify(failedMoviesToGetMp4Url), 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }
}


function send(obj) {
  var subj = obj.isSucess ? 'Upload DONE' : 'Upload ERR';
  // send: email (success upload)
  sendEmail('jaganttpus@gmail.com',
    'jagadeeshthegeek@gmail.com',
    subj,
    JSON.stringify(obj)
  )
    .then(function (info) {
      console.log('EMAIL: DONE');
    })
    .catch(function (err) {
      console.log('EMAIL: ERR');
    });
}


function sendPageNo(currentPageNo) {
  // send: email (success upload)
  sendEmail('jaganttpus@gmail.com',
    'jagadeeshthegeek@gmail.com',
    'PAGE: STARTED',
    'PAGE: '+currentPageNo + ' STARTED'
  ).then(function (info) {
      // console.log('EMAIL: DONE');
    })
    .catch(function (err) {
      // console.log('EMAIL: ERR');
    });
}



readFile();




