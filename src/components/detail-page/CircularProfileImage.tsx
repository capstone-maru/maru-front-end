'use client';

import styled from 'styled-components';

import { CircularProgressBar } from '@/components';

const styles = {
  container: styled.div<{ $diameter: number; $url: string }>`
    width: ${({ $diameter }) => $diameter}px;
    height: ${({ $diameter }) => $diameter}px;
    background-repeat: no-repeat;
    background-size: 80%;
    background-image: ${({ $url }) => `url("${$url}")`};
    background-position: center;
  `,
  percentage: styled.div`
    width: 48px;
    height: 48px;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border-radius: 200px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    color: #e15637;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    top: -40%;
    left: 65%;
  `,
};

export function CircularProfileImage({
  url,
  percentage,
  diameter,
}: {
  url: string;
  percentage: number;
  diameter: number;
}) {
  return (
    <styles.container $diameter={diameter} $url={url}>
      <CircularProgressBar
        diameter={diameter}
        percentage={percentage}
        strokeWidth={10}
      />
      <styles.percentage>{percentage}%</styles.percentage>
    </styles.container>
  );
}
