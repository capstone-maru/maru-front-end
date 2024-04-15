'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

import { ChattingList } from './chat/ChattingList';

const styles = {
  chattingButton: styled.div`
    position: fixed;
    bottom: 1.5rem;
    right: 3rem;
    display: inline-flex;
    padding: 1rem;
    align-items: flex-start;
    gap: 0.5rem;
    border-radius: 100px;
    background: #e15637;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    z-index: 100;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  `,
  buttonIcon: styled.div`
    width: 2.60419rem;
    height: 2.60419rem;
    background: url('chatting.svg') no-repeat center;
  `,
  container: styled.div`
    position: fixed;
    bottom: 6rem;
    right: 7.5rem;
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
  chattingHeader: styled.div`
    display: inline-flex;
    align-items: center;
    padding-left: 1rem;
    gap: 0.3rem;
    width: 100%;
    height: 3.25rem;
    flex-shrink: 0;
    border-radius: 20px 20px 0 0;
    background: var(--background, #f7f6f9);
  `,
  title: styled.span`
    font-family: 'Baloo 2';
    font-size: 1.575rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  chattingSection: styled.div`
    width: 100%;
    height: calc(100% - 3.25rem);
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
  `,
};

export function FloatingChatting() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };
  return (
    <>
      <styles.chattingButton onClick={toggleChat}>
        <styles.buttonIcon />
      </styles.chattingButton>
      {isChatOpen && (
        <styles.container>
          <styles.chattingHeader>
            <styles.title style={{ color: 'var(--Main-1, #E15637)' }}>
              maru{' '}
            </styles.title>
            <styles.title style={{ color: 'var(--Gray, #8C95A8)' }}>
              chat
            </styles.title>
          </styles.chattingHeader>
          <styles.chattingSection>
            <ChattingList />
            <ChattingList />
            <ChattingList />
            <ChattingList />
          </styles.chattingSection>
        </styles.container>
      )}
    </>
  );
}
