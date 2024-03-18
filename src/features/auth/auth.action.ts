import { useCallback, useMemo } from 'react';

import { useAuthState } from '.';

export const useAuthActions = () => {
  const [authState, setAuthState] = useAuthState();

  const login = useCallback(() => {
    setAuthState(prev => ({ ...prev, isLogin: true }));
  }, []);
  const logout = useCallback(() => {
    setAuthState(prev => ({ ...prev, isLogin: false }));
  }, []);

  useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout],
  );
};
