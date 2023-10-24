// emailModule.js
const nodemailer = require('nodemailer');
const path = require('path');

const CreateMailTransporter = () =>{
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:465,
  auth: {
    user: "texticketsexchange@gmail.com",
    pass: "oaio wtpw fglm xssn"
  }
});
  return transporter;
}
async function main(to, pdfFileName, pdfFilePath, pdfDataUri) {
  const transporter = CreateMailTransporter();
  
  const info = await transporter.sendMail({
    from: "texticketsexchange@gmail.com", // sender address
    to: to, // list of receivers
    subject: 'Ingressos Parmejó 2023', // Subject line
    text: 'Olá, tudo bem? Seu Ingresso para o PARMEJÓ2023 já está disponível!', // plain text body
    attachments: [
      {
        filename: pdfFileName,
          content: pdfBuffer, 
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  main
};
