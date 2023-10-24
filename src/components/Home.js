import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTicketAlt, FaCamera, FaUserCheck, FaRegListAlt} from 'react-icons/fa';

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
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Centralize horizontalmente */
  gap: 40px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 60px 80px 20px 80px;
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
    padding: 30px 40px 10px 40px; 
    font-size: 16px; 
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;


const Icon = styled.span`
  font-size: 60px;
  margin-bottom: 10px;
`;

const Home = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>PARMEJÓ 2023</Title>
      </TitleContainer>
      <ButtonContainer>
        <StyledLink to="/registrar">
          <Button>
            <Icon>
              <FaTicketAlt />
            </Icon>
            Registrar
          </Button>
        </StyledLink>
        <StyledLink to="/escanear"> 
          <Button>
            <Icon>
              <FaCamera />
            </Icon>
            Escanear
          </Button>
        </StyledLink>
        <StyledLink to="/visualizar">
          <Button>
            <Icon>
              <FaUserCheck />
            </Icon>
            Presentes
          </Button>
        </StyledLink>
        <StyledLink to="/validar"> 
          <Button>
            <Icon>
              <FaRegListAlt />
            </Icon>
            Validação
          </Button>
        </StyledLink>
      </ButtonContainer>
    </Container>
  );
};

export default Home;