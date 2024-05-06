import { type FloorType, type RentalType, type RoomType } from '@/shared/types';

export interface GetSharedPostsFilter {
  roomTypes?: RoomType[];
  rentalTypes?: RentalType[];
  expectedPaymentRange?: { start: number; end: number };
  hasLivingRoom?: boolean;
  numberOfRoom?: number;
  roomSizeRange?: { start: number; end: number };
  floorTypes?: FloorType[];
  canPark?: boolean;
  hasAirConditioner?: boolean;
  hasRefrigerator?: boolean;
  hasWasher?: boolean;
  hasTerrace?: boolean;
}

export interface GetSharedPostsProps {
  filter?: GetSharedPostsFilter;
  search?: string;
  page: number;
}

export interface SelectedOptions {
  budget?: string;
  roomType?: string;
  livingRoom?: string;
  roomCount?: string;
  restRoomCount?: string;
  floorType?: string;
}

export type SelectedExtraOptions = Record<string, boolean>;

export interface ImageFile {
  url: string;
  file: File;
  extension: string;
}

export interface CreateSharedPostProps {
  imageFilesData: Array<{
    fileName: string;
    isThumbNail: boolean;
    order: number;
  }>;
  postData: {
    title: string;
    content: string;
  };
  transactionData: {
    rentalType: number;
    expectedPayment: number;
  };
  roomDetailData: {
    roomType: number;
    floorType: number;
    size: number;
    numberOfRoom: number;
    numberOfBathRoom: number;
    hasLivingRoom: boolean;
    recruitmentCapacity: number;
    extraOption: {
      canPark: boolean;
      hasAirConditioner: boolean;
      hasRefrigerator: boolean;
      hasWasher: boolean;
      hasTerrace: boolean;
    };
  };
  locationData: {
    oldAddress: string;
    roadAddress: string;
  };
  roomMateCardData: {
    location: string;
    features: {
      smoking: string;
      roomSharingOption: string;
      mateAge: number | null; // 0 ~ 10: +- 범위 값, null: 상관 없어요.
      options: string;
    };
  };
  participationMemberIds: string[];
}
