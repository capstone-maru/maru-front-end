'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  majorSelector: styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: flex;
    width: 5.875rem;
    padding: 0.575rem 0;
    align-items: center;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: var(--White, #fff);

    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
  `,
};

const majorOptions = ['공학', '교육', '인문', '사회', '자연', '예체능', '의약'];

export function MajorSelector() {
  const [selectedMajor, setSelectedMajor] = useState('');
  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMajor(event.target.value);
  };
  return (
    <styles.majorSelector
      value={selectedMajor ?? ''}
      onChange={handleMajorChange}
    >
      <option value="">선택</option>
      {majorOptions.map(major => (
        <option key={major} value={major}>
          {major}
        </option>
      ))}
    </styles.majorSelector>
  );
}
