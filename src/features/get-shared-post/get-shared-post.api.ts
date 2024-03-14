import { useQuery } from '@tanstack/react-query';

import { getSharedPost } from '@/entities/shared-post/api';
import { sharedPostQueryKey } from '@/shared';

export const useSharedPostQuery = (postId: number) =>
  useQuery({
    queryKey: [sharedPostQueryKey, { postId }],
    queryFn: async () => await getSharedPost(postId),
  });
