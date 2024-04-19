'use client';

import styled from 'styled-components';

const styles = {
  chattingRoom: styled.div`
    display: flex;
    width: 100%;
    height: 7.6875rem;
    padding: 1.5rem;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    border-bottom: 1px solid var(--Gray-4, #dfdfdf);
    background: #fff;
    cursor: pointer;
    overflow-y: auto;
  `,
  infoSection: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex: 1 0 0;
    position: relative;
  `,
  textSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
  `,
  userProfile: styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: url('__avatar_url.png') lightgray 50% / cover no-repeat;
  `,
  activeCircle: styled.div`
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    left: 2.375rem;
    bottom: 0.125rem;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: #27da4e;
  `,
  roomName: styled.p`
    color: #000;

    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
  `,
  message: styled.p`
    color: #666;

    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
  `,
  newMessageCount: styled.div`
    display: flex;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem 0.46875rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    border-radius: 100px;
    background: var(--Main-1, #e15637);
    color: #fff;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1rem;
  `,
};

export function ChattingList() {
  return (
    <styles.chattingRoom>
      <styles.infoSection>
        <styles.userProfile />
        <styles.activeCircle />
        <styles.textSection>
          <styles.roomName>room1</styles.roomName>
          <styles.message>hi</styles.message>
        </styles.textSection>
      </styles.infoSection>
      <styles.newMessageCount>2</styles.newMessageCount>
    </styles.chattingRoom>
  );
}
