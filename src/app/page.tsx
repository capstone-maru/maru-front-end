'use client';

import useLoginStatus from '@/hooks/useLoginStatus';
import MainPageWithLogin from '@/pages/main-with-login';
import MainPageWithoutLogin from '@/pages/main-without-login';

export default function Home() {
  const loginStatus = useLoginStatus();

  return <>{loginStatus ? <MainPageWithLogin /> : <MainPageWithoutLogin />}</>;
}
