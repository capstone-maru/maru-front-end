import axios from 'axios';

import { type FromAddrToCoordDTO } from '@/features/geocoding/geocoding.type';

export const fromAddrToCoord = async ({ query }: { query: string }) =>
  await axios.get<FromAddrToCoordDTO>(`/naveropenapi/geocode?query=${query}`, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET,
    },
  });
