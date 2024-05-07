'use client';

import { isAxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

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

  useLayoutEffect(() => {
    if (pathName === '/login') {
      return;
    }

    if (auth == null) {
      const refreshToken = load<string>({ type: 'local', key: 'refreshToken' });
      if (refreshToken != null && !isLoading) {
        setIsLoading(true);
        postTokenRefresh(refreshToken)
          .then(({ data }) => {
            login({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
            });
          })
          .catch((err: Error) => {
            if (isAxiosError(err)) {
              remove({ type: 'local', key: 'refreshToken' });
              if (pathName !== '/') router.replace('/');
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        router.replace('/');
      }
    }
  }, [pathName, auth, login, router, isLoading]);

  if (pathName !== '/' && pathName !== '/login' && (isLoading || auth == null))
    return <></>;
  return <>{children}</>;
}
