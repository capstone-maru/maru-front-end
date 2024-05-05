export type CardTypeFilter = 'my' | 'mate';
export type DealTypeFilter = '전세' | '월세';
export type RoomTypeFilter = '원룸' | '빌라/투룸이상' | '아파트' | '오피스텔';
export type FloorTypeFilter = '지상' | '반지하' | '옥탑';
export type RoomCountTypeFilter = '1개' | '2개' | '3개 이상';
export type AdditionalInfoTypeFilter =
  | '주차가능'
  | '에어컨'
  | '냉장고'
  | '세탁기'
  | '베란다/테라스';

export interface SharedPostsFilter {
  cardType?: CardTypeFilter;
  roomInfo: {
    roomType?: RoomTypeFilter;
    hasLivingRoom: boolean;
    roomCount?: RoomCountTypeFilter;
    restRoomCount?: RoomCountTypeFilter;
    size?: { low: number; high: number };
    floor?: FloorTypeFilter;
  };
  dealInfo: {
    dealType?: DealTypeFilter;
    expectedFee?: { low: number; high: number };
  };
  extraInfo: Partial<Record<AdditionalInfoTypeFilter, boolean>>;
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
