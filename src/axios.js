import axios from 'axios';
const token = '$2b$10$RDewmUZ.M0bvVvGtyArZdOlW2ZapDvh8SAHR7y4A/dZgUrYECnbYy';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default instance;
