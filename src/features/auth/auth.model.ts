import { atom, selector } from 'recoil';

export interface AuthState {
  isLogin: boolean;
  token?: string;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLogin: false,
    token: undefined,
  },
});

export const getIsLogin = selector<boolean>({
  key: 'authState/isLogin',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isLogin;
  },
});
