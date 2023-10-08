// src/components/VisualizarIngressos.js
import React, { useEffect, useState } from 'react';
import api from '../api';

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
    <div>
      <h1>Visualizar Ingressos</h1>
      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>CONTATO</th>
            <th>NÚMERO DO INGRESSO</th>
            <th>UTILIZADO</th>
          </tr>
        </thead>
        <tbody>
          {ingressos.map((ingresso) => (
            <tr key={ingresso._id}>
              <td>{ingresso.nome}</td>
              <td>{ingresso.contato}</td>
           
              <td>{ingresso.utilizado ? 'SIM' : 'NÃO'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisualizarIngressos;
