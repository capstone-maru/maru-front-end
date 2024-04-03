import axios from 'axios';

import { type GetSharedPostDTO } from './shared.dto';
import {
  type GetSharedPostsProps,
  type GetSharedPostsFilter,
} from './shared.model';

import { RentalTypeValue, RoomTypeValue } from '@/shared/types';

const filterConvertToValues = (filter: GetSharedPostsFilter) => {
  const res: Partial<Record<keyof GetSharedPostsFilter, number[]>> = {};

  if (filter.roomType !== undefined) {
    res.roomType = Object.values(filter.roomType).map(
      value => RoomTypeValue[value],
    );
  }

  if (filter.rentalType !== undefined) {
    res.rentalType = Object.values(filter.rentalType).map(
      value => RentalTypeValue[value],
    );
  }

  return res;
};

export const getSharedPosts = async ({
  filter,
  search,
}: GetSharedPostsProps) => {
  const getURI = () => {
    const baseURL = '/api/shared/posts/studio';
    let query = '';

    if (filter !== undefined) {
      query += `filter=${JSON.stringify(filterConvertToValues(filter))}`;
    }

    if (search !== undefined) {
      query += `&search=${search}`;
    }

    if (query === '') return baseURL;
    return `${baseURL}?${encodeURIComponent(baseURL)}`;
  };

  return await axios.get<GetSharedPostDTO>(getURI());
};
