import { useQuery, useMutation } from '@tanstack/react-query';

import { getUserProfileData, putUserProfileData } from './profile.api';

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
      myFeatures: Array<string | null>;
    }) => await putUserProfileData(data.address, data.myFeatures),
  });
