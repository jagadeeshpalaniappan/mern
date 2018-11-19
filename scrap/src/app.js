var tr = require('tor-request');
var request = require('request');
var cheerio = require('cheerio');
var zlib = require('zlib');
var fs = require('fs');


tr.TorControlPort.password = 'hellopassword';


function makeRequestTor(pageNo, resolve, reject, lang) {

  var url = 'https://einthusan.tv/movie/results/?find=Recent&lang='+lang+'&page='+pageNo;
  var headers = {'Accept-Encoding': 'gzip'};

  tr.newTorSession((err) => {

    console.log(err);

    tr.request({ url: url, headers: headers, gzip: true}, function (err, res, body) {
      if (!err && res.statusCode == 200) {

        console.log("Your public (through Tor) IP is: pageNo"+pageNo);
        parseHTML(body, pageNo, resolve, reject);


      } else {
        console.log(err);
      }
    });

  });



}



function handleBlock1($, liEle, movieData) {

  const block1 = $(liEle).find('.block1');
  // // console.log($(block1).html());
  const block1A = $(block1).children();
  // console.log('id:' + block1A.attr('href'));

  const block1AH3 = $(block1A).children();
  // console.log('posterImgUrl:' + block1AH3.attr('src'));

  movieData.enLink = block1A.attr('href');
  movieData.posterImgUrl = block1AH3.attr('src');

  // console.log('----');

}


function handleBlock2($, liEle, movieData) {

  const block2 = $(liEle).find('.block2');
  // // console.log($(block2).html());


  // .title:
  const title = $(block2).find('.title');
  const titleH3 = $(title).children().get(0);
  // console.log('title:' + $(titleH3).text());
  movieData.title = $(titleH3).text();

  const isMustWatch = $(title).children().get(1);
  // console.log('isMustWatch:' + ($(isMustWatch).text() === 'Must Watch' ? true : false));
  movieData.isMustWatch = $(isMustWatch).text() === 'Must Watch' ? true : false;

  // .info:
  const info = $(block2).find('.info');
  const yearAndLangPTag = $(info).children().eq(0);
  // console.log('year:' + yearAndLangPTag.text().substr(0, 4));
  movieData.year = yearAndLangPTag.text().substr(0, 4);

  const lang = $(yearAndLangPTag).children().get(0);
  // console.log('lang:' + $(lang).text());
  movieData.lang = $(lang).text();

  const synopsis = $(block2).find('.synopsis');
  // console.log('description:' + $(synopsis).text());
  movieData.description = $(synopsis).text();

  const hd = $(block2).find('.hd');
  // console.log('Is hd:' + hd ? true : false);
  movieData.isHd = hd ? true : false;

  const cc = $(block2).find('.cc');
  // console.log('Has cc:' + cc ? true : false);
  movieData.hasCC = cc ? true : false;


  // .professionals:
  const allProfessionals = [];
  const professionals = $(block2).find('.professionals');
  const allDivs = professionals.children('div');
  $(allDivs).each(function (i, eachProfessional) {
    // // console.log('eachProfessional:' + $(eachProfessional).html());
    const professionalData = {};

    const imgwrap = $(eachProfessional).children().eq(0).children().eq(0);
    // console.log('professionalImage:' + imgwrap.attr('src'));
    professionalData.img = imgwrap.attr('src');

    const prof = $(eachProfessional).children().eq(1);
    // console.log('professionalName:' + prof.children().eq(0).text());
    // console.log('professionalRole:' + prof.children().eq(1).text());
    professionalData.name = prof.children().eq(0).text();
    professionalData.role = prof.children().eq(1).text();

    allProfessionals.push(professionalData)
  });


  // // console.log(allProfessionals);

  movieData.professionals = allProfessionals;


  // console.log('----');

}

function handleBlock3($, liEle, movieData) {

  const block3 = $(liEle).find('.block3');
  // // console.log($(block2).html());

  // .professionals:
  const ratings = [];
  const averageRating = $(block3).find('.average-rating');
  const allLis = averageRating.children();
  $(allLis).each(function (i, eachRating) {
    // // console.log('eachLi:' + $(eachRating).html());
    const ratingData = {};

    const key = $(eachRating).children().eq(0).text();
    const val = $(eachRating).children().eq(1).data('value');

    ratingData[key] = val;

    ratings.push(ratingData)
  });
  // console.log(ratings);

  movieData.ratings = ratings;


  //
  const extras = $(block3).find('.extras');

  // console.log('wiki:' + extras.children().eq(0).attr('href'));
  // console.log('trailer:' + extras.children().eq(1).attr('href'));

  movieData.wikiUrl = extras.children().eq(0).attr('href');
  movieData.trailerUrl = extras.children().eq(1).attr('href');
  // console.log('----');

}

function parseHTML(body, pageNo, resolve, reject) {

  // // console.log(body);

  const $ = cheerio.load(body);

  const ul = $('#UIMovieSummary > ul').get(0);
  const lis = $(ul).children();

  // const i = 0;
  // const liEle = $(ul).children().get(i)

  const allMoviesPerPage = [];

  $(lis).each(function (i, liEle) {
    // console.log('----------' + i);
    // console.log($(liEle).html());

    const movieData = {};

    handleBlock1($, liEle, movieData);
    handleBlock2($, liEle, movieData);
    handleBlock3($, liEle, movieData);

    // console.log(movieData);

    allMoviesPerPage.push(movieData)

  });

  console.log('pageNo:'+ pageNo + 'allMoviesPerPage.length'+ allMoviesPerPage.length);

  resolve(allMoviesPerPage);

}


// makeRequest();
// parseHTML(html);


const performAsyncOperation = function (pageNo) {

  return new Promise(function (resolve, reject) {
    makeRequest(pageNo, resolve, reject);
  });

};



async function getAllPages(lastPageNo, lang) {

  console.log('lastPageNo:'+ lastPageNo);
  console.log('lang:'+ lang);

  const allMoviesByPage ={};

  for (let i = 1; i<= lastPageNo; i++) {
    console.log('--------------------'+i);
    const promise = new Promise(function (resolve, reject) {
      makeRequestTor(i, resolve, reject, lang);
    });
    await promise;
    promise.then(function (data) {
      allMoviesByPage['page'+i] = data;
    });
    console.log('--------------------/'+i);
  }


  const allMoviesByPageStr =JSON.stringify(allMoviesByPage);
  // console.log(allMoviesByPageStr);
  fs.writeFile(lang + '.json', allMoviesByPageStr, 'utf8', function (err, data) {
    if (err) throw err;
    console.log('DONE');
  });

}


// getAllPages(2);
// getAllPages(123, 'telugu');

const args = process.argv.slice(2);

getAllPages(parseInt(args[1]), args[0]);

