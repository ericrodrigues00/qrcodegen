// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegistrarIngresso from './components/RegistrarIngresso';
import VisualizarIngressos from './components/VisualizarIngressos'; // Importe o componente
import EscanearIngresso from './components/EscanearIngresso';
import ConfirmarIngresso from './components/ConfirmarIngresso';
import ValidarManual from './components/ValidarManual.js';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/registrar" element={<RegistrarIngresso />}></Route>
      <Route path="/visualizar" element={<VisualizarIngressos />}></Route>
      <Route path="/escanear" element={<EscanearIngresso />}></Route>
      <Route path="/confirmação" element={<ConfirmarIngresso />}></Route>
      <Route path="/validar" element={<ValidarManual />}></Route>
      </Routes>

    </Router>
  );
}

export default App;