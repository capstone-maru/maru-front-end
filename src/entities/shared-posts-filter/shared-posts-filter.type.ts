export type CardTypeFilterOptions = 'my' | 'mate';
export type DealTypeFilterOptions = '전세' | '월세';
export type RoomTypeFilterOptions =
  | '원룸'
  | '빌라/투룸이상'
  | '아파트'
  | '오피스텔';
export type FloorTypeFilterOptions = '지상' | '반지하' | '옥탑';
export type RoomCountTypeFilterOptions = '1개' | '2개' | '3개 이상';
export type AdditionalInfoTypeFilterOptions =
  | '주차가능'
  | '에어컨'
  | '냉장고'
  | '세탁기'
  | '베란다/테라스';

export interface SharedPostsFilter {
  cardType?: CardTypeFilterOptions;
  roomInfo: {
    roomType?: Partial<Record<RoomTypeFilterOptions, boolean>>;
    hasLivingRoom: boolean;
    roomCount?: RoomCountTypeFilterOptions;
    restRoomCount?: RoomCountTypeFilterOptions;
    size?: { low: number; high: number };
    floor?: Partial<Record<FloorTypeFilterOptions, boolean>>;
  };
  dealInfo: {
    dealType?: Partial<Record<DealTypeFilterOptions, boolean>>;
    expectedFee?: { low: number; high: number };
  };
  extraInfo: Partial<Record<AdditionalInfoTypeFilterOptions, boolean>>;
}

export type SharedPostsFilterType = keyof SharedPostsFilter;

export const SharedPostsFilterTypeValue: Record<SharedPostsFilterType, string> =
  {
    cardType: '메이트 카드',
    dealInfo: '거래 정보',
    roomInfo: '방 정보',
    extraInfo: '추가 정보',
  };

export type SharedPostsType = 'hasRoom' | 'homeless' | 'dormitory';
