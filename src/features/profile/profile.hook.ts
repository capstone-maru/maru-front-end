import { useQuery, useMutation } from '@tanstack/react-query';

import {
  getUserCard,
  getFollowingListData,
  putUserCard,
  postSearchUser,
  postUnfollowUser,
  postFollowUser,
  postUserProfile,
} from './profile.api';

export const useUserProfile = (memberId: string) =>
  useMutation({
    mutationFn: async () => await postUserProfile(memberId),
    onSuccess: data => data.data,
    onError: error => error,
  });

export const useUserCard = (cardId: number) =>
  useQuery({
    queryKey: [`/api/profile/card/${cardId}`],
    queryFn: async () => await getUserCard(cardId),
    enabled: cardId !== undefined,
  });

export const usePutUserCard = (cardId: number) =>
  useMutation({
    mutationFn: async (data: {
      location: string;
      features: {
        smoking: string;
        roomSharingOption: string;
        mateAge: number;
        options: string;
      };
    }) => await putUserCard(cardId, data.location, data.features),
  });

export const useFollowingListData = () =>
  useQuery({
    queryKey: [`/api/profile/follow`],
    queryFn: getFollowingListData,
  });

export const useFollowUser = (memberId: string) =>
  useMutation({
    mutationFn: async () => {
      await postFollowUser(memberId);
    },
  });

export const useUnfollowUser = (memberId: string) =>
  useMutation({
    mutationFn: async () => {
      await postUnfollowUser(memberId);
    },
  });

export const useSearchUser = (email: string) =>
  useMutation({
    mutationFn: async () => await postSearchUser(email),
    onSuccess: data => data.data,
  });
