/* eslint no-param-reassign: "error" */

import axios from 'axios';

export const instance = axios.create({
  baseURL: '/',
});

instance.interceptors.request.use(
  config => {
    config.headers['Content-type'] = 'application/json; charset=UTF-8';
    config.headers.Accept = 'application/json';
    return config;
  },
  async err => await Promise.reject(err),
);
