import axios from 'axios';

import { type GetChatRoomDTO } from './chat.dto';

export const getChatRoom = async (roomName: string) =>
  await axios
    .get<GetChatRoomDTO>(`/maru-api/chatRoom/${roomName}`)
    .then(res => res.data);
