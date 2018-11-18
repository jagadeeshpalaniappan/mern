var tr = require('tor-request');
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
var zlib = require('zlib');
var fs = require('fs');
var querystring = require('querystring');


tr.TorControlPort.password = 'hellopassword';

function getHtmlContent(url, cookieJar) {

  return new Promise(function (resolve, reject) {

    var options = {
      "url": url,
      "gzip": true,
      "method": "GET",
      jar: cookieJar
    };

    tr.newTorSession((err) => {

      // console.log(err);

      tr.request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          resolve(body);
        } else {
          resolve(err);
        }
      });

    });

  });

  // return rp(options);
}

function parseHTML(body) {

  // // console.log(body);

  const $ = cheerio.load(body);


  // page_id = page.find('html')['data-pageid']
  const html = $("html[data-pageid]");
  const page_id = html.data('pageid');
  // console.log("page_id: " + page_id);

  const UIVideoPlayer = $("#UIVideoPlayer");
  const ejpingables = UIVideoPlayer.data('ejpingables');
  // console.log("ejpingables: " + ejpingables);


  return { csrfToken: page_id, ejpingables: ejpingables };
}


function getEncodedUrl(csrfToken, ejpingables, movie_page_url, cookieJar) {

  const movie_meta_url = movie_page_url.replace('movie', 'ajax/movie');
  // console.log("movie_meta_url: " + movie_meta_url);

  const payload = {
    'xEvent': 'UIVideoPlayer.PingOutcome',
    'xJson': '{\"EJOutcomes\":\"' + ejpingables + '\",\"NativeHLS\":false}',
    'gorilla.csrf.Token': csrfToken
  };

  // encoded_url = session.post(movie_meta_url, data=payload).json()['Data']['EJLinks'];
  var formData = querystring.stringify(payload);
  var contentLength = formData.length;

  // console.log("formData: " + formData);


  // const headers = res.headers;
  const headers = {};
  headers['Content-Length'] = contentLength;
  headers['Content-Type'] = 'application/x-www-form-urlencoded';

  // console.log(headers);


  const options = {
    headers: headers,
    url: movie_meta_url,
    body: formData,
    method: 'POST',
    json: true,
    jar: cookieJar
  };

  // return rp(options);

  return new Promise(function (resolve, reject) {
    tr.request(options, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        resolve(body);
      } else {
        resolve(err);
      }
    });
  });

}


const jsoncrypto = function () {
  var e = function (e) {
    for (var t = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < e; n++)
      t += i.charAt(Math.floor(Math.random() * i.length));
    return t
  };
  this.decrypt = function (e) {
    var t = 10
      , i = e.slice(0, t) + e.slice(e.length - 1) + e.slice(t + 2, e.length - 1)
      // , n = window.atob(i);
      , n = Buffer.from(i, 'base64').toString();
    return JSON.parse(n)
  },
  this.encrypt = function (t) {
    var i = 10
      , n = JSON.stringify(t)
      // , o = window.btoa(n);
      , o = Buffer.from(n).toString('base64');
    return o.slice(0, i) + e(2) + o.slice(i + 1) + o.slice(i, i + 1)
  }
};


function decodeUrl(encodedJson) {
  return new jsoncrypto().decrypt(encodedJson);
}


function getPageVideoUrl(url) {

  return new Promise(function (resolve, reject) {

    var cookieJar = request.jar();

    getHtmlContent(url, cookieJar)
      .then(function (body) {

        console.log("GET: success");
        // // console.log(html);

        const parsedConfig = parseHTML(body);

        getEncodedUrl(parsedConfig.csrfToken, parsedConfig.ejpingables, url, cookieJar)
          .then(function (body) {

            // console.log("POST: success");
            // console.log(body);

            const encodedUrl = body['Data']['EJLinks'];
            if (encodedUrl) {

              // console.log("got: encodedUrl");

              const decodedUrlConfig = decodeUrl(encodedUrl);
              // console.log(decodedUrlConfig);
              resolve(decodedUrlConfig);
            } else {
              reject(body);
            }

          })
          .catch(function (err) {
            // console.log("POST: err", err);
            reject(err);
          });

      })
      .catch(function (err) {
        // console.log("GET: err", err);
        reject(err);
      });


  });

}

module.exports.getPageVideoUrl = getPageVideoUrl;
