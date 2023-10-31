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

- MongoDB 
- Express 
- React 
- Node.js 

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

<table>
  <tr>
    <td align="center"><img src="/screenshots/qrcode exemplo.jfif" alt="Ingresso" ></td>
    <td align="center"><img src="/screenshots/ingresso valido.jfif" alt="Escanear Ingresso" ></td>
    <td align="center"><img src="/screenshots/Visualizar.png" alt="Visualizar Ingresso" ></td>
    <td align="center"><img src="/screenshots/validar.png" alt="Validar Ingresso" ></td>
    <td align="center"><img src="/screenshots/registrarr.png" alt="Registrar Ingresso"  ></td>
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
