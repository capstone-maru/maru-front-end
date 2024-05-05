export type RoomType = 'ONE_ROOM' | 'TWO_ROOM_VILLA' | 'APT' | 'OFFICE_TEL';

export const RoomTypeValue: Record<RoomType, number> = {
  ONE_ROOM: 0,
  TWO_ROOM_VILLA: 1,
  APT: 2,
  OFFICE_TEL: 3,
};
