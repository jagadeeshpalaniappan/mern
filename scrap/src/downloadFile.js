var request = require('request');
var tr = require('tor-request');
tr.TorControlPort.password = 'hellopassword';

// torrc
// ControlPort 9051
// HashedControlPassword 16:96598ADABFEBE9A7604A6F916260695A4D954993DF02A0DE3E910D7288

var fs = require('fs');

function download(srcUrl, destLoc, fileName) {

  return new Promise(function (resolve, reject) {

    fs.mkdir(destLoc, {recursive: true}, (err) => {
      if (err) {
        reject('mkdir:failed');
      } else {

        var file = fs.createWriteStream(destLoc + fileName);
        file.on('finish', function () {
          file.close();
          console.log('FILE-WRITE: DONE');
          resolve();
        });
        file.on('error', function (err) {
          console.log(err);
          file.end();
          reject();
        });


        var options = {
          "url": srcUrl,
          "method": "GET",
        };

        var rStream1 = tr.request(options, function (err, res, body) {
          if (err) {
            // resolve(err);
            // console.log('TREQST:ERR');
          } else {
            // resolve();
            // console.log('TREQST:DONE');
          }
        });
        rStream1.pipe(file);


      }

    });

  });

}

module.exports.download = download;


/*


var srcUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png';
download(srcUrl, '../../../download/tamil')
  .then(function () {
    console.log('DOWNLOAD: DONE');
  });


*/

