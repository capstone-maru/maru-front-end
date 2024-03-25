'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const styles = {
  container: styled.div<{ $showList: boolean }>`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    position: relative;
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: column;
    padding: 4px 6px;
    border-radius: ${({ $showList }) =>
      $showList ? `5px 5px 0px 0px` : `5px`};
    background: #fce8e3;

    cursor: pointer;

    color: var(--Gray-5, #828282);
    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  content: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
  list: styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    padding: 4px 6px;

    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;

    background: #fce8e3;
    border-radius: 0 0 5px 5px;
    z-index: 1;
  `,
  item: styled.button`
    all: unset;
  `,
};

interface Props {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
}

export function ApricotDropDownList({ items, selected, onSelect }: Props) {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const closeDropDownList = () => {
      if (showList) setShowList(false);
    };
    document.addEventListener('click', closeDropDownList);
    return () => {
      document.removeEventListener('click', closeDropDownList);
    };
  }, [showList, setShowList]);

  return (
    <styles.container
      $showList={showList}
      onClick={() => {
        setShowList(true);
      }}
    >
      <styles.content>
        <p>{`${selected}`}</p>
        <img alt="drop-down-button-1" src="/icon-drop-down_1.svg" />
      </styles.content>
      {showList && (
        <styles.list>
          {items
            .filter(item => item !== selected)
            .map(item => (
              <styles.item
                type="button"
                key={item}
                onClick={() => {
                  onSelect(item);
                }}
              >
                {item}
              </styles.item>
            ))}
        </styles.list>
      )}
    </styles.container>
  );
}
