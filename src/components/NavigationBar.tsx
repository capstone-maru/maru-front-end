import { useAppSelector } from '@/app/lib';

export function NavigationBar() {
  // 아래 코드는 레이어 계층 구조를 파괴하는 코드임. RootState의 값의 문제로 현재 `useAppSelector` 함수는 app 레이어에 위치하나,
  // 해당 함수는 하위 레이어에서 호출되어야만 함.
  const loginStatus = useAppSelector(state => state.auth.status);

  return (
    <>
      {loginStatus === 'logged-in' ? (
        <div>logged in</div>
      ) : (
        <div>not logged in</div>
      )}
    </>
  );
}
