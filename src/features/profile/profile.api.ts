import axios from 'axios';

import {
  type PostUserProfileDTO,
  type GetUserCardDTO,
  type PutUserCardDTO,
  type GetFollowingListDTO,
  type PostSearchDTO,
} from './profile.dto';

export const postUserProfile = async (memberId: string) => {
  const res = await axios.post<PostUserProfileDTO>(`/maru-api/profile`, {
    memberId,
  });

  return res.data;
};

export const getUserCard = async (cardId: number) =>
  await axios
    .get<GetUserCardDTO>(`/maru-api/profile/card/${cardId}`)
    .then(res => res.data);

export const putUserCard = async (
  cardId: number,
  location: string,
  features: {
    smoking: string;
    roomSharingOption: string;
    mateAge: number;
    options: string;
  },
) =>
  await axios
    .put<PutUserCardDTO>(`/maru-api/profile/${cardId}`, {
      location,
      features,
    })
    .then(res => res.data);

export const getFollowingListData = async () =>
  await axios
    .get<GetFollowingListDTO>(`/maru-api/profile/follow`)
    .then(res => res.data);

export const postFollowUser = async (memberId: string) => {
  await axios
    .post(`/maru-api/profile/follow`, {
      memberId,
    })
    .then(res => res.data);
};

export const postUnfollowUser = async (memberId: string) => {
  await axios
    .post(`/maru-api/profile/unfollow`, {
      memberId,
    })
    .then(res => res.data);
};

export const postSearchUser = async (email: string) => {
  const res = await axios.post<PostSearchDTO>(`/maru-api/profile/search`, {
    email,
  });

  return res.data;
};

export const postEmail = async (email: string, univName: string) => {
  const res = await axios.post(`/maru-api/profile/certificate`, {
    email: email,
    univName: univName,
  });

  return res.data;
};

export const postCertificate = async (
  email: string,
  univName: string,
  code: number,
) => {
  const res = await axios.post(`/maru-api/profile/certificate`, {
    email: email,
    univName: univName,
    code: code,
  });

  return res.data;
};
