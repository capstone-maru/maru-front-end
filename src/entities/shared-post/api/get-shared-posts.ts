import axios from 'axios';

import { type SharedPosts } from '@/entities/shared-post';

export const getSharedPosts = async () =>
  await axios.get<SharedPosts>('/shared/posts');
