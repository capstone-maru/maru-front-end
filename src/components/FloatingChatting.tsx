'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  chattingButton: styled.div`
    position: fixed;
    bottom: 1.5rem;
    right: 3rem;
    display: inline-flex;
    padding: 1rem;
    align-items: flex-start;
    gap: 0.5rem;
    border-radius: 6.25rem;
    background: #e15637;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    z-index: 100;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  `,
  chattingContainer: styled.div`
    position: fixed;
    bottom: 5rem;
    right: 6.5rem;
    display: flex;
    width: 25%;
    height: 70%;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    z-index: 100;
    overflow: 'auto';
    -webkit-transition: 0.4s;
    transition: 0.4s;
  `,
  chattingHeader: styled.div`
    width: 100%;
    height: 3.25rem;
    flex-shrink: 0;
    border-radius: 1.25rem 1.25rem 0rem 0rem;
    background: var(--background, #f7f6f9);
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
        <Image
          src="/chatting.svg"
          style={{ width: '1.3rem', height: '1.3rem' }}
          alt="chatting-icon"
        />
      </styles.chattingButton>
      {isChatOpen && (
        <styles.chattingContainer>
          <styles.chattingHeader />
        </styles.chattingContainer>
      )}
    </>
  );
}
