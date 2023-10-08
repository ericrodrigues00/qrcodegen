// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
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

const Home = () => {
  return (
    <Container>  <ButtonContainer>
    <Link to="/registrar">
    <Button>Registrar Ingresso</Button>
    </Link>
    <Link to="/visualizar">
    <Button>Visualizar Ingressos</Button>
    </Link>
    <Link to="/escanear">
    <Button>Escanear Ingressos</Button>
    </Link>
    </ButtonContainer></Container>
  
   

    
  
  );
};

export default Home;
