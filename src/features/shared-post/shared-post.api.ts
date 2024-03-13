import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type SharedPost } from '@/entities/shared-post';
import {
  getSharedPost,
  getSharedPosts,
  updateSharedPost,
} from '@/entities/shared-post/api';

const QUERY_KEY = '/shared/posts';

export const useSharedPostMutation = (
  postId: number,
  sharedPost: SharedPost,
) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => await updateSharedPost(postId, sharedPost),
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: [QUERY_KEY, { postId }],
      });
    },
  });
};

export const useSharedPostQuery = (postId: number) =>
  useQuery({
    queryKey: [QUERY_KEY, { postId }],
    queryFn: async () => await getSharedPost(postId),
  });

export const useSharedPostsQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getSharedPosts(),
  });
