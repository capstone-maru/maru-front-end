'use client';

import { Client } from '@stomp/stompjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ChattingList } from './ChattingList';
import { MobileChattingRoom } from './MobileChattingRoom';

import { useAuthValue, useUserData } from '@/features/auth';
import { type GetChatRoomDTO } from '@/features/chat';

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 390px;
    padding-bottom: 2rem;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    z-index: 20000;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: white;

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

interface Message {
  createAt: string;
  message: string;
  messageId: string;
  nickname: string;
  roomId: number;
  sender: string;
}

export function MobileChattingBox() {
  const [isChatRoomOpen, setIsChatRoomOpen] = useState<boolean>(false);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [message, setMessage] = useState<Message>();
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [selectedRoomName, setSelectedRoomName] = useState<string>('');
  const [selectedRoomLastTime, setSelectedRoomLastTime] = useState<string>('');

  const auth = useAuthValue();
  const { data } = useUserData(auth?.accessToken !== undefined);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const stomp = new Client({
          brokerURL: `${process.env.NEXT_PUBLIC_CHAT_API_URL}`,
          connectHeaders: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          debug: (str: string) => {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });
        setStompClient(stomp);
        stomp.activate();

        stomp.onConnect = () => {
          console.log('WebSocket 연결이 열렸습니다.');
          stomp.subscribe(`/roomList/${userId}`, frame => {
            try {
              const newMessage: Message = JSON.parse(frame.body);
              if (newMessage != null) setMessage(newMessage);
            } catch (error) {
              console.error('오류가 발생했습니다:', error);
            }
          });
        };
      } catch (error) {
        console.error('채팅 룸 생성 중 오류가 발생했습니다:', error);
      }
    };

    if (auth?.accessToken != null) {
      void initializeChat();
    }

    return () => {
      if (stompClient != null && stompClient.connected) {
        void stompClient.deactivate();
      }
    };
  }, [auth?.accessToken, userId]);

  useEffect(() => {
    if (data !== undefined) {
      setUserId(data.memberId);
      setUserName(data.name);
    }
  }, [data]);

  const handleChatRoomClick = () => {
    setIsChatRoomOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        if (!isChatRoomOpen) {
          try {
            const res = await axios.get<GetChatRoomDTO>('/maru-api/chatRoom');
            const chatRoomListData: ChatRoom[] = res.data.data;
            setChatRooms(chatRoomListData);
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        }
        return true;
      })();
    }, 50);
  }, [auth, isChatRoomOpen]);

  useEffect(() => {
    if (!isChatRoomOpen) {
      setChatRooms(prevChatRooms =>
        prevChatRooms.map(room => {
          if (room.roomId === message?.roomId) {
            return {
              ...room,
              unreadCount: room.unreadCount + 1,
              lastMessage: message.message,
            };
          }
          return room;
        }),
      );
    }
  }, [message, isChatRoomOpen]);

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
        <styles.chattingSection>
          {/* <button
          onClick={() => {
            chattingCreate();
          }}
        >
          생성
        </button> */}
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
        <MobileChattingRoom
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
