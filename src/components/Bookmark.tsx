'use client';

import styled from 'styled-components';

const styles = {
  container: styled.div`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: inline-flex;
    padding: 0.6875rem 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--Gray-3, #888);

    cursor: pointer;
  `,
};

interface Props {
  marked: boolean;
  onToggle: () => void;
}

export function Bookmark({ marked, onToggle }: Props) {
  return (
    <styles.container
      onClick={() => {
        onToggle();
      }}
    >
      <img alt="" src="/icon-bookmark.svg" />
    </styles.container>
  );
}
