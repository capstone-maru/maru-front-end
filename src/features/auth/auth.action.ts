import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from './auth.atom';
import { type Auth } from './auth.model';

export const useAuthActions = () => {
  const [, setAuth] = useRecoilState(authState);

  const login = useCallback(
    (auth: Auth) => {
      setAuth(auth);
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth(undefined);
  }, []);

  return useMemo(() => ({ login, logout }), [login, logout]);
};
