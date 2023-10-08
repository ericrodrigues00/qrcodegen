import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import api from '../api';
import { Link } from 'react-router-dom';

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const InputLabel = styled.label`
  font-weight: bold;
  color: #6a1b9a;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #512da8;
  }
`;

const QRCodeContainer = styled.div`
  margin-top: 20px;
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

const RegistrarIngresso = () => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [ingressos, setIngressos] = useState([]);
  const [qrCodeData, setQRCodeData] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const gerarQRCode = async () => {
    if (nome && contato) {
      const novoIngresso = {
        nome,
        contato,
      };

      try {
        // Faça a solicitação POST para o backend para registrar o ingresso
        const response = await api.post('/api/ingressos', novoIngresso);


        // Atualize o estado com os dados retornados pelo backend
        setIngressos([...ingressos, response.data]);
        setQRCodeData(JSON.stringify(response.data));
        setNome('');
        setContato('');
      } catch (error) {
        console.error('Erro ao registrar ingresso:', error);
      }
    }
  };

  const salvarQRCode = () => {
    if (qrCodeData) {
      // Gere um nome de arquivo exclusivo com base no número do ingresso
      const fileName = `Ingresso`;
  
      // Crie um elemento de âncora temporário para fazer o download
      const canvas = document.querySelector("canvas");
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = fileName;
      downloadLink.click();
  
      // Exiba o popup de confirmação
      setPopupVisible(true);
  
      // Remova o QR Code da tela
      setQRCodeData('');
  
      // Aguarde 2 segundos e, em seguida, oculte o popup
      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    }
  };

  return (
    <Container>
      <Title>Registrar Ingresso</Title>
      <FormContainer>
        <InputLabel>Nome:</InputLabel>
        <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <InputLabel>Contato:</InputLabel>
        <Input type="text" value={contato} onChange={(e) => setContato(e.target.value)} />
        <Button onClick={gerarQRCode}>GERAR QR CODE</Button>
        {qrCodeData && (
          <QRCodeContainer>
            <QRCode value={qrCodeData} />
          </QRCodeContainer>
        )}
        <Button onClick={salvarQRCode}>SALVAR QRCODE</Button>
        <Link to="/">
          <Button>Voltar para a Home</Button>
        </Link>
        {popupVisible && <Popup>QRCODE SALVO COM SUCESSO</Popup>}
      </FormContainer>
      <h2>Ingressos Registrados:</h2>
      <ul>
        {ingressos.map((ingresso, index) => (
          <li key={index}>
            <strong>Nome:</strong> {ingresso.nome}, <strong>Contato:</strong> {ingresso.contato},{' '}
            
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default RegistrarIngresso;
