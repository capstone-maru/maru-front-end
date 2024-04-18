'use client';

import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReceiverMessage } from './ReceiverMessage';
import { SenderMessage } from './SenderMessage';

const styles = {
  container: styled.div`
    position: fixed;
    bottom: 5rem;
    left: 6.5rem;
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
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    height: calc(100% - 7.5rem);
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
    position: relative;
    overflow-y: auto;
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
};

interface Content {
  roomId: number;
  message: string;
  sender?: string;
}

export function ChattingRoom({
  userName,
  roomId,
}: {
  userName: string | undefined;
  roomId: number;
}) {
  const [messages, setMessages] = useState<Content[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const user = userName;

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const stomp = new Client({
          brokerURL: `ws://ec2-13-125-228-9.ap-northeast-2.compute.amazonaws.com:8080/ws`,
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
          stomp.subscribe(`/room/1`, frame => {
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

    void initializeChat();

    return () => {
      if (stompClient !== null && stompClient.connected) {
        void stompClient.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient !== null && stompClient.connected) {
      const destination = `/room/1`;

      stompClient.publish({
        destination,
        body: JSON.stringify({
          roomId: 1,
          sender: user,
          message: inputMessage,
        }),
      });
    }

    setInputMessage('');
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  }

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
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === userName ? (
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
