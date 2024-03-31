import { useMemo } from 'react';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { type User } from '.';

export interface UserState {
  user: User | null;
}

export interface UserAction {
  setUser: (user: User) => void;
}

const useUserStore = create(
  persist(
    devtools<UserState & UserAction>((set, get) => ({
      user: null,
      setUser: (user: User) => {
        set({ user });
      },
    })),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useUserState = () => {
  const user = useUserStore(state => state.user);

  return useMemo(() => ({ user }), [user]);
};

export const useUserAction = () => {
  const setUser = useUserStore(state => state.setUser);

  return useMemo(() => ({ setUser }), [setUser]);
};
