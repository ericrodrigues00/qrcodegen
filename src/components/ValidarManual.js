import React, { useEffect, useState } from 'react';
import api from '../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: "Outfit";
  padding: 0px 30px;
  max-width: 1000px;
  width: 100%;
  height: 50%;
  margin: 0 auto;
  justify-content:center;
  font-size: 26px;
  @media (max-width: 768px) {
    align-items: center; 
    padding: 20px 30px;
    gap: 25px;
    width: 80%;
  }
`;


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
    font-size: 40px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centralize horizontalmente */
  gap: 40px;
  margin-top: 75px;
  margin-bottom: 30px;
  
  
  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 20px;
  }
`;
const StyledTable = styled.table`
  border: None;
  align-items: center;
  border-collapse: collapse;
  text-align: center;
  caption-side: top;
  vertical-align: middle;
  margin-bottom: 10px;
  letter-spacing: 1px;
  table-layout: fixed;
  width: 100%;
  tbody {
    vertical-align: center;
    margin: 0px auto;
  }
  td,
  th {
    border: none;

  }

  td {
    padding: 5px 0px;
  }

  thead > tr {
    background-color: #A1968B;
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
    text-align: left;
    color: "blue";
    margin-bottom: 16px;
  }

  text-align: center;

  th, td {
    padding: 5px -20%; // Remova o padding horizontal e mantenha o padding vertical
  }
  @media (max-width: 768px) {
    font-size: 14px;
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
  width:400px;
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
    width:300px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;
const Button2 = styled.button`
  background-color: #00ff83;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 15px 40px 10px 40px;
  font-size: 20px;
  text-transform: uppercase;
  font-family: "Outfit";
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  height:50px;
  width:400px;
  @media (max-width: 768px) { 
    font-size: 16px; 
    width:300px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;
const Tr = styled.tr`
  text-align: center;
  &:hover {
    color: purple;
  }
  &:nth-child(even) {
    background-color: #f0f0f0; /* Linhas pares são cinzas */
  }
  &:nth-child(odd) {
    background-color: #ffffff; /* Linhas ímpares são brancas */
  }

  //muda a cor quando está selecionado

  &.selected {
    background-color: #6a1b9a;
    color: white /* Change the background color for selected rows */
  }

  
`;
//teste
const ThCustom = styled.th`
  padding: 5px 20px; /* Estilo personalizado para a coluna específica */
  background-color: #333;
  color: white;
 `;

const TdCustom = styled.td`
  padding: 5px 100px; /* Estilo personalizado para a coluna específica */
  
`;
const Input = styled.input`
  padding: 10px;
  border: 0;
  border-radius: 0px;
  border-bottom: 1px solid #666;
  width: 30%;
  font-size: 30px;
  font-family: "Outfit";
  @media (max-width: 768px) {
    width: 95%;
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


const ValidarManual = () => {
  const [ingressos, setIngressos] = useState([]);
  const [filter, setFilter] = useState(''); // Step 1: Add filter state
  const [selectedRows, setSelectedRows] = useState([]);
  const [resultadoScan, setResultadoScan] = useState(null);
  const [lido, setLido] = useState(false);
  const [valor, setValor] = useState(''); // Initialize valor state
  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    // Fetch ingressos from the backend
    const fetchIngressos = async () => {
      try {
        const response = await api.get('/api/ingressos');
        setIngressos(response.data);
      } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
      }
    };

    fetchIngressos();
  }, []);

  // Step 2: Update the filteredIngressos variable to include filtering by ID
  const filteredIngressos = ingressos.filter(ingresso => {
    return ingresso.numero.toString().includes(filter); // Convert to string and compare
  });
  
  const toggleRowSelection = (ingresso) => {
    if (selectedRows.some(selectedIngresso => selectedIngresso._id === ingresso._id)) {
      setSelectedRows(selectedRows.filter(selectedIngresso => selectedIngresso._id !== ingresso._id));
    } else {
      setSelectedRows([...selectedRows, ingresso]);
    }
    // Set valor to the selected ingresso.numero
    setValor(ingresso.numero);
  };
  
  useEffect(() => {
    if (filter === '') {
      setSelectedRows([]); // Reset all checkboxes when filter is empty
    }
  }, [filter]);
  const fecharPopup = () => {
    setResultadoScan(null);
    setPopupVisible(false);
  };

  const verificarIngresso = async (numero) => {
      const numeroMatch = Number(numero);
      if (numeroMatch) {
        const apiUrl = `https://api-eztickets.onrender.com/api/verificarIngresso?numero=${numero}`;
        const response = await axios.get(apiUrl);
        if (response.data.ingressoValido) {
            setResultadoScan('Ingresso Válido!');
            setLido(true);
            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false);
              }, 2000);
            setFilter("");
          } else {
            if (response.data.message === "Ingresso já foi utilizado"){
              setResultadoScan("Ingresso já foi utilizado!")
            }
            }
        }
        setPopupVisible(true);
        setValor("");
        setTimeout(() => {
            setPopupVisible(false);
          }, 2000);
  };
  return (
    <Container>
      <TitleContainer>
        <Title>Validar Ingressos</Title>
      </TitleContainer>
      <FormContainer>
        <Input
          type="text"
          id="myInput"
          placeholder="ID" // Update the placeholder
          value={filter} // Step 1: Use filter as the value
          onChange={(e) => setFilter(e.target.value)} // Step 3: Attach an onChange event handler
        />
        <StyledTable id="myTable">
          <thead>
            <tr>
              <ThCustom>NOME</ThCustom>
              <ThCustom>ID</ThCustom>
              <ThCustom>UTILIZADO</ThCustom>
              <ThCustom>VALIDAR</ThCustom>
            </tr>
          </thead>
          <tbody>
            {filter === '' // Show only headers when filter is empty
              ? null
              : filteredIngressos.map(ingresso => (
                  <Tr key={ingresso._id}
                  onClick={() => toggleRowSelection(ingresso)} // Handle row selection on click
                  className={selectedRows.some(selectedIngresso => selectedIngresso._id === ingresso._id) ? 'selected' : ''}
                    >
                    <TdCustom>{ingresso.nome}</TdCustom>
                    <TdCustom>{ingresso.numero}</TdCustom>
                    <TdCustom>{ingresso.lido ? 'SIM' : 'NÃO'}</TdCustom>
                    <TdCustom>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(ingresso)}
                        onChange={() => toggleRowSelection(ingresso)}
                      />
                    </TdCustom>
                  </Tr>
                ))}
          </tbody>
        </StyledTable>
        <ButtonContainer>
        <Button2 onClick={() => verificarIngresso(Number(valor))}>CONFIRMAR VALIDAÇÃO</Button2>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button>VOLTAR PARA A HOME</Button>
          </Link>
          {popupVisible && <Popup> {resultadoScan} </Popup>}
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default ValidarManual;
