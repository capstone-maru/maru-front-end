'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ChattingList } from './chat/ChattingList';
import { ChattingRoom } from './chat/ChattingRoom';

import { useAuthValue, useUserData } from '@/features/auth';

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
  buttonIcon: styled.img`
    width: 2rem;
    height: 2rem;
  `,
  container: styled.div`
    position: fixed;
    bottom: 6rem;
    right: 6.5rem;
    display: flex;
    width: 25rem;
    height: 35rem;
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
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    gap: 1rem;
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
  searchButton: styled.img`
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  `,
  searchInput: styled.input`
    flex: 1;
    font-size: 1.25rem;
    padding: 0.8rem;
    height: 2rem;
    width: 8rem;
    background-color: transparent;
    border: #bdbdbd solid 1px;
    border-radius: 1.2rem;
    color: var(--Text-grayDark, #2c2c2e);
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.125rem;

    &:focus {
      outline: none;
    }
  `,
};

export function FloatingChatting() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isChatRoomOpen, setIsChatRoomOpen] = useState<boolean>(false);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
    if (isChatRoomOpen) setIsChatRoomOpen(false);
  };

  const auth = useAuthValue();
  const { data } = useUserData(auth?.accessToken !== undefined);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (data !== undefined) setName(data.name);
  }, [data]);

  const handleChatRoomClick = () => {
    setIsChatRoomOpen(prev => !prev);
  };

  return (
    <>
      <styles.chattingButton onClick={toggleChat}>
        <styles.buttonIcon src="/chatting.svg" />
      </styles.chattingButton>
      {isChatOpen && (
        <styles.container>
          <styles.chattingHeader>
            <div>
              <styles.title style={{ color: 'var(--Main-1, #E15637)' }}>
                maru{' '}
              </styles.title>
              <styles.title style={{ color: 'var(--Gray, #8C95A8)' }}>
                chat
              </styles.title>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <styles.searchInput />
              <styles.searchButton src="/icon-search.svg" />
            </div>
          </styles.chattingHeader>
          <styles.chattingSection>
            <ChattingList onClick={handleChatRoomClick} />
            <ChattingList onClick={handleChatRoomClick} />
            <ChattingList onClick={handleChatRoomClick} />
          </styles.chattingSection>
        </styles.container>
      )}
      {isChatRoomOpen && (
        <ChattingRoom
          userName={name}
          roomId={1}
          onRoomClick={setIsChatRoomOpen}
        />
      )}
    </>
  );
}
