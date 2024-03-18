import { selector } from 'recoil';

import { authState } from './auth.atom';

export const getIsLogin = selector<boolean>({
  key: 'authState/isLogin',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isLogin;
  },
});
