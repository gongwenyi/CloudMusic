import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default {
  get(url, params) {
    return instance.get(url, {
      params,
    });
  },
  post(url, data) {
    return instance.post(url, data);
  }
}

