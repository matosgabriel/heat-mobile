import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.105:4000',
  headers: {
    ['environment']: 'mobile',
  },
});

export { api }