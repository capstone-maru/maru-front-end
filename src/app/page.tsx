'use client';

import { LandingPage, MainPage } from './pages';

import { useAuthState } from '@/features/auth';

export default function Home() {
  const { isLogin } = useAuthState();

  return <>{isLogin ? <MainPage /> : <LandingPage />}</>;
}
