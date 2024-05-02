'use client';

import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ChatMenu } from './ChatMenu';
import { ReceiverMessage } from './ReceiverMessage';
import { SenderMessage } from './SenderMessage';

import { useAuthValue } from '@/features/auth';

const styles = {
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
  header: styled.div`
    width: 100%;
    height: 3.625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
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
    cursor: pointer;
  `,
  messageContainer: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    height: calc(100% - 7.5rem);
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
    position: relative;

    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ced3da;
      border-radius: 4px;
    }
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
    display: flex;
  `,
  messageInputField: styled.input`
    flex: 1;
    font-size: 1.25rem;
    padding: 0.8rem;
    border: none;
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
  backButton: styled.img`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  `,
};

interface Content {
  roomId: number;
  message: string;
  sender?: string;
}

export function ChattingRoom({
  chatRoomData,
  userId,
  roomId,
  roomName,
  lastTime,
  onRoomClick,
}: {
  chatRoomData:
    | [
        {
          messageId: string;
          sender: string;
          message: string;
          createdAt: string;
        },
      ]
    | undefined;
  userId: string | undefined;
  roomId: number;
  roomName: string;
  lastTime: string;
  onRoomClick: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [messages, setMessages] = useState<Content[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);
  const [isBackClick, setIsBackClick] = useState<boolean>(false);

  const auth = useAuthValue();
  const user = userId;

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const stomp = new Client({
          brokerURL: `ws://ec2-54-180-133-123.ap-northeast-2.compute.amazonaws.com:8080/ws`,
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
          stomp.subscribe(`/room/${roomId}`, frame => {
            try {
              const parsedMessage = JSON.parse(frame.body);
              setMessages(prevMessages => [...prevMessages, parsedMessage]);
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
      if (stompClient !== null && stompClient.connected) {
        void stompClient.deactivate();
      }
    };
  }, [auth?.accessToken]);

  const sendMessage = () => {
    if (stompClient !== null && stompClient.connected) {
      const destination = `/send/${roomId}`;

      stompClient.publish({
        destination,
        body: JSON.stringify({
          roomId: roomId,
          sender: user,
          message: inputMessage,
        }),
      });
    }

    setInputMessage('');
  };

  const handleMenuClick = () => {
    setIsMenuClick(prev => !prev);
  };

  const handleBackClick = () => {
    setIsBackClick(prev => !prev);
    onRoomClick(isBackClick);
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  }

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current != null) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chatRoomData]);

  useEffect(() => {
    if (messageContainerRef.current != null) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <styles.container>
      <styles.header>
        <styles.backButton
          onClick={handleBackClick}
          src="/backward-arrow.png"
        />
        <styles.roomInfo>
          <styles.roomName>{roomName}</styles.roomName>
          <styles.latestTime>{lastTime}</styles.latestTime>
        </styles.roomInfo>
        <styles.menu onClick={handleMenuClick} />
        {isMenuClick && (
          <ChatMenu roomId={roomId} onMenuClicked={setIsMenuClick} />
        )}
      </styles.header>
      <styles.messageContainer ref={messageContainerRef}>
        {chatRoomData
          ?.slice()
          .reverse()
          ?.map((message, index) => (
            <div key={index}>
              {message.sender === userId ? (
                <styles.senderFrame>
                  <SenderMessage message={message.message} />
                </styles.senderFrame>
              ) : (
                <styles.receiverFrame>
                  <ReceiverMessage message={message.message} />
                </styles.receiverFrame>
              )}
            </div>
          ))}
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === userId ? (
              <styles.senderFrame>
                <SenderMessage message={message.message} />
              </styles.senderFrame>
            ) : (
              <styles.receiverFrame>
                <ReceiverMessage message={message.message} />
              </styles.receiverFrame>
            )}
          </div>
        ))}
      </styles.messageContainer>
      <styles.messageInput>
        <styles.messageInputField
          type="text"
          value={inputMessage}
          onChange={e => {
            setInputMessage(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </styles.messageInput>
    </styles.container>
  );
}
