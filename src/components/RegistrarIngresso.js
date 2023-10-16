import React, { useState } from "react";
import styled from "styled-components";
import api from "../api";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";

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
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [numero, setNumero] = useState("");
  const [lido, setLido] = useState(false);
  const [ingressos, setIngressos] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  // ...

  const gerarPDF = async () => {
    if (nome && contato) { 
    console.log('Nome:', nome); // Adicione esta linha
    console.log('Contato:', contato); // Adicione esta linha
    console.log('Número:', numero); // Adicione esta linha
    console.log('Lidoe:', lido);
      const novoIngresso = {
        nome,
        contato,
        numero, 
        lido
      };

      try {
        // Faça a solicitação POST para o backend para registrar o ingresso
        const response = await api.post("/api/ingressos", novoIngresso);

        // Crie um novo documento PDF
        const fileName = "Ingresso - " + {nome} + " .pdf";
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
-        // Aguarde 2 segundos e, em seguida, oculte o popup
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
      <Title>Registrar Ingresso</Title>
      <FormContainer>
        <InputLabel>Nome:</InputLabel>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <InputLabel>Contato:</InputLabel>
        <Input
          type="text"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <Button onClick={gerarPDF}>SALVAR QRCODE</Button>
        <Link to="/">
          <Button>Voltar para a Home</Button>
        </Link>
        {popupVisible && <Popup>QRCODE SALVO COM SUCESSO</Popup>}
      </FormContainer>
      <h2>Ingressos Registrados:</h2>
      <ul>
        {ingressos.map((ingresso, index) => (
          <li key={index}>
            <strong>Nome:</strong> {ingresso.nome}, <strong>Contato:</strong>{" "}
            {ingresso.contato},{" "}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default RegistrarIngresso;
