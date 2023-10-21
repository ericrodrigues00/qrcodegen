import React, { useState } from "react";
import styled from "styled-components";
import api from "../api";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";

// conteiner roxo
const Container = styled.div`
  padding: 20px;
  background-color: #a391d6;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: 100vh;`;

const Title = styled.h1`
  text-transform: uppercase;
  margin: 20px 0 0 40px;
  text-align: left;
  font-family: "Outfit";
`;
//conteiner branco com as infos
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: white;
  border-radius: 6px;
  font-family: "Outfit";
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  padding: 60px 50px;
  max-width: 1000px;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  justify-content:center;
`;


const InputLabel = styled.label`
  font-weight: bold;
  color: #6a1b9a;
  font-family: "Outfit";
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 10px;
  border: 0;
  border-radius: 0px;
  border-bottom: 1px solid #666;
  width: 45%;
  font-weight: bold;
  font-family: "Outfit";
  
  
`;

const Button = styled.button`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Outfit";
  /*&:hover {
    background-color: #a391d6;
  }*/
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
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [numero, setNumero] = useState("");
  const [lido, setLido] = useState(false);
  const [ingressos, setIngressos] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  // ...

  const gerarPDF = async () => {
    if (nome && contato) { // Certifique-se de que o número está definido
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
        doc.setFontSize(18); // Tamanho da fonte aumentado para 18
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(106, 27, 154);
        doc.rect(0, 0, 210, 297, "F");
        doc.text("Parmejó 2023", pageWidth / 2, 30, null, null, "center");
        const qrCodeSize = 70;
        const qrCodeConfiguration = {
          margin: 0,
          width: qrCodeSize,
          height: qrCodeSize,
        };
        // Gere o QR Code diretamente no PDF
        const qrCodeData = `Nome: ${response.data.nome}, Contato: ${response.data.contato}, Numero: ${response.data.numero}`;


        const canvas = document.createElement("canvas");

        QRCode.toCanvas(canvas, qrCodeData, qrCodeConfiguration);
        const imgData = canvas.toDataURL("image/png");

        // Calcula a posição central para o QR Code
        const qrCodeX = contentX + (contentWidth - qrCodeSize) / 2;
        const qrCodeY = 50; // Define a posição vertical

        // Exibir nome e contato no centro
        const textX = pageWidth / 2; // Centraliza horizontalmente
        const textY = qrCodeY + qrCodeSize + 10;
        doc.text(`${response.data.nome}`, textX, textY, null, null, "center");
        doc.text(
          `${response.data.contato}`,
          textX,
          textY + 10,
          null,
          null,
          "center"
        );

        // Defina a posição e o tamanho do QR Code
        doc.addImage(imgData, "PNG", qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

        // Salve o PDF
        doc.save(fileName);

        // Exiba o popup de confirmação
        setPopupVisible(true);

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
    }
  };

  return (
    <Container>
      <FormContainer>
      <Title>Registrar Ingresso</Title>
        <InputLabel>Nome:</InputLabel>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <InputLabel>E-mail:</InputLabel>
        <Input
          type="text"
          class="botãonome"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <Button onClick={gerarPDF}>SALVAR QRCODE</Button>
        <Link to="/">
          <Button>VOLTAR PARA A HOME</Button>
        </Link>
        {popupVisible && <Popup>QRCODE SALVO COM SUCESSO</Popup>}
      </FormContainer>
    </Container>
  );
};

export default RegistrarIngresso;
