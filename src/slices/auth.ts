import type User from '@/models/user';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
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
export default authSlice.reducer;
