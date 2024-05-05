import { useMemo } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { sharedPostsFilterState } from './shared-posts-filter.atom';
import { type SharedPostsFilter } from './shared-posts-filter.type';

import { type FloorType, type RentalType, type RoomType } from '@/shared/types';

export const useSharedPostsFilter = () => {
  const [filter, setFilter] = useRecoilState<SharedPostsFilter>(
    sharedPostsFilterState,
  );

  const reset = useResetRecoilState(sharedPostsFilterState);

  const derivedFilter = useMemo<{
    roomTypes?: RoomType[];
    rentalTypes?: RentalType[];
    expectedPaymentRange?: { start: number; end: number };
    hasLivingRoom?: boolean;
    numberOfRoom?: number;
    numberOfRestRoom?: number;
    roomSizeRange?: { start: number; end: number };
    floorTypes?: FloorType[];
    canPark?: boolean;
    hasAirConditioner?: boolean;
    hasRefrigerator?: boolean;
    hasWasher?: boolean;
    hasTerrace?: boolean;
  }>(() => {
    let numberOfRoom: number | undefined;
    if (filter.roomInfo.roomCount === '1개') numberOfRoom = 1;
    else if (filter.roomInfo.roomCount === '2개') numberOfRoom = 2;
    else if (filter.roomInfo.roomCount === '3개 이상') numberOfRoom = 3;

    let numberOfRestRoom: number | undefined;
    if (filter.roomInfo.restRoomCount === '1개') numberOfRestRoom = 1;
    else if (filter.roomInfo.restRoomCount === '2개') numberOfRestRoom = 2;
    else if (filter.roomInfo.restRoomCount === '3개 이상') numberOfRestRoom = 3;

    return {
      roomTypes: [], // TODO: 다중 선택으로 수정 필요.
      rentalTypes: [], // TODO: 다중 선택으로 수정 필요.
      expectedPaymentRange:
        filter.dealInfo?.expectedFee != null
          ? {
              start: filter.dealInfo.expectedFee.low,
              end: filter.dealInfo.expectedFee.high,
            }
          : undefined,
      hasLivingRoom: filter.roomInfo.hasLivingRoom,
      numberOfRoom,
      numberOfRestRoom,
      roomSizeRange:
        filter.roomInfo.size != null
          ? {
              start: filter.roomInfo.size.low,
              end: filter.roomInfo.size.high,
            }
          : undefined,
      floorTypes: [], // TODO: 다중 선택으로 수정 필요.
      canPark: filter.extraInfo.주차가능,
      hasAirConditioner: filter.extraInfo.에어컨,
      hasRefrigerator: filter.extraInfo.냉장고,
      hasWasher: filter.extraInfo.세탁기,
      hasTerrace: filter.extraInfo['베란다/테라스'],
    };
  }, [filter]);

  return useMemo(
    () => ({
      filter,
      derivedFilter,
      setFilter,
      reset,
    }),
    [filter, derivedFilter, setFilter, reset],
  );
};
