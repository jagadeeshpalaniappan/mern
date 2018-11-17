var request = require('request');
var cheerio = require('cheerio');

request('http://www.google.com/', function(err, resp, html) {
  if (!err){
    const $ = cheerio.load(html);
    console.log(html);
  }
});
