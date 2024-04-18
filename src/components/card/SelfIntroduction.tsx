'use client';

import styled from 'styled-components';

const styles = {
  introduction: styled.input`
    display: flex;
    margin-top: 4.13rem;
    width: 41.9375rem;
    height: 5.4375rem;
    padding: 0.5rem 1rem 3.5rem 1rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    border: none;
    background: #fff;

    color: #9a95a3;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
};

export function SelfIntroduction() {
  return <styles.introduction placeholder="자신을 소개해주세요" type="text" />;
}
