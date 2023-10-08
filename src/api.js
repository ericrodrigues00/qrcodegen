import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Use a URL do seu servidor backend
});

export default api;
