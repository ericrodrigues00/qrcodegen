// models/Ingresso.js
const mongoose = require('mongoose');

const ingressoSchema = new mongoose.Schema({
  nome: String,
  contato: String,
  numero: Number,
  tipoIngresso: String,
  lido: Boolean
});

module.exports = mongoose.model('Ingresso', ingressoSchema);
