import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type SharedPost } from '@/entities/shared-post';
import { updateSharedPost } from '@/entities/shared-post/api';
import { sharedPostQueryKey } from '@/shared';

export const useSharedPostMutation = (
  postId: number,
  sharedPost: SharedPost,
) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => await updateSharedPost(postId, sharedPost),
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: [sharedPostQueryKey, { postId }],
      });
    },
  });
};
