'use client';

import styled from 'styled-components';

const styles = {
  container: styled.div`
    position: relative;
    left: -240px;
    width: 100dvw;
    min-height: calc(100dvh - 72px);
    max-height: 100%;
    background: var(--background, #f7f6f9);

    display: flex;
    justify-content: center;
    padding: 48px 0;
    gap: 15px;
  `,
  houseInfo: styled.div`
    width: 50%;
    flex-shrink: 0;
    border-radius: 16px;
    background: #fff;
  `,
  hostInfo: styled.div`
    width: 25%;
    height: 47dvh;
    flex-shrink: 0;
    border-radius: 16px;
    background: #fff;
  `,
};

export function SharedPostPage() {
  return (
    <styles.container>
      <styles.houseInfo />
      <styles.hostInfo />
    </styles.container>
  );
}
