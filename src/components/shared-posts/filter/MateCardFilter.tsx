'use client';

import styled from 'styled-components';

import { type CardType } from '@/entities/shared-posts-filter';
import { useAuthValue, useUserData } from '@/features/auth';

const styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.56rem;

    width: 30rem;
    height: fit-content;

    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    button {
      all: unset;

      cursor: pointer;
      padding: 1rem;
      transition: 200ms background-color ease-in-out;
      border-radius: 8px;
    }

    button:hover {
      background-color: #ededed;
    }
  `,
};

export function MateCardFilter({
  onSelect,
}: {
  onSelect: (cardType: CardType) => void;
}) {
  const auth = useAuthValue();
  const { data: userData } = useUserData(auth?.accessToken != null);

  return (
    <styles.container>
      <button
        type="button"
        onClick={() => {
          onSelect('mate');
        }}
      >
        {userData?.name}님이 원하는 방 찾기
      </button>
      <button
        type="button"
        onClick={() => {
          onSelect('my');
        }}
      >
        {userData?.name}님을 원하는 방 찾기
      </button>
    </styles.container>
  );
}
