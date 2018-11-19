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

  fs.readFile('./'+lang+'.json', (err, data) => {
    if (err) throw err;
    let tamilMovies = JSON.parse(data);
    const allMovies = getAllMovies(tamilMovies);

    console.log('No of Records to Process: '+allMovies.length);

    addVideoLinkToMoviesAndWrite(allMovies);

  });

}



function some(promises, count = 1) {

  const wrapped = promises.map(promise => promise.then(value => ({success: true, value}), () => ({success: false})));
  return Promise.all(wrapped).then(function (results) {

    const successful = results.filter(result => result.success);


    if (successful.length < count)
      throw new Error("Only " + successful.length + " resolved.")


    return successful.map(result => result.value);
  });

}





async function addVideoLinkToMoviesAndWrite (allMovies) {

  const allMoviesFinalStruct = [];

  const failedMovies = [];

  let count = 0;

  let allPromises = allMovies.map(eachMovie => {

    const url = 'https://einthusan.tv' + eachMovie.enLink;
    console.log((count++) + '--------------'+url);
    return getPageVideoUrl(url);

  });

/*  const = arrayOfPromises.map(p => p.catch((err) => err));

  Promise.all()
    .then(data => {
      console.log(data); // you also get err thrown in too, yay!
    });*/



  for (const eachMovie of allMovies) {
    if (eachMovie.enLink) {

      try {

        const url = 'https://einthusan.tv' + eachMovie.enLink;

        console.log((count++) + '--------------'+url);
        const eachMovieVideoUrl = await getPageVideoUrl(url);
        eachMovie.videoUrl = eachMovieVideoUrl;
        console.log(eachMovieVideoUrl);

        eachMovie.id  = cuid();

        allMoviesFinalStruct.push(eachMovie);
        console.log(count + '--------------/'+url);

        await timeout(3000);

      } catch(e) {
        failedMovies.push(eachMovie);
      }

    } else {
      failedMovies.push(eachMovie);
    }

  }

  writeMovie(allMoviesFinalStruct, failedMovies);

}



function writeMovie(allMoviesFinalStruct, failedMovies) {

  console.log('No of Records (Success): '+allMoviesFinalStruct.length);

  const allMoviesByPageStr =JSON.stringify(allMoviesFinalStruct);

  fs.writeFile(lang+'.final.json', allMoviesByPageStr, 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

  console.log('No of Records (Failed): '+failedMovies.length);

  if (failedMovies.length > 0) {
    const failedMoviesStr =JSON.stringify(failedMovies);
    fs.writeFile(lang+'.failed.json', failedMoviesStr, 'utf8', function (err, data) {
      if (err) throw err;
      console.log('WRITE: FAILURE DONE');
    });
  }
}





// readFile();


/*



var limit = promiseLimit(2)

var jobs = ['a', 'b', 'c', 'd', 'e'];

var arrayOfPromises = jobs.map((name) => {
  return limit(() => job(name))
})


var s = [];
var f = [];

var arrayOfPromises1 = arrayOfPromises.map(p => {

  p.then((success) => {
    s.push(success);
  })
  p.catch((err) => {
    f.push(err);
  })

  return p;
});

Promise.all(arrayOfPromises1)
  .then(data => {
    console.log(data); // you also get err thrown in too, yay!
    console.log(s); // you also get err thrown in too, yay!
    console.log(f); // you also get err thrown in too, yay!
  });




function job (name) {
  var text = `job ${name}`
  console.log('started', text)

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('       ', text, 'finished');

      if (name === 'b' || name === 'd') {
        reject(text);
      } else {
        resolve(text);
      }


    }, 100)
  })
}


*/


//
// Promise.all().then(results => {
//   console.log()
//   console.log('results:', results)
// }).catch(failedRecords => {
//   console.log()
//   console.log('failedRecords:', failedRecords)
// })




//Promise.all [ 'urlOne', 'apiRequest failed!', 'urlThree' ]





