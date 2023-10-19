import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';
import axios from 'axios';
import { FaCheck, FaSadCry, FaKissBeam } from 'react-icons/fa';

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
  background-color: white;
  color: #000;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const PopupContent = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 50px 90px 40px 90px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;

const IconType = ({ message }) => {
  if (message === 'Ingresso Válido!') {
    return (
      <Icon>
        <FaKissBeam size={64} color="#6a1b9a" />
      </Icon>
    );
  } else {
    return (
      <Icon>
        <FaSadCry size={64} color="red" />
      </Icon>
    );
  }
};

const EscanearIngresso = () => {
  const [resultadoScan, setResultadoScan] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [lido, setLido] = useState(false);
  const [codigoAnterior, setCodigoAnterior] = useState(null);
  const [bloquearLeitura, setBloquearLeitura] = useState(false);

  useEffect(() => {
    if (bloquearLeitura) {
      const timer = setTimeout(() => {
        setBloquearLeitura(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [bloquearLeitura]);

  const handleError = (error) => {
    console.error('Erro ao escanear o QR Code:', error);
  };

  const fecharPopup = () => {
    setResultadoScan(null);
    setPopupVisible(false);
  };

  const verificarIngresso = async (result) => {
    if (bloquearLeitura) {
      return;
    }

    if (result.text === codigoAnterior) {
      setBloquearLeitura(true);
      return;
    }

    setBloquearLeitura(false);
    setCodigoAnterior(result.text);

    try {
      const qrCodeData = result.text;
      const numeroMatch = qrCodeData.match(/Numero: (\d+)/);
      if (numeroMatch) {
        const numero = numeroMatch[1];
        const apiUrl = `https://api-eztickets.onrender.com/api/verificarIngresso?numero=${numero}`;
        const response = await axios.get(apiUrl);
        if (response.data.ingressoValido) {
          setResultadoScan('Ingresso Válido!');
          setPopupVisible(true);
          setLido(true);
        } else {
          if (response.data.message === "Ingresso já foi utilizado"){
            setResultadoScan("Ingresso já foi utilizado!")
          }
          else {
            setResultadoScan('Ingresso Inválido!');
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
        {resultadoScan && (
          <div>
            <PopupOverlay visible={popupVisible} onClick={fecharPopup} />
            <Popup onClick={fecharPopup}>
              <IconType message={resultadoScan} />
              <PopupContent>{resultadoScan}</PopupContent>
            </Popup>
          </div>
        )}
      </ScannerContainer>
    </Container>
  );
};

export default EscanearIngresso;