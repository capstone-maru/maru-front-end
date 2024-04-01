import { atom } from 'recoil';

import { type Auth } from './auth.model';

import { storageEffect } from '@/shared/persist';

export const authState = atom<Auth | null>({
  key: 'authState',
  default: null,
  effects: [
    storageEffect({
      key: 'auth-state',
      storageType: 'session',
    }),
  ],
});
