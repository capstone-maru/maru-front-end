'use client';

import axios, { type AxiosRequestConfig, isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postTokenRefresh, useAuthActions } from '@/features/auth';
import { load } from '@/shared/storage';

interface AxiosRequestConfigWithRetryCount extends AxiosRequestConfig {
  retryCount?: number;
}

axios.interceptors.response.use(
  response => response,
  async error => {
    if (!isAxiosError(error)) return await Promise.reject(error);

    const router = useRouter();
    const { login, logout } = useAuthActions();

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

        const token = response.data.accessToken;
        const newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };

        login(response.data);
        return await axios(newConfig);
      } catch (refreshError) {
        logout();
        router.replace('/');
        return await Promise.reject(refreshError);
      }
    }

    logout();
    router.replace('/');
    return await Promise.reject(error);
  },
);
