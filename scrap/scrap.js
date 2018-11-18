const fs = require('fs');
const cuid = require('cuid');
const {getPageVideoUrl} = require('./geturl');



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

  fs.readFile('./tamil.json', (err, data) => {
    if (err) throw err;
    let tamilMovies = JSON.parse(data);
    const allMovies = getAllMovies(tamilMovies);

    addVideoLinkToMoviesAndWrite(allMovies);

  });

}

async function addVideoLinkToMoviesAndWrite (allMovies) {

  const allMoviesFinalStruct = [];

  const moviesNotHasUrl = [];

  let count = 0;

  for (const eachMovie of allMovies) {
    if (eachMovie.enLink) {
      const url = 'https://einthusan.tv' + eachMovie.enLink;

      console.log((count++) + '--------------'+url);
      const eachMovieVideoUrl = await getPageVideoUrl(url);
      eachMovie.videoUrl = eachMovieVideoUrl;
      console.log(eachMovieVideoUrl);

      eachMovie.id  = cuid();

      allMoviesFinalStruct.push(eachMovie);
      console.log(count + '--------------/'+url);

      await timeout(3000);

    } else {
      moviesNotHasUrl.push(eachMovie);
    }

  }

  writeMovie(allMoviesFinalStruct);

}



function writeMovie(allMoviesFinalStruct) {

  const allMoviesByPageStr =JSON.stringify(allMoviesFinalStruct);
  fs.writeFile('tamil.final.json', allMoviesByPageStr, 'utf8', function (err, data) {
    if (err) throw err;
    console.log('WRITE: DONE');
  });

}


readFile();




