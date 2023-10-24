// emailModule.js
const nodemailer = require('nodemailer');
const path = require('path');

var html_body = 'Seu convite chegou! Esse é seu acesso para nosso ParmeJó:<br>Basta nos mostrar esse QrCode na entrada do evento e aproveitar seu domingo com a melhor parmegiana! 😋<br>Caso sua opção seja retirada para a viagem, deverá ser feita durante o evento, no horário das 11:00 às 15:00.<br><b>Endereço:</b> Rua Dr. Amadeu Sachi, 400<br>Para mais informações nos sigam nas redes sociais 👇<br><b>Instagram:</b> <a href="http://bit.ly/B22_LotusdeJundiai">@bethellotusdejundiai</a>'
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
async function main(to, pdfFileName, pdfFilePath) {
  const transporter = CreateMailTransporter();
  
  const info = await transporter.sendMail({
    from: "texticketsexchange@gmail.com", // sender address
    to: to, // list of receivers
    subject: 'Ingressos ParmeJó 2023', // Subject line
    html: html_body, // plain text body
    attachments: [
      {
        filename: pdfFileName,
        content: pdfFilePath,
        encoding: 'base64',
      },
    ],
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  main
};
