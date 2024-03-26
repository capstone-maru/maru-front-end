'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { SharedPostsMenu, SharedPostsFilter } from '@/components/shared-posts';

const styles = {
  container: styled.div`
    padding-top: 4.12rem;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
};

export function SharedPostsPage() {
  const [selected, setSelected] = useState<
    'hasRoom' | 'homeless' | 'dormitory'
  >('hasRoom');

  return (
    <styles.container>
      <SharedPostsMenu selected={selected} onSelect={setSelected} />
      <SharedPostsFilter />
    </styles.container>
  );
}
