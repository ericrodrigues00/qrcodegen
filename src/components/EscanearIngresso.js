import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import api from '../api';

const EscanearIngresso = () => {
  const [resultadoScan, setResultadoScan] = useState(null);
  const [ingressoValido, setIngressoValido] = useState(null);

  useEffect(() => {
    if (resultadoScan) {
      api
        .post('/api/verificar-ingresso', { qrCode: resultadoScan })
        .then((response) => {
          if (response.data.ingressoValido) {
            marcarIngressoComoUtilizado(response.data.numeroIngresso);
            setIngressoValido(true);
          } else {
            setIngressoValido(false);
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar o ingresso:', error);
          setIngressoValido(false);
        });
    }
  }, [resultadoScan]);

  const marcarIngressoComoUtilizado = (numeroIngresso) => {
    api
      .put(`/api/marcar-utilizado/${numeroIngresso}`)
      .then(() => {
        console.log('Ingresso marcado como utilizado com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao marcar o ingresso como utilizado:', error);
      });
  };

  return (
    <div>
      <h1>Escanear Ingresso</h1>
      <QrReader
        delay={300}
        onError={(error) => console.error('Erro ao escanear:', error)}
        onScan={(result) => setResultadoScan(result)}
        facingMode="environment"
      />
      {ingressoValido === true && <div>INGRESSO VÁLIDO</div>}
      {ingressoValido === false && <div>INGRESSO INVÁLIDO</div>}
    </div>
  );
};

export default EscanearIngresso;
