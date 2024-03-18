'use client';

import Link from 'next/link';
import styled from 'styled-components';

const styles = {
  container: styled.div`
    display: flex;
    height: 72px;
    padding: 14px 180px 15px 180px;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid #f7f6f9;
    background: #fff;
    box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.05);
  `,
  title: styled.h1`
    color: #e15637;
    font-family: 'Noto Sans KR';
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  `,
  links: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  `,
  my_page: styled.button`
    all: unset;
    display: flex;
    padding: 8px 16px;
    align-items: flex-start;
    gap: 8px;

    border-radius: 8px;
    background: #e15637;

    color: #fff;
    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};

export function NavigationBar() {
  return (
    <styles.container>
      <styles.title>Maru</styles.title>
      <styles.links>
        <Link href="/search">찾기</Link>
        <Link href="/maru">마루</Link>
        <Link href="/community">커뮤니티</Link>
        <styles.my_page>
          <Link href="/my">마이 페이지</Link>
        </styles.my_page>
      </styles.links>
    </styles.container>
  );
}
