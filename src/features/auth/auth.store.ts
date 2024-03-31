import axios from 'axios';
import { useMemo } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { type Auth } from './auth.model';

import { remove, save } from '@/shared/persist';

export interface AuthState {
  auth: Auth | null;
}

export interface AuthAction {
  login: (auth: Auth) => void;
  logout: () => void;
}

const useAuthStore = create(
  devtools<AuthState & AuthAction>((set, get) => ({
    auth: null,
    login: (auth: Auth) => {
      axios.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
      save({
        type: 'local',
        key: 'refreshToken',
        value: auth.refreshToken,
      });
      save({ type: 'local', key: 'expiresIn', value: `${auth.expiresIn}` });
      set({ auth });
    },
    logout: () => {
      axios.defaults.headers.common.Authorization = '';
      remove({ type: 'local', key: 'refreshToken' });
      remove({ type: 'local', key: 'expiresIn' });
      set({ auth: null });
    },
  })),
);

export const useAuthState = () => {
  const auth = useAuthStore(state => state.auth);

  return useMemo(() => ({ auth, isLogin: auth !== null }), [auth]);
};

export const useAuthAction = () => {
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  return useMemo(() => ({ login, logout }), [login, logout]);
};
