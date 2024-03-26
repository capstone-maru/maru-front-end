'use client';

import { type HTMLAttributes } from 'react';
import styled from 'styled-components';

import { DropDownList } from './DropDownList';

import { SharedPostsFilterTypeValue } from '@/entities/shared-posts-filter';

const styles = {
  container: styled.div`
    display: flex;
    gap: 1rem;
  `,
};

export function SharedPostsFilter({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  // TODO: 필터 정보 저장 코드 필요.

  return (
    <styles.container className={className}>
      {Object.entries(SharedPostsFilterTypeValue).map(([key, value]) => (
        <DropDownList
          key={key}
          title={value}
          items={[]}
          onSelect={() => {
            console.debug(`${value} clicked`);
          }}
        />
      ))}
    </styles.container>
  );
}
