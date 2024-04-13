'use client';

import styled from 'styled-components';

import { RangeSlider } from '@/components';

const styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 2rem;
    border-radius: 1.25rem;
    background: #fff;

    width: 20rem;
  `,
  item: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    h1 {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    div {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;

      button {
        all: unset;
        cursor: pointer;

        display: flex;
        padding: 0.75rem 1.25rem;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        border-radius: 0.5rem;
        border: 1px solid #000;

        color: #000;
        font-family: 'Noto Sans KR';
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  `,
};

export function DealTypeFilter() {
  return (
    <styles.container>
      <styles.item>
        <h1>거래 방식</h1>
        <div>
          <button type="button">전세</button>
          <button type="button">월세</button>
        </div>
      </styles.item>
      <styles.item>
        <h1>희망 월 분담금</h1>
        <RangeSlider min={0} max={100} onChange={() => {}} />
      </styles.item>
    </styles.container>
  );
}
