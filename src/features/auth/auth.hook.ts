import { useRecoilState, useRecoilValue } from 'recoil';

import { authState } from './auth.atom';
import { getIsLogin } from './auth.selector';

export const useAuthState = () => useRecoilState(authState);
export const useAuthIsLogin = () => useRecoilValue(getIsLogin);
