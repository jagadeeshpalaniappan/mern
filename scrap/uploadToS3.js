var streamingS3 = require('streaming-s3'),
  request = require('request');


function getBytesAndUploadToS3(srcUrl, keyName) {

  return new Promise(function (resolve, reject) {

    var rStream = request.get(srcUrl);

    var uploader = new streamingS3(
      rStream,
      {
        accessKeyId: 'AKIAJJJXGEXS35B7AE2A',
        secretAccessKey: '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'
      },
      {
        Bucket: 'indiantv',
        Key: keyName
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
      process.stdout.write("..");
    });

    uploader.on('part', function (number) {
      // console.log('Part ', number, ' uploaded.');
      process.stdout.write("##");
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

  });


}

module.exports.getBytesAndUploadToS3 = getBytesAndUploadToS3;

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
