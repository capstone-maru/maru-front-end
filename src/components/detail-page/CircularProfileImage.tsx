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
      <div>
        <CircularProgressBar
          diameter={diameter}
          percentage={percentage}
          strokeWidth={10}
        />
      </div>
    </styles.container>
  );
}
