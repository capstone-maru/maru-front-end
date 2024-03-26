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
  `,
  SharedPostsMenu: styled(SharedPostsMenu)`
    margin-bottom: 2rem;
  `,
  SharedPostsFilter: styled(SharedPostsFilter)`
    margin-bottom: 5.19rem;
  `,
};

export function SharedPostsPage() {
  const [selected, setSelected] = useState<
    'hasRoom' | 'homeless' | 'dormitory'
  >('hasRoom');

  return (
    <styles.container>
      <styles.SharedPostsMenu selected={selected} handleSelect={setSelected} />
      <styles.SharedPostsFilter />
    </styles.container>
  );
}
