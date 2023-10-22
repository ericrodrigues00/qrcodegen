import React, { useEffect, useState } from 'react';
import api from '../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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
  margin: 20px 20px 40px 60px;
  text-transform: uppercase;
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
    align-items: center; 
    font-size: 40px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Centralize horizontalmente */
  gap: 40px;
  margin-top: 10px;
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

  tr:nth-child(odd) {
    background-color: #ffffff; /* Linhas ímpares são brancas */
  }

  tr:nth-child(even) {
    background-color: #f0f0f0; /* Linhas pares são cinzas */
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

const Tr = styled.tr`
  text-align: center;
  &:hover {
    background-color: #6a1b9a;
    color: purple;
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
  width: 60%;
  font-size: 30px;
  font-family: "Outfit";
  @media (max-width: 768px) {
    width: 100%;
  }
  
`;



const VisualizarIngressos = () => {
  const [ingressos, setIngressos] = useState([]);
  const [filter, setFilter] = useState('');

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

  const filteredIngressos = ingressos.filter(ingresso => {
    return ingresso.nome?.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <Container>
      <TitleContainer>
        <Title>Visualizar Ingressos</Title>
      </TitleContainer>
      <FormContainer>
        <Input
          type="text"
          id="myInput"
          placeholder="FILTRAR PELO NOME"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <StyledTable id="myTable">
          <thead>
            <tr>
              <ThCustom>NOME</ThCustom>
              <ThCustom>ID</ThCustom>
              <ThCustom>UTILIZADO</ThCustom>
            </tr>
          </thead>
          <tbody>
            {filteredIngressos.map(ingresso => (
              <Tr key={ingresso._id}>
                <TdCustom>{ingresso.nome}</TdCustom>
                <TdCustom>{ingresso.numero}</TdCustom>
                <TdCustom>{ingresso.lido ? 'SIM' : 'NÃO'}</TdCustom>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
        <ButtonContainer>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button>VOLTAR PARA A HOME</Button>
          </Link>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default VisualizarIngressos;