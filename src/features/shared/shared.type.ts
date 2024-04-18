import { type RentalType, type RoomType } from '@/shared/types';

export interface GetSharedPostsFilter {
  roomType?: RoomType[];
  rentalType?: RentalType[];
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
    rentalType: string;
    price: number;
    monthlyFee: number;
    managementFee: number;
  };
  roomDetailData: {
    roomType: string;
    size: number;
    numberOfRoom: number;
    recruitmentCapacity: number;
  };
  locationData: {
    city: string;
    oldAddress: string;
    roadAddress: string;
    stationName: string;
    stationTime: number;
    busStopTime: number;
    schoolName: string;
    schoolTime: number;
    convenienceStoreTime: number;
  };
  roomMateCardData: {
    location: string;
    features: string[];
  };
}
