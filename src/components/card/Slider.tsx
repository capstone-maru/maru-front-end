'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const styles = {
  container: styled.div`
    display: inline-flex;
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
    left: ${props => props.$left};
    right: ${props => props.$right};
  `,
  slider: styled.input`
    position: absolute;
    width: 100%;
    height: 0.3125rem;
    border-radius: 1.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    top: calc(50% - 2px);

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
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    }
  `,
};

interface SliderProps {
  min: number;
  max: number;
  step: number;
  onChange: (min: number, max: number) => void;
}

interface FillProps {
  $fill: string;
  $left: string;
  $right: string;
}

export function Slider({ min, max, step, onChange }: SliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLow = Number(e.target.value);
    if (newLow > maxValue) setMaxValue(newLow);
    setMinValue(newLow);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHigh = Number(e.target.value);
    if (newHigh < minValue) setMinValue(newHigh);
    setMaxValue(newHigh);
  };

  useEffect(() => {
    onChange(minValue, maxValue);
  }, [onChange, minValue, maxValue]);

  return (
    <styles.container>
      <styles.sliderContainer>
        <styles.sliderTrack />
        <styles.sliderFillTrack
          $fill={`${((maxValue - minValue) / (max - min)) * 100}%`}
          $left={`${(minValue / max) * 100}%`}
          $right={`${100 - (maxValue / max) * 100}%`}
        />
        <styles.slider
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
        />
        <styles.slider
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
        />
      </styles.sliderContainer>
    </styles.container>
  );
}
