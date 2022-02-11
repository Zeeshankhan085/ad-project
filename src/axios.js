import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Zeeshankhan085/json-ads',
});

export default instance;
