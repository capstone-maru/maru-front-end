import {
  type RentalType,
  type RoomType,
  type SuccessBaseDTO,
} from '@/shared/types';

export interface GetSharedPostsDTO extends SuccessBaseDTO {
  message: string;
  data: {
    content: Array<{
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
          stationName: string;
          stationTime: number;
          busStopTime: number;
          schoolName: string;
          schoolTime: number;
          convenienceStortTime: number;
        };
        roomType: RoomType;
        size: number;
        numberOfRoom: number;
        rentalType: RentalType;
        price: number;
        managementFee: number;
        expectedPayment: number;
        monthlyFee: number;
      };
      isScrapped: boolean;
      createdAt: Date;
      createdBy: string;
      modifiedAt: Date;
      modifiedBy: string;
    }>;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
}

export interface GetSharedPostDTO extends SuccessBaseDTO {
  id: number;
  title: string;
  content: string;
  publisherGender: string;
  roomImages: Set<{
    fileName: string;
    isThumbnail: boolean;
    order: number;
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  }>;
  publisherAccount: {
    memberId: string;
    email: string;
    nickname: string;
    birthYear: string;
    gender: string;
    phoneNumber: string;
    myCard: {
      myFeatures: string[];
    };
    mateCard: {
      myFeatures: string[];
    };
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
      stationName: string;
      stationTime: number;
      busStopTime: number;
      schoolName: string;
      schoolTime: number;
      convenienceStortTime: number;
    };
    roomType: RoomType;
    size: number;
    numberOfRoom: number;
    rentalType: RentalType;
    price: number;
    monthlyFee: number;
    managementFee: number;
    expectedPayment: number;
    recruitmentCapacity: number;
  };
  createdAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}
