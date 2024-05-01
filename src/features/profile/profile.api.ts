import axios from 'axios';

import {
  type GetUserProfileDTO,
  type GetUserCardDTO,
  type PutUserCardDTO,
  type GetFollowingListDTO,
  type PostSearchDTO,
} from './profile.dto';

export const getUserProfileData = async (memberId: string) =>
  await axios
    .get<GetUserProfileDTO>(`/maru-api/profile/${memberId}`, {
      // params: { memberId: memberId },
    })
    .then(res => res.data);

export const getUserCard = async (cardId: number) =>
  await axios
    .get<GetUserCardDTO>(`/maru-api/profile/card/${cardId}`)
    .then(res => res.data);

export const putUserCard = async (
  cardId: number,
  location: string,
  features: Array<string | undefined>,
) =>
  await axios
    .put<PutUserCardDTO>(`/maru-api/profile/${cardId}`, {
      location,
      features,
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    });

export const getFollowingListData = async () =>
  await axios
    .get<GetFollowingListDTO>(`/maru-api/profile/follow`)
    .then(res => res.data);

export const postFollowUser = async (memberId: string) => {
  await axios
    .post(`/maru-api/profile/follow`, {
      memberId: memberId,
    })
    .then(res => {
      console.log('follow');
      return res.data;
    });
};

export const postUnfollowUser = async (memberId: string) => {
  await axios
    .post(`/maru-api/profile/unfollow`, {
      memberId: memberId,
    })
    .then(res => {
      console.log('unfollow');
      return res.data;
    });
};

export const postSearchUser = async (email: string) => {
  const res = await axios.post<PostSearchDTO>(`/maru-api/profile/search`, {
    email: email,
  });

  return res.data;
};
