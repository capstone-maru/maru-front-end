'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ChattingList } from './chat/ChattingList';
import { ChattingRoom } from './chat/ChattingRoom';

import { useAuthValue, useUserData } from '@/features/auth';
import { useChatRoomList } from '@/features/chat';

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
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ced3da;
      border-radius: 4px;
    }
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

interface ChatRoom {
  roomId: number;
  roomName: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
}

function FloatingChattingBox() {
  const [isChatRoomOpen, setIsChatRoomOpen] = useState<boolean>(false);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [selectedRoomName, setSelectedRoomName] = useState<string>('');
  const [selectedRoomLastTime, setSelectedRoomLastTime] = useState<string>('');

  const auth = useAuthValue();
  const { data } = useUserData(auth?.accessToken !== undefined);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (data !== undefined) {
      setUserId(data.memberId);
      setUserName(data.name);
    }
  }, [data]);

  const handleChatRoomClick = () => {
    setIsChatRoomOpen(prev => !prev);
  };

  const chatRoomList = useChatRoomList(auth?.accessToken);

  useEffect(() => {
    if (chatRoomList.data != null) {
      const chatRoomListData: ChatRoom[] = chatRoomList.data.data;
      setChatRooms(chatRoomListData);
    }
  }, [chatRoomList.data]);

  // const roomName = 'test2';
  // const members = ['naver_htT4VdDRPKqGqKpnncpa71HCA4CVg5LdRC1cWZhCnF8'];
  // const { mutate: chattingCreate } = useCreateChatRoom(roomName, members);

  return (
    <>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <styles.searchInput />
            <styles.searchButton src="/icon-search.svg" />
          </div>
        </styles.chattingHeader>
        {/* <button
          onClick={() => {
            chattingCreate();
          }}
        >
          생성
        </button> */}

        <styles.chattingSection>
          {chatRooms.map((room, index) => (
            <ChattingList
              key={index}
              name={room.roomName}
              unreadCount={room.unreadCount}
              lastMessage={room.lastMessage}
              onClick={() => {
                handleChatRoomClick();
                setSelectedRoomId(room.roomId);
                setSelectedRoomName(room.roomName);
                setSelectedRoomLastTime(room.lastMessageTime);
              }}
            />
          ))}
        </styles.chattingSection>
      </styles.container>
      {isChatRoomOpen && (
        <ChattingRoom
          userId={userId}
          userName={userName}
          roomId={selectedRoomId}
          roomName={selectedRoomName}
          lastTime={selectedRoomLastTime}
          onRoomClick={setIsChatRoomOpen}
        />
      )}
    </>
  );
}

export function FloatingChatting() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };

  return (
    <>
      <styles.chattingButton onClick={toggleChat}>
        <styles.buttonIcon src="/chatting.svg" />
      </styles.chattingButton>
      {isChatOpen && <FloatingChattingBox />}
    </>
  );
}
