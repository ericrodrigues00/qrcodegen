import React, { useState } from "react";
import styled from "styled-components";
import api from "../api";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";
// conteiner roxo

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
  align-items: flex-start; /* Alinhar o texto à esquerda */
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
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

//conteiner branco com as infos
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: "Outfit";
  padding: 0px 30px;
  max-width: 1000px;
  width: 100%;
  height: 50%;
  margin: 0 auto;
  justify-content:center;
  
  @media (max-width: 768px) {
    align-items: center; 
    padding: 20px 30px;
    gap: 25px;
    width: auto;
  }
`;

const InputLabel = styled.label`
  color: #6a1b9a;
  font-family: "Outfit";
  text-transform: uppercase;
  font-size: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 0;
  border-radius: 0px;
  border-bottom: 1px solid #666;
  width: 60%;
  font-size: 20px;
  font-family: "Outfit";
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
  }
  
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centralize horizontalmente */
  gap: 30px;
  margin-top: 20px;
  
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
  width:300px;
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
    height:50px;
    width:250px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
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
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [numero, setNumero] = useState("");
  const [lido, setLido] = useState(false);
  const [ingressos, setIngressos] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const valid = validateEmail(email);

    setContato(email);
    setIsValid(valid);
  };

  // ...

  const gerarPDF = async () => {
    if (nome && contato && isValid) { // Certifique-se de que o número está definido
      const novoIngresso = {
        nome,
        contato,
        numero, // Use o número extraído do código QR
        lido
      };

      try {
        // Faça a solicitação POST para o backend para registrar o ingresso
        const response = await api.post("/api/ingressos", novoIngresso);
       
        const numero = response.data.numero;

        const fileName = `${nome} - ${numero}.pdf`;

        const doc = new jsPDF();

        // Configurações para centralizar conteúdo
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const contentWidth = 200; // Largura do conteúdo central
        const contentX = (pageWidth - contentWidth) / 2;

        // Defina estilos de fonte, cor de fundo e tamanho de fonte
        doc.setFont("helvetica", "bold");
        doc.setFontSize(36); // Tamanho da fonte aumentado para 18
        doc.setTextColor(0, 0, 0);
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, "F");
        const textX = pageWidth / 2; // Centraliza horizontalmente
        doc.text("PARMEJÓ 2023", textX, 30, null, null, "center");
        doc.setFontSize(26); 
        doc.setFont("helvetica", "normal");
        doc.text(
          `ID: ${response.data.numero}`,
          textX,
          50,
          null,
          null,
          "center"
        );
        const qrCodeSize = 75;
        const qrCodeConfiguration = {
          margin: 0,
          width: qrCodeSize,
          height: qrCodeSize,
        };
        // Calcula a posição central para o QR Code
        const qrCodeX = contentX + (contentWidth - qrCodeSize) / 2;
        const qrCodeY = 70; // Define a posição vertical
        
        const purpleSquareSize = 90; // Adjust the size as needed
        const purpleSquareX = (pageWidth - purpleSquareSize) / 2; // Centered horizontally
        const purpleSquareY = qrCodeY - 7.5; // Position below the QR Code
        
        // Draw the purple square
        doc.setFillColor(106, 27, 154); // Use purple color
        doc.rect(purpleSquareX, purpleSquareY, purpleSquareSize, purpleSquareSize, "F"); // "F" means fill
        
        // Gere o QR Code diretamente no PDF
        const qrCodeData = `Nome: ${response.data.nome}, Contato: ${response.data.contato}, Numero: ${response.data.numero}`;

        const canvas = document.createElement("canvas");

        QRCode.toCanvas(canvas, qrCodeData, qrCodeConfiguration);
        const imgData = canvas.toDataURL("image/png");


        // Exibir nome e contato no centro
        
        const textY = qrCodeY + qrCodeSize + 25;
        doc.setFontSize(22);
        doc.text(`Nome: ${response.data.nome}`, textX, textY, null, null, "center");
        doc.text(
          `Email: ${response.data.contato}`,
          textX,
          textY + 15,
          null,
          null,
          "center"
        );

        doc.setFontSize(16);
        doc.text("Bethel 22 Lótus Jundiaí", textX , textY+ 110, null, null, "center");
        
        // Defina a posição e o tamanho do QR Code
        doc.addImage(imgData, "PNG", qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

        
        // Salve o PDF
        //doc.save(fileName);
        //PARTE NOVA
        
        const pdfDataUri = doc.output('datauristring');
        //const pdfFilePath = Buffer.from(pdfDataUri, 'base64').toString();
        
        //console.log(pdfFilePath);
        const NEWQRCode = {
          nome: nome,
          contato: contato,
          numero: numero,
          pdf: pdfDataUri
        };
        
        // Exiba o popup de confirmação
        setPopupVisible(true);
        
        // Use axios.post without the "params" property to send data in the request body
        await api.post("/api/sendQR", NEWQRCode);
        //FIM DA PARTE NOVA
        // Limpe os campos de nome e contato
        setNome("");
        setContato("");
        setNumero("");
        // Aguarde 2 segundos e, em seguida, oculte o popup
        setTimeout(() => {
          setPopupVisible(false);
        }, 2000);
      } catch (error) {
        console.error("Erro ao registrar ingresso:", error);
      }
    }else {
      alert("Uma das informações não está correta.");
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Registrar Ingresso</Title>
      </TitleContainer>
      <FormContainer>
        <InputLabel>Nome</InputLabel>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <InputLabel>Email</InputLabel>
        <Input
          type="text"
          class="botãonome"
          value={contato}
          placeholder="email@email.com"
          onChange={handleEmailChange}
        />
        {isValid ? (
        <p style={{ color: 'green' }}>Email Valido!</p>
      ) : (
        <p style={{ color: 'red' }}>Email Inválido. Por favor, insira um email valido.</p>
      )}
        <ButtonContainer>
          <Button onClick={gerarPDF}>SALVAR QRCODE</Button>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Button>VOLTAR PARA A HOME</Button>
          </Link>
          {popupVisible && <Popup>QRCODE SALVO COM SUCESSO</Popup>}
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default RegistrarIngresso;