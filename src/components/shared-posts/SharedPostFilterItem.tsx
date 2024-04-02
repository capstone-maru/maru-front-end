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
  content: styled.div`
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
};

interface Props {
  title: string;
  items: string[];
  selected?: string;
  onSelect: (item: string) => void;
}

export function SharedPostFilterItem({
  title,
  items,
  selected,
  onSelect,
}: Props) {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const handler = () => {
      setShowList(false);
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [showList, setShowList]);

  return (
    <styles.container
      onClick={() => {
        setShowList(true);
      }}
    >
      <styles.content>
        {selected ?? title}
        <img alt="drop-down-button-2" src="/icon-drop-down_2.svg" />
      </styles.content>
    </styles.container>
  );
}
