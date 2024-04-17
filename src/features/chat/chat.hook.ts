import { useQuery } from '@tanstack/react-query';

import { getChatRoom } from './chat.api';

export const useChatRoomData = (roomName: string) =>
  useQuery({
    queryKey: [`/api/chatRoom/${roomName}`],
    queryFn: async () => await getChatRoom(roomName),
    enabled: roomName !== undefined,
  });
