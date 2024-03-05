import useLoginStatus from '@/hooks/useLoginStatus';

export default function NavigationBar() {
  const loginStatus = useLoginStatus();

  if (!loginStatus) return <>not logged in</>;
  return <>logged in</>;
}
