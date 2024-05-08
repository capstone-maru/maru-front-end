import axios from 'axios';

import {
  type GetDormitorySharedPostDTO,
  type GetDormitorySharedPostsDTO,
  type GetSharedPostDTO,
  type GetSharedPostsDTO,
} from './shared.dto';
import {
  type CreateSharedPostProps,
  type GetSharedPostsProps,
} from './shared.type';

import { type SuccessBaseDTO } from '@/shared/types';

export const getSharedPosts = async ({
  filter,
  search,
  page,
}: GetSharedPostsProps) => {
  const getURI = () => {
    const baseURL = '/maru-api/shared/posts/studio';
    let query = '';

    if (filter != null) {
      query += `filter=${JSON.stringify(filter)}`;
    }

    if (search != null) {
      query += `&search=${search}`;
    }

    query += `&page=${page}`;

    return `${baseURL}?${encodeURI(query)}`;
  };

  return await axios.get<GetSharedPostsDTO>(getURI());
};

export const createSharedPost = async (postData: CreateSharedPostProps) =>
  await axios.post<SuccessBaseDTO>(`/maru-api/shared/posts/studio`, postData);

export const getSharedPost = async (postId: number) =>
  await axios.get<GetSharedPostDTO>(`/maru-api/shared/posts/studio/${postId}`);

export const deleteSharedPost = async (postId: number) =>
  await axios.delete<SuccessBaseDTO>(`/maru-api/shared/posts/studio/${postId}`);

export const scrapPost = async (postId: number) =>
  await axios.post<SuccessBaseDTO>(
    `/maru-api/shared/posts/studio/${postId}/scrap`,
  );

export const getDormitorySharedPosts = async ({
  filter,
  search,
  page,
}: GetSharedPostsProps) => {
  const getURI = () => {
    const baseURL = '/maru-api/shared/posts/dormitory';
    let query = '';

    if (search != null) {
      query += `&search=${search}`;
    }

    query += `&page=${page}`;

    return `${baseURL}?${encodeURI(query)}`;
  };

  return await axios.get<GetDormitorySharedPostsDTO>(getURI());
};

export const getDormitorySharedPost = async (postId: number) =>
  await axios.get<GetDormitorySharedPostDTO>(
    `/maru-api/shared/posts/dormitory/${postId}`,
  );

export const deleteDormitorySharedPost = async (postId: number) =>
  await axios.delete<SuccessBaseDTO>(
    `/maru-api/shared/posts/dormitory/${postId}`,
  );

export const scrapDormitoryPost = async (postId: number) =>
  await axios.post<SuccessBaseDTO>(
    `/maru-api/shared/posts/dormitory/${postId}/scrap`,
  );
