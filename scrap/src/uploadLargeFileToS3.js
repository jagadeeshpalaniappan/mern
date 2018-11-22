// var tr = require('tor-request');
var request = require('request');


var AWS      = require('aws-sdk');
s3Stream = require('s3-upload-stream')(new AWS.S3());

// Set the client to be used for the upload.
// AWS.config.loadFromPath('./config.json');
AWS.config.update({accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey});

// tr.TorControlPort.password = 'hellopassword';
// var tr = { request: request };



function uploadToS3(rStream, srcUrl, keyName, resolve, reject) {

// Create the streams
// var read = fs.createReadStream('/path/to/a/file');


  var upload = s3Stream.upload({
    "Bucket": process.env.S3BUCKET,
    "Key": keyName,
    "ACL":"public-read"
  });

// Optional configuration
  upload.maxPartSize(50971520); // 50 MB
  upload.concurrentParts(5);

// Handle errors.
  upload.on('error', function (error) {
    console.log(error);
    reject({ srcUrl: srcUrl, keyName: keyName, err: error, isSucess: false});
  });

  /* Handle progress. Example details object:
     { ETag: '"f9ef956c83756a80ad62f54ae5e7d34b"',
       PartNumber: 5,
       receivedSize: 29671068,
       uploadedSize: 29671068 }
  */
  upload.on('part', function (details) {
    // console.log(details);
    // process.stdout.write(".");
  });

  /* Handle upload completion. Example details object:
     { Location: 'https://bucketName.s3.amazonaws.com/filename.ext',
       Bucket: 'bucketName',
       Key: 'filename.ext',
       ETag: '"bf2acbedf84207d696c8da7dbb205b9f-5"' }
  */
  upload.on('uploaded', function (resp) {
    // console.log(resp);
    resolve({ srcUrl: srcUrl, keyName: keyName, resp: resp, isSucess: true});
  });


  // Pipe the incoming filestream through compression, and up to S3.
  rStream.pipe(upload);


}

function getBytesAndUploadToS3(srcUrl, keyName) {

  return new Promise(function (resolve, reject) {

    // var rStream = request.get(srcUrl);

    var options = {
      "url": srcUrl,
      "method": "GET",
    };

    var rStream1 = request(options);
    uploadToS3(rStream1, srcUrl, keyName, resolve, reject);


  });


}

module.exports.getBytesAndUploadToS3 = getBytesAndUploadToS3;



// To Test:
/*


var p1 = getBytesAndUploadToS3('https://www.google.com', 'g11.html');

p1.then(function (resp) {
  console.log("UPLOAD: DONE");
  console.log(resp);
}).catch(function (resp) {
  console.log("UPLOAD: ERROR");
  console.log(resp);
});


*/

