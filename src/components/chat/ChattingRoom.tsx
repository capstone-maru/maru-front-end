'use client';

import styled from 'styled-components';

import { ReceiverMessage } from './ReceiverMessage';
import { SenderMessage } from './SenderMessage';

const styles = {
  container: styled.div`
    position: fixed;
    bottom: 5rem;
    left: 6.5rem;
    display: flex;
    width: 25%;
    height: 70%;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    z-index: 100;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    overflow: hidden;
  `,
  header: styled.div`
    width: 100%;
    height: 3.625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
  `,
  users: styled.div`
    display: inline-flex;
    width: 2rem;
    align-items: center;
    flex-shrink: 0;
    position: relative;
  `,
  user: styled.div`
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border-radius: 150px;
    border: 1.5px solid #fff;
    background: url('__avatar_url.png') lightgray 50% / cover no-repeat;
  `,
  roomInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  roomName: styled.p`
    color: var(--Text-grayDark, #2c2c2e);
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.125rem;
  `,
  latestTime: styled.p`
    color: var(--Text-gray, #666668);
    font-family: 'Noto Sans KR';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  menu: styled.div`
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    background: url('kebab-horizontal.svg') no-repeat;
  `,
  messageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 7.5rem);
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
    position: relative;
  `,
  senderFrame: styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 0.8rem;
    margin: 0.8rem 0;
  `,
  receiverFrame: styled.div`
    display: flex;
    justify-content: flex-start;
    padding-left: 0.8rem;
    margin: 0.8rem 0;
  `,
  messageInput: styled.div`
    width: 100%;
    height: 3rem;
  `,
};

export function ChattingRoom() {
  return (
    <styles.container>
      <styles.header>
        <styles.users>
          <styles.user />
          <styles.user style={{ left: '1.2rem', zIndex: '1' }} />
          <styles.user style={{ left: '2.4rem', zIndex: '2' }} />
          <styles.user style={{ left: '3.6rem', zIndex: '3' }} />
        </styles.users>
        <styles.roomInfo>
          <styles.roomName>정릉 기숙사 405호</styles.roomName>
          <styles.latestTime>45분전</styles.latestTime>
        </styles.roomInfo>
        <styles.menu />
      </styles.header>
      <styles.messageContainer>
        <styles.senderFrame>
          <SenderMessage />
        </styles.senderFrame>
        <styles.receiverFrame>
          <ReceiverMessage />
        </styles.receiverFrame>
      </styles.messageContainer>
      <styles.messageInput />
    </styles.container>
  );
}
