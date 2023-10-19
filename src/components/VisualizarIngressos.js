import React, { useEffect, useState } from 'react';
import api from '../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white; /* Fundo branco */
  border-radius: 6px;
  gap: 20px;
  font-family: "Outfit";
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  padding: 60px 50px;
  width: 80%;
  `;

const ContentContainer = styled.div`
  padding: 30px;
  background-color: #a391d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #a391d6;
  width: 96%;
  
`;


const Title = styled.h1`
  color: "black";
  align-items: center;
  position: left;
  font-family: "Outfit";
  text-transform: uppercase;

`;

const StyledTable = styled.table`
  border: None;
  align-items: center;
  border-collapse: collapse;
  text-align: center;
  caption-side: top;
  vertical-align: middle;
  margin-bottom: 50px;
  letter-spacing: 1px;
  table-layout: fixed;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 14px;
  }
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

`;

const Button = styled.button`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 20px solid;
  &:hover {
    background-color: #512da8;
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


const VisualizarIngressos = () => {
  const [ingressos, setIngressos] = useState([]);

  useEffect(() => {
    // Busque os ingressos do servidor backend quando o componente for montado
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

  return (
      <ContentContainer>
        <PageContainer>
        <Title>Visualizar Ingressos</Title>
        <StyledTable>
          <thead>
            <tr>
            <ThCustom>NOME</ThCustom>
              <ThCustom>CONTATO</ThCustom>
              <ThCustom>UTILIZADO</ThCustom>
            </tr>
          </thead>
          <tbody>
            {ingressos.map(ingresso => (
              <Tr key={ingresso._id}>
                <TdCustom>{ingresso.nome}</TdCustom>
                <td>{ingresso.contato}</td>
                <td>{ingresso.lido ? 'SIM' : 'NÃO'}</td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        </PageContainer>
      </ContentContainer>
    
  );
};

export default VisualizarIngressos;