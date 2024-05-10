'use client';

import { isAxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect, useState, useCallback } from 'react';

import {
  postTokenRefresh,
  useAuthActions,
  useAuthValue,
} from '@/features/auth';
import { load, remove } from '@/shared/storage';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthValue();
  const { login } = useAuthActions();

  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = useCallback(
    (data: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    }) => {
      login({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      });
    },
    [login],
  );

  const handleLoginError = useCallback(
    (err: Error) => {
      if (isAxiosError(err)) {
        remove({ type: 'local', key: 'refreshToken' });
        if (pathName !== '/') router.replace('/');
      }
    },
    [router, pathName],
  );

  const checkAndRefreshToken = useCallback(() => {
    if (pathName === '/login' || auth != null || isLoading) return;

    const refreshToken = load<string>({ type: 'local', key: 'refreshToken' });
    if (refreshToken == null) {
      router.replace('/');
      return;
    }

    setIsLoading(true);
    postTokenRefresh(refreshToken)
      .then(({ data }) => {
        handleLoginSuccess(data);
      })
      .catch(handleLoginError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathName, auth, isLoading, handleLoginSuccess, handleLoginError, router]);

  useLayoutEffect(() => {
    checkAndRefreshToken();
  }, [checkAndRefreshToken]);

  if (pathName !== '/' && pathName !== '/login' && (isLoading || auth == null))
    return <></>;
  return <>{children}</>;
}
