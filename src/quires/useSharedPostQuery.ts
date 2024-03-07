import type SharedPost from '@/types/shared-post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const QUERY_KEY = '/shared/posts';

const fn = async (postId: number) =>
  await axios.get<SharedPost>(`/shared/posts/${postId}`);

const useSharedPostQuery = (postId: number) =>
  useQuery({
    queryKey: [QUERY_KEY, { postId }],
    queryFn: async () => await fn(postId),
  });

export default useSharedPostQuery;
