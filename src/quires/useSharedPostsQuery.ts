import { type SharedPosts } from '@/types/shared-post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY as sharedPostQueryKey } from './useSharedPostQuery';

const fetcher = async () => await axios.get<SharedPosts>('/shared/posts');

const useSharedPostsQuery = () =>
  useQuery({ queryKey: [sharedPostQueryKey], queryFn: fetcher });

export default useSharedPostsQuery;
