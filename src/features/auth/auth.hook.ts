import { useRecoilState, useRecoilValue } from 'recoil';

import { authState, getIsLogin } from './auth.model';

export const useAuthState = () => useRecoilState(authState);
export const useAuthIsLogin = () => useRecoilValue(getIsLogin);
