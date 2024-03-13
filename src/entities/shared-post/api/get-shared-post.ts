import axios from 'axios';

import { type SharedPost } from '@/entities/shared-post';

export const getSharedPost = async (postId: number) =>
  await axios.get<SharedPost>(`/shared/posts/${postId}`);
