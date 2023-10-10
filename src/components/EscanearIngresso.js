import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';

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
  const [valoresLidos, setValoresLidos] = useState([]);

  const handleError = (error) => {
    console.error('Erro ao escanear o QR Code:', error);
  };

  const fecharPopup = () => {
    setValoresLidos([]);
  };

  return (
    <Container>
      <Title>Escanear Ingresso</Title>
      <ScannerContainer>
        <QRScanner
          onError={handleError}
          constraints={{
            video: { facingMode: "environment" }
          }}
          onScan={(result) => {
            if (result) {
              // Adiciona o valor lido ao estado
              setValoresLidos([...valoresLidos, result]);
            }
          }}
        />
        {valoresLidos.length > 0 && (
          <Popup onClick={fecharPopup}>
            <strong>Valores Lidos:</strong>
            <ul>
              {valoresLidos.map((valor, index) => (
                <li key={index}>{valor}</li>
              ))}
            </ul>
          </Popup>
        )}
      </ScannerContainer>
    </Container>
  );
};

export default EscanearIngresso;
