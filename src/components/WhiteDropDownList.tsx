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
    padding: 8px 24px;

    border-radius: ${({ $showList }) => ($showList ? '26px 26px 0 0' : '26px')};
    border: 2px solid var(--Gray-4, #dfdfdf);
    border-bottom-width: ${({ $showList }) => ($showList ? '0' : '2px')};

    cursor: pointer;
  `,
  content: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;

    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  list: styled.div`
    position: absolute;
    top: 100%;
    left: -2px;
    padding: 8px 24px;

    display: flex;
    width: calc(100% + 4px);
    flex-direction: column;
    gap: 8px;

    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    border: 2px solid var(--Gray-4, #dfdfdf);
    border-top-width: 0px;
    border-radius: 0 0 26px 26px;
    z-index: 1;
  `,
  item: styled.button`
    all: unset;
  `,
};

interface Props {
  title: string;
  items: string[];
}

export function WhiteDropDownList({ title, items }: Props) {
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);

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
      $showList={showList}
      onClick={() => {
        setShowList(true);
      }}
    >
      <styles.content>
        {selected ?? title}
        <img alt="drop-down-button-2" src="/icon_drop_down_2.svg" />
      </styles.content>
      {showList && (
        <styles.list>
          {items.map(item => (
            <styles.item
              onClick={() => {
                setSelected(item);
              }}
              key={item}
            >
              {item}
            </styles.item>
          ))}
        </styles.list>
      )}
    </styles.container>
  );
}
