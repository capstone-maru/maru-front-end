import { atom } from 'recoil';

import { type AuthState } from './auth.model';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLogin: false,
    token: undefined,
  },
});
