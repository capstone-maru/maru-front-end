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
      univCertified: boolean;
      myCardId: number;
      mateCardId: number;
    };
    profileImage: string;
    myCard: {
      id: number;
      location: string;
      myFeatures: {
        smoking: string;
        roomSharingOption: string;
        mateAge: number;
        options: string;
      };
    };
    mateCard: {
      id: number;
      location: string;
      myFeatures: {
        smoking: string;
        roomSharingOption: string;
        mateAge: number;
        options: string;
      };
    };
  };
}

export interface GetUserCardDTO extends SuccessBaseDTO {
  data: {
    id: number;
    location: string;
    myFeatures: {
      smoking: string;
      roomSharingOption: string;
      mateAge: number;
      options: string;
    };
  };
}

export interface PutUserCardDTO extends SuccessBaseDTO {
  data: {
    location: string;
    features: {
      smoking: string;
      roomSharingOption: string;
      mateAge: number;
      options: string;
    };
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
