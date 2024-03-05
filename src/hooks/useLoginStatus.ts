import { useAppSelector } from '@/lib/hooks';
import { useState } from 'react';

export default function useLoginStatus() {
  const [loginStatus, setLoginStatus] = useState(false);

  const status = useAppSelector(state => state.auth.status);
  if (status === 'logged-in') {
    setLoginStatus(true);
  } else {
    setLoginStatus(false);
  }

  return loginStatus;
}
