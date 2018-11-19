var tr = require('tor-request');
var streamingS3 = require('streaming-s3');
var request = require('request');

tr.TorControlPort.password = 'hellopassword';

function uploadToS3(rStream, srcUrl, keyName, resolve, reject) {

  var uploader = new streamingS3(
    rStream,
    {
      accessKeyId: 'AKIAJJJXGEXS35B7AE2A',
      secretAccessKey: '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'
    },
    {
      Bucket: 'indiantv',
      Key: keyName,
      ACL:'public-read'
    },
    {
      concurrentParts: 20,
      waitTime: 10000,
      retries: 1,
      maxPartSize: 100 * 1024 * 1024
    }
  );

  uploader.on('data', function (bytesRead) {
    // console.log(bytesRead, ' bytes read.');
    // process.stdout.write(".");
  });

  uploader.on('part', function (number) {
    // console.log('Part ', number, ' uploaded.');
    // process.stdout.write("##");
  });

  // All parts uploaded, but upload not yet acknowledged.
  uploader.on('uploaded', function (stats) {
    // console.log('Upload stats: ', stats);
  });

  uploader.on('finished', function (resp, stats) {
    // console.log('Upload finished: ', resp);
    resolve({ srcUrl: srcUrl, keyName: keyName, resp: resp, isSucess: true});
  });

  uploader.on('error', function (e) {
    // console.log('Upload error: ', e);
    reject({ srcUrl: srcUrl, keyName: keyName, err: e, isSucess: false});
  });

  uploader.begin(); // important if callback not provided.

}

function getBytesAndUploadToS3(srcUrl, keyName) {

  return new Promise(function (resolve, reject) {

    // var rStream = request.get(srcUrl);

    var options = {
      "url": srcUrl,
      "method": "GET",
    };

    var rStream1 = tr.request(options, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        // resolve(body);
        console.log('MP4-CONNECT:DONE');
      } else {
        // resolve(err);
        console.log('MP4-CONNECT:ERR');
        // console.log(err);
      }
    });

    uploadToS3(rStream1, srcUrl, keyName, resolve, reject);


  });


}

module.exports.getBytesAndUploadToS3 = getBytesAndUploadToS3;



// To Test:

/*

var p1 = getBytesAndUploadToS3('https://www.google.com', 'g1');

p1.then(function (resp) {
  console.log("UPLOAD: DONE");
  console.log(resp);
}).catch(function (resp) {
  console.log("UPLOAD: ERROR");
  console.log(resp);
});
*/

