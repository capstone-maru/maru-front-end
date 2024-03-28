import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from './auth.atom';
import { type Auth } from './auth.model';

import { save } from '@/shared/persist';

export const useAuthActions = () => {
  const [, setAuth] = useRecoilState(authState);

  const login = useCallback(
    (auth: Auth) => {
      axios.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      save({ type: 'session', key: 'refreshToken', value: auth.accessToken });
      save({ type: 'session', key: 'expiresIn', value: `${auth.expiresIn}` });
      setAuth(auth);
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    axios.defaults.headers.common.Authorization = '';
    setAuth(null);
  }, [setAuth]);

  return useMemo(() => ({ login, logout }), [login, logout]);
};
