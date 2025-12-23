import axios from 'axios';

const api = axios.create({
  // No "http://localhost:5000" needed! 
  // It will automatically use whatever port the page is loaded on.
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;