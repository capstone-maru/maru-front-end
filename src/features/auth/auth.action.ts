import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from './auth.atom';

export const useAuthActions = () => {
  const [, setAuth] = useRecoilState(authState);

  const login = useCallback(() => {
    setAuth(prev => ({ ...prev, isLogin: true }));
  }, [setAuth]);
  const logout = useCallback(() => {
    setAuth(prev => ({ ...prev, isLogin: false }));
  }, [setAuth]);

  useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout],
  );
};
