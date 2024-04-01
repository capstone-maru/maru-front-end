import { useRecoilValue } from 'recoil';

import { authState } from './auth.atom';
import { authIsLogin } from './auth.selector';

export const useAuthValue = () => useRecoilValue(authState);
export const useAuthIsLogin = () => useRecoilValue(authIsLogin);
