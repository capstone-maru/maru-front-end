import axios from 'axios';

import { type SharedPost } from '@/entities/shared-post';

export const updateSharedPost = async (
  postId: number,
  sharedPost: SharedPost,
) => await axios.put(`/posts/shared/${postId}`, sharedPost);
