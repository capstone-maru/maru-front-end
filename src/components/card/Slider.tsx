'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  container: styled.div`
    display: flex;
    width: 30rem;
    align-items: center;
  `,
  sliderContainer: styled.div`
    width: 25rem;
    height: 1.875rem;
    position: relative;
  `,
  sliderTrack: styled.div`
    width: 100%;
    height: 0.3125rem;
    border-radius: 20px;
    background: #d9d9d9;
    position: absolute;
    top: calc(50% - 2px);
  `,
  sliderFillTrack: styled.div<FillProps>`
    width: ${props => props.$fill};
    height: 0.3125rem;
    border-radius: 2px;
    background: var(--Main-1, #e15637);
    position: absolute;
    top: calc(50% - 2px);
  `,
  slider: styled.input`
    width: 25rem;
    height: 0.3125rem;
    border-radius: 1.25rem;
    -webkit-appearance: none;
    background: transparent;

    &:active {
      cursor: grabbing;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      pointer-events: all;
      width: 1.875rem;
      height: 1.875rem;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 1px #c6c6c6;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }
  `,
  value: styled.span`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 1rem;
  `,
};

interface SliderProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
}

interface FillProps {
  $fill: string;
}

export function Slider({
  min,
  max,
  step,
  initialValue,
  onChange,
}: SliderProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <styles.container>
      <styles.sliderContainer>
        <styles.sliderTrack />
        <styles.sliderFillTrack $fill={`${(value / (max - min)) * 100}%`} />
        <styles.slider
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
      </styles.sliderContainer>
      <styles.value>{value > 9 ? '무제한' : `±${value}세`}</styles.value>
    </styles.container>
  );
}
