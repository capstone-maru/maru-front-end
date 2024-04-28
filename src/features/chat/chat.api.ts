import axios from 'axios';

import {
  type PostChatRoomEnterDTO,
  type GetChatRoomDTO,
  type GetChatRoomUserDTO,
  type PostChatRoomDTO,
} from './chat.dto';

export const getChatRoomList = async (token: string | undefined) =>
  await axios
    .get<GetChatRoomDTO>(`/maru-api/chatRoom`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.data);

export const postChatRoom = async (roomName: string, members: string[]) => {
  await axios
    .post<PostChatRoomDTO>(`/maru-api/chatRoom`, {
      roomName: roomName,
      members: members,
    })
    .then(res => res.data);
};

export const postInviteUser = async (roomId: number, members: string[]) => {
  await axios
    .post(`/maru-api/chatRoom/${roomId}/invite`, {
      members: members,
    })
    .then(res => res.data);
};

export const postEnterChatRoom = async (
  roomId: number,
  page: number,
  size: number,
) => {
  const res = await axios.post<PostChatRoomEnterDTO>(
    `/maru-api/chatRoom/chat`,
    {
      roomId: roomId,
      page: page,
      size: size,
    },
  );

  return res.data;
};

export const getEnterChatRoom = async () => {
  await axios.get<PostChatRoomEnterDTO>(`/maru-api/chatRoom/chat`);
};

export const getChatRoomUser = async (roomId: number) =>
  await axios
    .get<GetChatRoomUserDTO>(`/maru-api/chatRoom/${roomId}`)
    .then(res => res.data);
