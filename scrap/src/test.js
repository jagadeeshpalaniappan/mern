const {getPageVideoUrl} = require('./geturl');


const args = process.argv.slice(2);
const pageUrl = args[0];

async function getUrl () {
  const eachMovieVideoUrl = await getPageVideoUrl(pageUrl);
  console.log(eachMovieVideoUrl);
}

getUrl();
