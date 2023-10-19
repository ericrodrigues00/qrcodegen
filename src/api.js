import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-eztickets.onrender.com',  //Use a URL do seu servidor backend
  //baseURL: 'http://localhost:3002',
});

export default api;
