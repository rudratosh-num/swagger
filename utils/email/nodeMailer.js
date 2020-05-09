const nodemailer = require('nodemailer');

const auth = {
  user: 'skshorya@gmail.com',
  pass: '9630523965'
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth
});

// var mailOptions = {
//   to: 'kaushikprateek11@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: '<h1>Welcome</h1><p>That was easy!</p>'
// };

const sendMail = (mailOptions)=>{
  transporter.sendMail({
    ...mailOptions,
    from: auth.user,
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail
