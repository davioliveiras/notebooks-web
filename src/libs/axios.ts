import axios from 'axios';
import cookies from './cookies';

const api = axios.create({baseURL: 'https://notebooks-server.onrender.com'});

api.defaults.headers.common = {
  Authorization: `Bearer ${cookies.get('token')}`,
};

export default api;
