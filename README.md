# ParmeJó 2023 - Controle de Ingressos 🎫

Projeto realizado para o evento "ParmeJó 2023" organizado pela unidade da Bethel Church de Jundiaí - SP, com o objetivo de controlar e validar os ingressos emitidos para o evento.

## Tabela de Conteúdos 📋

- [Deploy](#deploy)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Capturas de Tela](#capturas-de-tela)
- [Equipe](#equipe)

## Deploy 🚀

O site está disponível para ser testado em: [https://qrcodegen-eztickets.vercel.app](https://qrcodegen-eztickets.vercel.app)

## Tecnologias Utilizadas 💻

- MongoDB ![MongoDB](https://img.shields.io/badge/-MongoDB-brightgreen)
- Express ![Express](https://img.shields.io/badge/-Express-lightgrey)
- React ![React](https://img.shields.io/badge/-React-blue)
- Node.js ![Node.js](https://img.shields.io/badge/-Node.js-green)

## Funcionalidades ⚙️

### Registrar

- Cadastra novos ingressos no banco de dados, recebendo o nome do titular do ingresso e seu e-mail de contato para gerar o QR code, que é enviado para o email de contato registrado.

### Escanear

- Contém um leitor de QR Codes, bem como a lógica responsável pela validação do ingresso lido.

### Presentes

- Apresenta uma lista de todos os ingressos registrados até o momento.
- Permite o usuário filtrar o banco de dados por nome ou por ingressos que ainda não foram utilizados.

### Validação

- Permite ao usuário validar manualmente ingressos a partir do ID único associado a cada um deles.

## Capturas de Tela 📷

## Capturas de Tela 📷

<table>
  <tr>
    <td align="center"><img src="https://imgur.com/Jj42SYI" alt="Ingresso" ></td>
    <td align="center"><img src="https://imgur.com/W8xgaIU" alt="Escanear Ingresso" ></td>
    <td align="center"><img src="https://imgur.com/JlJ9wqJ" alt="Visualizar Ingresso" ></td>
    <td align="center"><img src="https://imgur.com/4URw7Pn" alt="Validar Ingresso" ></td>
    <td align="center"><img src="https://imgur.com/d3vFrIS" alt="Registrar Ingresso"  ></td>
  </tr>
  <tr>
    <td align="center"><em>Exemplo de ingresso</em></td>
    <td align="center"><em>Funcionamento do leitor</em></td>
    <td align="center"><em>Exemplo da tela visualizar ingressos</em></td>
    <td align="center"><em>Exemplo da validação</em></td>
    <td align="center"><em>Exemplo de registar ingresso</em></td>
  </tr>
</table>


## Equipe 👨‍💻

Este projeto foi realizado por:

- Eric Rodrigues de Oliveira ([GitHub](https://github.com/ericrodrigues00))
- João Vinicius Castro ([GitHub](https://github.com/akastroo))
- Mauro Sales Dias Ramos ([GitHub](https://github.com/maurosdr))
- Marco Schweitzer ([GitHub](https://github.com/MarcoSchwepps))
