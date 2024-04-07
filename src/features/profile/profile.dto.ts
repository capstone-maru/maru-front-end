export interface GetUserProfileDTO {
  message: string;
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

export interface GetUserCardDTO {
  message: string;
  data: {
    id: number;
    location: string;
    myFeatures: string[];
  };
}

export interface PutUserCardDTO {
  message: string;
  data: {
    id: number;
    location: string;
    myFeatures: string[];
  };
}

export interface GetFollowingListDTO {
  message: string;
  data: {
    followingList: string[];
  };
}

export interface PostFollowDTO {
  message: string;
  data: string;
}
