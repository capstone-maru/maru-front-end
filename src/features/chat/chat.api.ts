import axios from 'axios';

import { type GetChatRoomUserDTO, type PostChatRoomDTO } from './chat.dto';

export const getChatRoomList = async () =>
  await axios.get(`/maru-api/chatRoom`).then(res => {
    console.log(res.data);
    return res.data;
  });

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
    .post(`/chatRoom/${roomId}/invite`, {
      members: members,
    })
    .then(res => res.data);
};

export const postEnterChatRoom = async (
  roomId: number,
  page: number,
  size: number,
) => {
  await axios
    .post(`/chatRoom/chat`, {
      roomId: roomId,
      page: page,
      size: size,
    })
    .then(res => res.data);
};

export const getChatRoomUser = async (roomId: number) =>
  await axios
    .get<GetChatRoomUserDTO>(`/maru-api/chatRoom/${roomId}`)
    .then(res => {
      console.log(res.data);
      return res.data;
    });
