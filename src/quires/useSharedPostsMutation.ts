import type SharedPost from '@/types/shared-post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY as sharedPostKey } from './useSharedPostQuery';

const fn = async (post: SharedPost) =>
  await axios.post('/shared/posts', { ...post });

const useSharedPostsMutation = (post: SharedPost) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => await fn(post),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [sharedPostKey] });
    },
  });
};

export default useSharedPostsMutation;
