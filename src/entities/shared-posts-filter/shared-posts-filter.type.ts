export type CardType = 'my' | 'mate';
export type DealType = '전세' | '월세';

export interface SharedPostsFilter {
  cardType?: CardType;
  roomInfo?: string;
  dealInfo?: {
    dealType?: DealType;
    expectedFee?: { low: number; high: number };
  };
  extraInfo?: string;
}

export type SharedPostsFilterType = keyof SharedPostsFilter;

export const SharedPostsFilterTypeValue: Record<SharedPostsFilterType, string> =
  {
    cardType: '메이트 카드',
    dealInfo: '거래 정보',
    roomInfo: '방 정보',
    extraInfo: '추가 정보',
  };

export type SharedPostsType = 'hasRoom' | 'homeless';
