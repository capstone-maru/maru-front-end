'use client';

import axios, { type AxiosRequestConfig, isAxiosError } from 'axios';

import { postTokenRefresh } from '@/features/auth';
import { load, save } from '@/shared/storage';

interface AxiosRequestConfigWithRetryCount extends AxiosRequestConfig {
  retryCount?: number;
}

axios.interceptors.response.use(
  response => response,
  async error => {
    if (!isAxiosError(error)) return await Promise.reject(error);

    const refreshToken = load<string>({ type: 'local', key: 'refreshToken' });
    const config = error.config as AxiosRequestConfigWithRetryCount;
    if (
      error.response?.status === 401 &&
      refreshToken != null &&
      (config?.retryCount ?? 0) < 3
    ) {
      config.retryCount = (config?.retryCount ?? 0) + 1;
      try {
        const response = await postTokenRefresh(refreshToken);

        axios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
        save({
          type: 'local',
          key: 'refreshToken',
          value: response.data.refreshToken,
        });
        save({
          type: 'local',
          key: 'expiresIn',
          value: `${response.data.expiresIn}`,
        });

        const token = response.data.accessToken;
        const newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };

        return await axios(newConfig);
      } catch (refreshError) {
        return await Promise.reject(refreshError);
      }
    }
    return await Promise.reject(error);
  },
);
