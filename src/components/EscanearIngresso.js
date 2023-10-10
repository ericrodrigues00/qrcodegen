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

const ValorLido = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

const EscanearIngresso = () => {
  const [valorLido, setValorLido] = useState(null);

  const handleError = (error) => {
    console.error('Erro ao escanear o QR Code:', error);
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
              // Define o valor lido no estado
              setValorLido(result);
            }
          }}
        />
        {valorLido && (
          <ValorLido>
            Valor Lido: <strong>{valorLido}</strong>
          </ValorLido>
        )}
      </ScannerContainer>
    </Container>
  );
};

export default EscanearIngresso;
