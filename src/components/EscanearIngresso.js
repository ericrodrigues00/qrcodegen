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
  @media (max-width: 768px) {
    font-size: 30px;
  }
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
  border-radius: 5px;
  width: 60%;
  margin: 0 auto;
  padding: 0px 0px 0px 0px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const QRScanner = styled(QrScanner)`
  width: 85%;
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
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centralize horizontalmente */
  gap: 40px;
  margin-top: 20px;
  margin-bottom: 30px;
  
  
  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 20px;
  }
`;
const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 15px 40px 10px 40px;
  font-size: 20px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  font-family: "Outfit";
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  height:50px;
  width:350px;
  /*&:hover {
    background-color: #a391d6;
  }*/

  &:after {
    content: "";
    height: 4px;
    background-color: #6a1b9a;
    width: 10%; 
    position: absolute;
    top: 0; 
    left: 0; 
    border-radius: 5px;
    transition: width 0.5s ease;
  }

  &:hover:after {
    width: 100%;
  }

  @media (max-width: 768px) { 
    font-size: 16px; 
    &:last-child {
      margin-bottom: 20px;
    }
  }
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
          <StyledLink to="/">ESCANEAR INGRESSO</StyledLink>
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
      <ButtonContainer>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Button>VOLTAR PARA A HOME</Button>
          </Link>
          <Link to="/validar" style={{ textDecoration: 'none' }}>
            <Button>VALIDAR MANUALMENTE</Button>
          </Link>
        </ButtonContainer>
    </Container>
  );
};

export default EscanearIngresso;