import { atom } from 'recoil';

import { type Auth } from './auth.model';

export const authState = atom<Auth | undefined>({
  key: 'authState',
  default: undefined,
});
