import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/entities/user';

/*
현재 사용자 로그인 정보를 redux를 이용해 관리하는 방식을 채택했지만,
일관성을 위해 서버로부터 가져오는 모든 데이터를 react-query를 이용하는 방식으로 변경 할 수 있음.
*/

export interface AuthState {
  status: 'logged-in' | 'not-logged-in';
  user: User;
  token: string;
}

const initialState: AuthState = {
  status: 'not-logged-in',
  user: {
    name: 'undefined',
    birth: new Date(),
    gender: 'undefined',
    email: 'undefined',
    phone: 'undefined',
  },
  token: 'undefined',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => ({
      status: 'logged-in',
      user: action.payload.user,
      token: action.payload.token,
    }),
    logout: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) return state;
      return {
        status: 'not-logged-in',
        user: {
          name: 'undefined',
          birth: new Date(),
          gender: 'undefined',
          email: 'undefined',
          phone: 'undefined',
        },
        token: 'undefined',
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { reducer: auth } = authSlice;
