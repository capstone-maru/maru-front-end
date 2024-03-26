'use client';

import styled from 'styled-components';

import { DropDownList } from './DropDownList';

import { SharedPostsFilterTypeValue } from '@/entities/shared-posts-filter';

const styles = {
  container: styled.div`
    display: flex;
    gap: 1rem;
  `,
};

export function SharedPostsFilter() {
  return (
    <styles.container>
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
