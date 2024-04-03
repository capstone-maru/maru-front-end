import axios from 'axios';

import { type GetUserProfileDTO, type PutUserProfileDTO } from './profile.dto';

export const getUserProfileData = async (memberId: string) =>
  await axios
    .get<GetUserProfileDTO>(`/api/profile/${memberId}`)
    .then(res => res.data);

export const putUserProfileData = async (
  address: string,
  myFeatures: Array<string | undefined>,
) =>
  await axios
    .put<PutUserProfileDTO>(`/api/profile`, {
      address: address,
      myFeatures: myFeatures,
    })
    .then(res => res.data);
