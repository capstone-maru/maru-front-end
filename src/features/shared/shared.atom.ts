import { atom } from 'recoil';

import {
  type SelectedExtraOptions,
  type ImageFile,
  type SelectedOptions,
} from './shared.type';

import { type NaverAddress } from '@/features/geocoding';

export const sharedPostPropState = atom<{
  postId?: number;
  title: string;
  content: string;
  images: ImageFile[];
  address?: NaverAddress;
  mateLimit: number;
  expectedMonthlyFee: number;
  houseSize: number;
  selectedExtraOptions: SelectedExtraOptions;
  selectedOptions: SelectedOptions;
}>({
  key: 'sharedPostPropState',
  default: {
    postId: undefined,
    title: '',
    content: '',
    images: [],
    address: undefined,
    mateLimit: 0,
    expectedMonthlyFee: 0,
    houseSize: 0,
    selectedExtraOptions: {},
    selectedOptions: {},
  },
});
