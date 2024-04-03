import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { getUserData } from './auth.api';
import { authState } from './auth.atom';
import { authIsLogin } from './auth.selector';

export const useAuthValue = () => useRecoilValue(authState);
export const useAuthIsLogin = () => useRecoilValue(authIsLogin);

export const useUserData = (enabled: boolean) =>
  useQuery({
    queryKey: ['/api/auth/initial/info'],
    queryFn: getUserData,
    enabled,
  });
