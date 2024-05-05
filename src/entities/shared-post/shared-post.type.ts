import { type RentalType, type RoomType } from '@/shared/types';

export interface SharedPostListItem {
  id: number;
  title: string;
  content: string;
  thumbnail: {
    fileName: string;
    isThumbnail: boolean;
    order: number;
  };
  publisherAccount: {
    memberId: string;
    email: string;
    nickname: string;
    birthYear: string;
    gender: string;
    phoneNumber: string;
    profileImageFileName: string;
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  };
  roomInfo: {
    id: number;
    address: {
      oldAddress: string;
      roadAddress: string;
    };
    roomType: string;
    floorType: string;
    size: number;
    numberOfRoom: number;
    numberOfBathRoom: number;
    rentalType: string;
    expectedPayment: number;
  };
  isScrapped: boolean;
  createdAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}

export interface SharedPost {
  id: number;
  title: string;
  content: string;
  roomMateFeatures: string[];
  participants: Array<{ memberId: string; profileImage: string }>;
  roomImages: Set<{
    fileName: string;
    isThumbnail: boolean;
    order: number;
  }>;
  publisherAccount: {
    memberId: string;
    email: string;
    nickname: string;
    birthYear: string;
    gender: string;
    phoneNumber: string;
    myCardFeatures: string[];
    mateCardFeatures: string[];
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  };
  roomInfo: {
    id: number;
    address: {
      city: string;
      oldAddress: string;
      roadAddress: string;
      detailAddress?: string;
    };
    roomType: RoomType;
    floorType: string;
    size: number;
    numberOfRoom: number;
    numberOfBathRoom: number;
    hasLivingRoom: boolean;
    recruitmentCapacity: number;
    rentalType: RentalType;
    expectedPayment: number;
    extraOption: {
      canPark: boolean;
      hasAirConditioner: boolean;
      hasRefrigerator: boolean;
      hasWasher: boolean;
      hasTerrace: boolean;
    };
  };
  isScrapped: boolean;
  scrapCount: number;
  viewCount: number;
  createdAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}
