require('dotenv').config();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USRNAME,
    pass: process.env.GMAIL_PWD
  }
});


function sendEmail(from, to, subject, body) {
  return new Promise(function (resolve, reject) {

    const mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      // html: body // plain text body
      text: body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        reject(err);
        // console.log(err);
      }

      else{
        // console.log(info);
        resolve(info);
      }

    });

  });
}


module.exports.sendEmail = sendEmail;


/*


// var body = '<h1>Hello Email Body!</h1>';
sendEmail('jaganttpus@gmail.com', 'jagadeeshthegeek@gmail.com', 'Upload DONE', JSON.stringify(body))
  .then(function (info) {
    console.log('EMAIL: DONE');
  })
  .catch(function (err) {
    console.log('EMAIL: ERR');
  });
*/
