'use client';

import styled from 'styled-components';

const styles = {
  container: styled.div`
    .circle-background {
      fill: none;
      stroke: #e1563720;
    }

    .circle-progress {
      fill: none;
      stroke: #e15637;
      stroke-linecap: round;
    }
  `,
};

export function CircularProgressBar({
  percentage,
  strokeWidth,
  sqSize,
}: {
  percentage: number;
  strokeWidth: number;
  sqSize: number;
}) {
  const radius = (sqSize - strokeWidth) / 2;
  const cx = sqSize / 2;
  const cy = sqSize / 2;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${circumference} ${circumference}`;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <styles.container>
      <svg width={sqSize} height={sqSize}>
        <circle
          className="circle-background"
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circle-progress"
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
    </styles.container>
  );
}
