import axios from 'axios';

import { type GetSharedPostDTO, type GetSharedPostsDTO } from './shared.dto';
import {
  type CreateSharedPostProps,
  type GetSharedPostsFilter,
  type GetSharedPostsProps,
} from './shared.type';

import {
  RentalTypeValue,
  RoomTypeValue,
  type SuccessBaseDTO,
} from '@/shared/types';

const filterConvertToValues = (filter: GetSharedPostsFilter) => {
  const result: Partial<Record<keyof GetSharedPostsFilter, number[]>> = {};

  if (filter.roomType !== undefined) {
    result.roomType = Object.values(filter.roomType).map(value =>
      Number(RoomTypeValue[value]),
    );
  }

  if (filter.rentalType !== undefined) {
    result.rentalType = Object.values(filter.rentalType).map(value =>
      Number(RentalTypeValue[value]),
    );
  }

  return result;
};

export const getSharedPosts = async ({
  filter,
  search,
  page,
}: GetSharedPostsProps) => {
  const getURI = () => {
    const baseURL = '/maru-api/shared/posts/studio';
    let query = '';

    if (filter !== undefined) {
      query += `filter=${JSON.stringify(filterConvertToValues(filter))}`;
    }

    if (search !== undefined) {
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
  await axios.get<SuccessBaseDTO>(
    `/maru-api/shared/posts/studio/${postId}/scrap`,
  );
