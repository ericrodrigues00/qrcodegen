import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';
import axios from 'axios'; // Importe o axios para fazer a solicitação à sua API.
import RegistrarIngresso from './RegistrarIngresso';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @media (max-width: 768px) {
    align-items: center; 
    height: 100%;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin: 20px 20px 60px 60px;
  @media (max-width: 768px) {
    align-items: center; 
    margin: 0px;
  }
`;

const Title = styled.h1`
font-size: 46px;
font-family: "Outfit";
font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  width: 50%;
  margin: 0 auto;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);

  `;

const QRScanner = styled(QrScanner)`
  width: 50%;
`;

const Popup = styled.div`
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: ${(props) => (props.visible ? 'block' : 'none')};
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
        //const apiUrl = `http://localhost:3002/api/verificarIngresso?numero=${numero}`;
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
      <TitleContainer>
      <Title>
        <StyledLink to="/">PARMEJÓ 2023</StyledLink>
      </Title>
      </TitleContainer>
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
