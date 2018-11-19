const fs = require('fs');
const cuid = require('cuid');
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

async function addVideoLinkToMoviesAndWrite (allMovies) {

  const allMoviesFinalStruct = [];

  const failedMovies = [];

  let count = 0;

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



readFile();




