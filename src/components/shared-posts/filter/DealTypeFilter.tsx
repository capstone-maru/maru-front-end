'use client';

import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { RangeSlider } from '@/components';
import { type DealType } from '@/entities/shared-posts-filter';

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

        transition:
          150ms border ease-in-out,
          150ms background-color ease-in-out,
          150ms color ease-in-out;
      }

      .selected {
        background-color: #e15637;
        color: white;

        border: 1px solid white;
      }
    }
  `,
};

export function DealTypeFilter({
  onSelectDealType,
  onChangeExpectedFee,
}: {
  onSelectDealType: (type: '전세' | '월세') => void;
  onChangeExpectedFee: (low: number, high: number) => void;
}) {
  const [selectedDealType, setSelectedDealType] = useState<DealType | null>(
    null,
  );

  const min = useMemo(() => 0, []);
  const max = useMemo(() => 3500000, []);
  const step = useMemo(() => 50000, []);
  const handleChangeExpectedFee = useCallback(
    (low: number, high: number) => {
      onChangeExpectedFee(low, high);
    },
    [onChangeExpectedFee],
  );

  return (
    <styles.container>
      <styles.item>
        <h1>거래 방식</h1>
        <div>
          <button
            type="button"
            className={selectedDealType === '전세' ? 'selected' : ''}
            onClick={() => {
              setSelectedDealType('전세');
              onSelectDealType('전세');
            }}
          >
            전세
          </button>
          <button
            type="button"
            className={selectedDealType === '월세' ? 'selected' : ''}
            onClick={() => {
              setSelectedDealType('월세');
              onSelectDealType('월세');
            }}
          >
            월세
          </button>
        </div>
      </styles.item>
      <styles.item>
        <h1>희망 월 분담금</h1>
        <RangeSlider
          min={min}
          max={max}
          step={step}
          onChange={({ low, high }) => {
            handleChangeExpectedFee(low, high);
          }}
        />
      </styles.item>
    </styles.container>
  );
}
