'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { useAuthIsLogin } from '@/features/auth';

const styles = {
  container: styled.nav`
    display: flex;
    height: 72px;
    padding: 14px 240px 15px 240px;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid #f7f6f9;
    background: #fff;
    box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.05);
  `,
  title: styled.h1`
    color: var(--Main-1, #e15637);
    font-family: 'Baloo 2';
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  links: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  `,
  logout: styled.button`
    all: unset;
    display: flex;
    padding: 8px 16px;
    align-items: flex-start;
    gap: 8px;

    border-radius: 8px;
    background: #e15637;

    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    cursor: pointer;
  `,
};

export function NavigationBar() {
  const isLogin = useAuthIsLogin();

  return (
    <styles.container>
      <styles.title>
        <Link href="/">maru</Link>
      </styles.title>
      <styles.links>
        <Link href="/shared">메이트찾기</Link>
        <Link href="/community">커뮤니티</Link>
        <Link href="/my">마이페이지</Link>
        {isLogin && <styles.logout>로그아웃</styles.logout>}
      </styles.links>
    </styles.container>
  );
}
