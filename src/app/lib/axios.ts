'use client';

import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { useRouter } from 'next/navigation';

import { getUserData, postTokenRefresh, useAuthActions } from '@/features/auth';
import { load } from '@/shared/storage';

let isRefreshing = false;

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const router = useRouter();
    const { login, logout, setAuthUserData } = useAuthActions();

    const { config, response } = error;
    const originalRequest = config as AxiosRequestConfig;

    const refreshToken = load<string>({
      type: 'local',
      key: 'refreshToken',
    });

    if (
      response != null &&
      refreshToken != null &&
      response.status === 401 &&
      !isRefreshing
    ) {
      isRefreshing = true;

      return await new Promise((resolve, reject) => {
        postTokenRefresh(refreshToken)
          .then(({ data }) => {
            if (originalRequest.headers != null)
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            login(data);
            getUserData()
              .then(({ data: user }) => {
                setAuthUserData(user);
              })
              .catch(err => {
                console.error(err);
              });

            resolve(axios(originalRequest));
          })
          .catch(err => {
            router.push('/');
            logout();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return await Promise.reject(error);
  },
);
