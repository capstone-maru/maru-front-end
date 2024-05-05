import axios from 'axios';

import { type GetSharedPostDTO, type GetSharedPostsDTO } from './shared.dto';
import {
  type CreateSharedPostProps,
  type GetSharedPostsFilter,
  type GetSharedPostsProps,
} from './shared.type';

import {
  FloorTypeValue,
  RentalTypeValue,
  RoomTypeValue,
  type SuccessBaseDTO,
} from '@/shared/types';

const filterConvertToValues = ({
  roomTypes,
  rentalTypes,
  expectedPaymentRange,
  hasLivingRoom,
  numberOfRoom,
  roomSizeRange,
  floorTypes,
  canPark,
  hasAirConditioner,
  hasRefrigerator,
  hasWasher,
  hasTerrace,
}: GetSharedPostsFilter) => {
  const result: {
    roomTypes?: number[];
    rentalTypes?: number[];
    expectedPaymentRange?: { start: number; end: number };
    hasLivingRoom?: boolean;
    numberOfRoom?: number;
    roomSizeRange?: { start: number; end: number };
    floorTypes?: number[];
    canPark?: boolean;
    hasAirConditioner?: boolean;
    hasRefrigerator?: boolean;
    hasWasher?: boolean;
    hasTerrace?: boolean;
  } = {
    expectedPaymentRange,
    hasLivingRoom,
    numberOfRoom,
    roomSizeRange,
    canPark,
    hasAirConditioner,
    hasRefrigerator,
    hasWasher,
    hasTerrace,
  };

  if (roomTypes != null) {
    result.roomTypes = Object.values(roomTypes).map(value =>
      Number(RoomTypeValue[value]),
    );
  }

  if (rentalTypes != null) {
    result.rentalTypes = Object.values(rentalTypes).map(value =>
      Number(RentalTypeValue[value]),
    );
  }

  if (floorTypes != null) {
    result.floorTypes = Object.values(floorTypes).map(value =>
      Number(FloorTypeValue[value]),
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

    if (filter != null) {
      query += `filter=${JSON.stringify(filterConvertToValues(filter))}`;
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
  await axios.get<SuccessBaseDTO>(
    `/maru-api/shared/posts/studio/${postId}/scrap`,
  );
