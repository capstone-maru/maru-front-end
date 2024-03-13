'use client';

import { MainPageWithLogin, MainPageWithoutLogin } from './pages';

import { useLoginStatus } from '@/hooks';

export default function Home() {
  const loginStatus = useLoginStatus();

  return <>{loginStatus ? <MainPageWithLogin /> : <MainPageWithoutLogin />}</>;
}
