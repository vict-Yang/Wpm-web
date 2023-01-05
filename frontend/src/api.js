import axios from 'axios';

const instance = axios.create({
  baseURL: `https://wp-final-backend.onrender.com`,
});

export default instance;
