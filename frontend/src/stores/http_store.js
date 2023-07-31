import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '@/lib/globals';
import JWTToken from '@/lib/token';

const API_BASE_URL_DEV = API_URL;

axios.create().interceptors.request.use(
  async (config) => {
    const token = JWTToken.getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = 'Bearer' + token;
      console.log(token.slice(0, 6));
    }
    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

const vanillaHttpStore = create((set, store_get) => ({
  client: axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }),
  setToken: (payload) =>
    set((state) => ({
      client: axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${payload}`,
        },
      }),
    })),
  removeToken: () =>
    set((state) => ({
      client: axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
    })),

  get: async (url) => {
    try {
      const response = await store_get().client.get(url);
      return response;
    } catch (err) {
      console.error(err, url);
      if (err.response.status === 401) {
        return Promise.resolve();
      }
      return Promise.resolve();
    }
  },

  post: async () => {
    try {
      const response = await store_get().client.post(params.url, params.data);
      console.log(response.status);
      return response;
    } catch (err) {
      console.error(err, params);
      if (err.response.status === 401) {
        return Promise.resolve();
      }
      return Promise.resolve();
    }
  },

  put: async () => {
    try {
      const response = await store_get().client.put(params.url, params.data);
      if (response.status === 401) {
        console.log('access token incorrect');
      }
      return response;
    } catch (err) {
      console.error(err, params);
      throw err;
    }
  },

  delete: async () => {
    try {
      const response = await store_get().client.delete(params.url, params.data);
      if (response.status === 401) {
        console.log('access token incorrect');
      }
      return response;
    } catch (err) {
      console.error(err, params);
      throw err;
    }
  },
}));

const httpStore = vanillaHttpStore.getState();
// console.log(httpStore)

const {
  get,
  put,
  post,
  setToken,
  removeToken,
  delete: http_delete,
  client,
} = vanillaHttpStore.getState();

client.interceptors.request.use(
  async (config) => {
    // console.log('Intercepted')
    const token = JWTToken.getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = token;
      // console.log(token.slice(0, 6));
    }
    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

const HttpClient = {
  get,
  put,
  post,
  delete: http_delete,
  setAuthorization: setToken,
  clearAuthorization: removeToken,
  base_url: API_BASE_URL_DEV,
};

export default HttpClient;
