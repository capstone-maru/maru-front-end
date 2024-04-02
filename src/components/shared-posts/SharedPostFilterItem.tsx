'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const styles = {
  container: styled.div`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    position: relative;
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: column;
    padding: 0.75rem 1.25rem;

    border-radius: 12px;
    border: 2px solid var(--Gray-4, #dfdfdf);

    cursor: pointer;
  `,
  title: styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  content: styled.div<{ $hidden: boolean }>`
    visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};

    width: 30dvw;
    height: 30dvw;
    border-radius: 1.25rem;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);

    position: absolute;
    left: 0;
    top: calc(100% + 1rem);
    z-index: 2147483647;
  `,
};

interface Props {
  title: string;
  items: string[];
  selected?: string;
  onSelect: (item: string) => void;
  filterComponent: React.ReactNode;
}

export function SharedPostFilterItem({
  title,
  items,
  selected,
  onSelect,
  filterComponent,
}: Props) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handler = () => {
      setHidden(true);
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [hidden, setHidden]);

  return (
    <styles.container
      onClick={() => {
        setHidden(false);
      }}
    >
      <styles.title>
        {selected ?? title}
        <img alt="drop-down-button-2" src="/icon-drop-down_2.svg" />
      </styles.title>
      <styles.content $hidden={hidden}>{filterComponent}</styles.content>
    </styles.container>
  );
}
