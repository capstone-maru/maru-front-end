import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getChatRoomList,
  getChatRoomUser,
  postChatRoom,
  postEnterChatRoom,
  postInviteUser,
} from './chat.api';

export const useChatRoomList = (token: string | undefined) =>
  useQuery({
    queryKey: [`/api/chatRoom`, token],
    queryFn: async () => await getChatRoomList(token),
    enabled: token !== undefined,
  });

export const useCreateChatRoom = (roomName: string, members: string[]) =>
  useMutation({
    mutationFn: async () => {
      await postChatRoom(roomName, members);
    },
  });

export const useInviteUsers = (roomId: number, members: string[]) =>
  useMutation({
    mutationFn: async () => {
      await postInviteUser(roomId, members);
    },
  });

export const useEnterChatRoom = (roomId: number, page: number, size: number) =>
  useMutation({
    mutationFn: async () => await postEnterChatRoom(roomId, page, size),
    onSuccess: data => data.data,
  });

export const useChatRoomUser = (roomId: number) =>
  useQuery({
    queryKey: [`/api/chatRoom/${roomId}`],
    queryFn: async () => await getChatRoomUser(roomId),
    enabled: roomId !== undefined,
  });
