import { useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';

export default function useLoginStatus() {
  const [loginStatus, setLoginStatus] = useState(false);

  const status = useAppSelector(state => state.auth.status);
  useEffect(() => {
    if (status === 'logged-in') {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [status]);

  return loginStatus;
}
