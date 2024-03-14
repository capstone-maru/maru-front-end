import { useQuery } from '@tanstack/react-query';

import { getSharedPosts } from '@/entities/shared-post/api';
import { sharedPostQueryKey } from '@/shared';

export const useSharedPostsQuery = () =>
  useQuery({
    queryKey: [sharedPostQueryKey],
    queryFn: async () => await getSharedPosts(),
  });
