import { type SuccessBaseDTO } from '@/shared/types';

export interface GetChatRoomDTO extends SuccessBaseDTO {
  data: {
    id: number;
    name: string;
  };
}
