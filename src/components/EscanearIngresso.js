import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';
import axios from 'axios'; // Importe o axios para fazer a solicitação à sua API.
import RegistrarIngresso from './RegistrarIngresso';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #6a1b9a;
  margin-bottom: 20px;
`;

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const QRScanner = styled(QrScanner)`
  max-width: 100%;
`;

const Popup = styled.div`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
`;

const EscanearIngresso = () => {
  const [resultadoScan, setResultadoScan] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [redirect, setRedirect] = useState(null); 
  const [lido, setLido] = useState(false);

  const handleError = (error) => {
    console.error('Erro ao escanear o QR Code:', error);
  };

  const fecharPopup = () => {
    setResultadoScan(null);
    setPopupVisible(false);
  };

  const verificarIngresso = async (result) => {
    try {
      const qrCodeData = result.text;
      console.log('URL lida pela câmera:', qrCodeData);
      const numeroMatch = qrCodeData.match(/Numero: (\d+)/);
      if (numeroMatch) {
        const numero = numeroMatch[1];
        const apiUrl = `https://api-eztickets.onrender.com/api/verificarIngresso?numero=${numero}`;
        console.log('URL da API:', apiUrl); // Adicione esta linha para imprimir a URL no console
        const response = await axios.get(apiUrl);
        if (response.data.ingressoValido) {
          setResultadoScan('Ingresso Válido');
          setPopupVisible(true);
          setLido(true);
        } else {
          if (response.data.message === "Ingresso já foi utilizado"){
            setResultadoScan("Ingresso já foi utilizado")
          }
          else {
          setResultadoScan('Ingresso Inválido');
          }
          setPopupVisible(true);
      }
      } else {
        console.error('Número não encontrado no código QR');
      }
    } catch (error) {
      console.error('Erro ao verificar o ingresso:', error);
    }
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
        {resultadoScan && <Popup onClick={fecharPopup}>{resultadoScan}</Popup>}
      </ScannerContainer>
    </Container>
  );
};

export default EscanearIngresso;
