import type SharedPost from '@/types/shared-post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY as sharedPostKey } from './useSharedPostQuery';

const fn = async (postId: number, sharedPost: SharedPost) =>
  await axios.put(`/posts/shared/${postId}`, sharedPost);

const useSharedPostMutation = (postId: number, sharedPost: SharedPost) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => await fn(postId, sharedPost),
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: [sharedPostKey, { postId }],
      });
    },
  });
};

export default useSharedPostMutation;
