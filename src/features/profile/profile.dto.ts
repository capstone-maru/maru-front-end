import { type SuccessBaseDTO } from '@/shared/types';

export interface PostUserProfileDTO extends SuccessBaseDTO {
  data: {
    authResponse: {
      memberId: string;
      email: string;
      name: string;
      birthYear: string;
      gender: string;
      phoneNumber: string;
      initialized: boolean;
      myCardId: number;
      mateCardId: number;
    };
    profileImage: string;
    myCard: {
      id: number;
      location: string;
      myFeatures: string[];
    };
    mateCard: {
      id: number;
      location: string;
      myFeatures: string[];
    };
  };
}

export interface GetUserCardDTO extends SuccessBaseDTO {
  data: {
    id: number;
    location: string;
    myFeatures: string[];
  };
}

export interface PutUserCardDTO extends SuccessBaseDTO {
  data: {
    location: string;
    features: string[];
  };
}

export interface GetFollowingListDTO extends SuccessBaseDTO {
  data: {
    followingList: Record<string, string[]>;
  };
}

export interface PostSearchDTO extends SuccessBaseDTO {
  data: {
    memberId: string;
    nickname: string;
    profileImageUrl: string;
  };
}
