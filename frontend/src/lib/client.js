import axios from 'axios';
import { API_URL } from '@/lib/globals';
import { JWTToken } from './token';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  function (config) {
    // console.log('config', config);
    // if (config.url !== `auth/login`) {
    //   const token = JWTToken.getToken();
    //   if (token) {
    //     config.headers['Authorization'] = token;
    //   }
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
