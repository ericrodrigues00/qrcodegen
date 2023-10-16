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
`;

const ContentContainer = styled.div`
  padding: 20px;
  background-color: #a391d6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const Title = styled.h1`
  color: #6a1b9a;
  align-items: center;
  position: center;
`;

const StyledTable = styled.table`
  border: None;
  align-items: center;
  border-collapse: collapse;
  text-align: center;
  margin: 0px auto;
  caption-side: top;
  vertical-align: middle;
  margin-bottom: 50px;
  width: ${props => props.width || 'auto'};
  tbody {
    vertical-align: middle;
  }
  td,
  th {
    border: none;
  }

  td {
    padding: 5px 135px;
  }

  thead > tr {
    background-color: #c2c2c2;
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
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
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

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
              <th>CONTATO</th>
              <th>UTILIZADO</th>
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
