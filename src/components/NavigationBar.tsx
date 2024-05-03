'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SearchBox } from './SearchBox';

import {
  getAuthLogout,
  useAuthActions,
  useAuthIsLogin,
  useAuthValue,
  useUserData,
} from '@/features/auth';
import { useSearchUser } from '@/features/profile';
import { load } from '@/shared/storage';

const styles = {
  container: styled.nav`
    display: flex;
    width: 100%;
    height: 4.5rem;
    padding: 1rem 11.25rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid #f7f6f9;
    background: #fff;
    box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.05);
    z-index: 2147483647;
  `,
  utils: styled.div`
    display: flex;
    align-items: center;
    gap: 3.63rem;
  `,
  title: styled.h1`
    color: var(--Main-1, #e15637);
    font-family: 'Baloo 2';
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  links: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  `,
  logout: styled.button`
    all: unset;
    display: flex;
    padding: 0.5rem 1rem;
    align-items: flex-start;

    border-radius: 8px;
    background: #e15637;

    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    cursor: pointer;
  `,
  searchUserBox: styled.ul`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 6rem;
    left: 19rem;
    background-color: #fff;
    min-width: 20rem;
    min-height: 10rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.05);
    z-index: 20000;
  `,
  userContainer: styled.li`
    display: flex;
    gap: 1.5rem;
    align-items: center;

    color: var(--Text-grayDark, #2c2c2e);
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  userImg: styled.img`
    width: 1rem;
    height: 1rem;
  `,
};

export function NavigationBar() {
  const isLogin = useAuthIsLogin();
  const router = useRouter();

  const auth = useAuthValue();
  const { logout } = useAuthActions();

  const { data } = useUserData(auth?.accessToken !== undefined);

  const handleLogout = () => {
    const refreshToken = load<string>({ type: 'local', key: 'refreshToken' });
    if (refreshToken !== null) {
      getAuthLogout(refreshToken)
        .then(() => {
          router.replace('/');
          logout();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const [email, setEmail] = useState<string>('');
  const [enter, setEnter] = useState(false);

  const { mutate: search, data: searchUser } = useSearchUser(email);

  useEffect(() => {
    if (enter) {
      search();
      setEnter(false);
    }
  }, [enter]);

  useEffect(() => {
    if (searchUser?.data != null)
      router.replace(`/profile/${searchUser?.data.memberId}`);
  }, [searchUser]);

  return (
    <styles.container>
      <styles.utils>
        <styles.title>
          <Link href="/">maru</Link>
        </styles.title>
        <SearchBox onContentChange={setEmail} onEnter={setEnter} />
      </styles.utils>
      <styles.links>
        <Link href="/shared">메이트찾기</Link>
        <Link href="/community">커뮤니티</Link>
        <Link href={`/profile/${data?.memberId}`}>마이페이지</Link>
        {isLogin && (
          <styles.logout
            onClick={() => {
              handleLogout();
            }}
          >
            로그아웃
          </styles.logout>
        )}
      </styles.links>
    </styles.container>
  );
}
