import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type GetSharedPostDTO } from '.';

import {
  RentalTypeValue,
  RoomTypeValue,
  type RentalType,
  type RoomType,
} from '@/shared/types';

interface Filter {
  roomType?: RoomType[];
  rentalType?: RentalType[];
}

interface GetSharedPostsProps {
  filter?: Filter;
  search?: string;
}

const filterConvertToValues = (filter: Filter) => {
  const res: Partial<Record<keyof Filter, number[]>> = {};

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

export const useSharedPosts = ({
  filter,
  search,
  enabled,
}: GetSharedPostsProps & { enabled: boolean }) =>
  useQuery({
    queryKey: ['/api/shared/posts/studio', { filter, search }],
    queryFn: async () => await getSharedPosts({ filter, search }),
    staleTime: 60000,
    enabled,
  });
