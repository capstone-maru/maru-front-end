export interface GetUserProfileDTO {
  message: string;
  data: {
    memberCard: {
      myFeatures: string[];
    };
    authResponse: {
      memberId: string;
      email: string;
      name: string;
      birthYear: string;
      gender: string;
      phoneNumber: string;
      initialized: boolean;
    };
  };
}

export interface PutUserProfileDTO {
  message: string;
  data: {
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
