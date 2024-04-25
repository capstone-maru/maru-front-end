import { type SuccessBaseDTO } from '@/shared/types';

export interface GetChatRoomDTO extends SuccessBaseDTO {
  data: {
    id: number;
    name: string;
  };
}

export interface PostChatRoomDTO extends SuccessBaseDTO {
  data: {
    id: number;
    name: string;
  };
}

export interface GetChatRoomUserDTO extends SuccessBaseDTO {
  data: {
    memberId: string;
    nickname: string;
    profileImageUrl: string;
  };
}
