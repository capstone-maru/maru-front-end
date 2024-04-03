import { useQuery, useMutation } from '@tanstack/react-query';

import {
  getUserProfileData,
  putUserProfileData,
  getFollowingListData,
  postFollowData,
} from './profile.api';

export const useProfileData = (memberId: string) =>
  useQuery({
    queryKey: [`/api/profile/${memberId}`],
    queryFn: async () => await getUserProfileData(memberId),
    enabled: memberId !== '',
  });

export const usePutUserProfileData = () =>
  useMutation({
    mutationFn: async (data: {
      address: string;
      myFeatures: Array<string | undefined>;
    }) => await putUserProfileData(data.address, data.myFeatures),
  });

export const useFollowingListData = () =>
  useQuery({
    queryKey: [`/api/profile/follow`],
    queryFn: getFollowingListData,
  });

export const useFollowData = () =>
  useMutation({
    mutationFn: async (memberId: string) => {
      await postFollowData(memberId);
    },
  });
