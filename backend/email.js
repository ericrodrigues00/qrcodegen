// emailModule.js
const nodemailer = require('nodemailer');
const path = require('path');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "texticketsexchange@gmail.com",
    pass: "oaio wtpw fglm xssn"
  }
});

function sendEmailWithAttachment(
    from,
    to,
    subject,
    text,
    pdfFileName,
    pdfFilePath,
    callback
) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    attachments: [
      {
        filename: pdfFileName,
        path: pdfFilePath,
        contentType: 'application/pdf'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ' + error);
      callback(error, null);
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, info);
    }
  });
}

module.exports = {
  sendEmailWithAttachment
};
