import axios from 'axios';

const api = axios.create({
  responseType: 'json',
  timeout: 5000,
});

export default api;