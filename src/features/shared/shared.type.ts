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
    expectedPayment: number;
  };
  roomDetailData: {
    roomType: string;
    floorType: string;
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
    city: string;
    oldAddress: string;
    roadAddress: string;
    detailAddress: string;
  };
  roomMateCardData: {
    location: string;
    features: string[];
  };
  participationMemberIds: string[];
}
