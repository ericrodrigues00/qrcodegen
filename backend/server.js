const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Ingresso = require('./models/Ingresso'); // Importe o modelo de Ingresso
const db = require('./config/db'); // Importe a configuração do MongoDB
const fs = require("fs");
const {spawn} = require("child_process");
const { request } = require('http');
const app = express();
const emailModule = require('./email'); // Replace with the actual path to email.js
const path = require('path');


app.use(bodyParser.json());
app.use(cors()); // Habilita o CORS

app.post('/api/sendQR', async (req, res) => {
  try {
    const { nome, contato, numero, pdf } = req.body;
    const pdfFileName = `${nome} - ${numero}.pdf`;
    const pdfFilePath = Buffer.from(pdf.split("base64,")[1], "base64");
    await emailModule.main(contato, pdfFileName, pdfFilePath);
    res.send('Deu certo!');

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});


// Rota para verificar a validade do ingresso
app.get('/api/verificarIngresso', async (req, res) => {
  try {
    const numero = req.query.numero;

    const ingresso = await Ingresso.findOne({ numero });

    if (ingresso) {
      if (ingresso.lido) {
        res.status(200).json({ingressoValido: false, message:"Ingresso já foi utilizado"})
      } else {
      ingresso.lido = true;
      await ingresso.save();
      res.json({ ingressoValido: true });
      }
    }
    else {
      res.status(200).json({ ingressoValido: false, message: "Ingresso não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao verificar o ingresso:', error);
    res.status(500).json({ error: 'Erro ao verificar o ingresso' });
  }
});


// Rota para registrar ingressos
app.post('/api/ingressos', async (req, res) => {
  try {
    const { nome, contato, lido, tipoIngresso} = req.body;

    const numeroAleatorio = Math.floor(Math.random() * 1000000)
    const novoIngresso = new Ingresso({ nome, contato, numero: numeroAleatorio, lido,  tipoIngresso});
    

    // Salve o ingresso no banco de dados
    await novoIngresso.save();

    res.status(201).json(novoIngresso);
  } catch (error) {
    console.error('Erro ao registrar ingresso:', error);
    res.status(500).json({ error: 'Erro ao registrar ingresso' });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});


app.get('/api/ingressos', async (req, res) => {
    try {
      const ingressos = await Ingresso.find(); // Recupere todos os ingressos do banco de dados
      res.status(200).json(ingressos);
    } catch (error) {
      console.error('Erro ao buscar ingressos:', error);
      res.status(500).json({ error: 'Erro ao buscar ingressos' });
    }
  });