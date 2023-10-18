import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';
import axios from 'axios';
import RegistrarIngresso from './RegistrarIngresso';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

// ... (rest of your styled components)

const EscanearIngresso = () => {
  const [resultadoScan, setResultadoScan] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [lido, setLido] = useState(false);

  // Adicione um estado para controlar a leitura do ingresso
  const [leituraAtiva, setLeituraAtiva] = useState(true);

  const handleError = (error) => {
    console.error('Erro ao escanear o QR Code:', error);
  };

  const fecharPopup = () => {
    setResultadoScan(null);
    setPopupVisible(false);
  };

  const verificarIngresso = async (result) => {
    if (leituraAtiva) {
      try {
        // Resto do seu código de verificação do ingresso

        if (response.data.ingressoValido) {
          setResultadoScan('Ingresso Válido');
          setPopupVisible(true);
          setLido(true);

          // Pausar a leitura após a validação do ingresso
          setLeituraAtiva(false);
        } else {
          // Resto do seu código de tratamento para ingresso inválido
        }
      } catch (error) {
        console.error('Erro ao verificar o ingresso:', error);
      }
    }
  };

  // Adicione um manipulador de evento para reiniciar a leitura
  const reiniciarLeitura = () => {
    setLeituraAtiva(true);
    setResultadoScan(null);
    setPopupVisible(false);
  };

  return (
    <Container>
      <Title>Escanear Ingresso</Title>
      <ScannerContainer>
        <QRScanner
          onError={handleError}
          constraints={{
            video: { facingMode: 'environment' },
          }}
          onScan={(result) => {
            if (result) {
              verificarIngresso(result);
            }
          }}
        />
        {resultadoScan && (
          <Popup onClick={fecharPopup}>
            {resultadoScan}
            {resultadoScan === 'Ingresso Válido' && (
              <button onClick={reiniciarLeitura}>LER NOVAMENTE</button>
            )}
          </Popup>
        )}
      </ScannerContainer>
    </Container>
  );
};

export default EscanearIngresso;
