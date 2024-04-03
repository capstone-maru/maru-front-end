import {
  type SortObject,
  type PageableObject,
  type PostContentObject,
} from './shared.type';

import { type SuccessBaseDTO } from '@/shared/types';

export interface GetSharedPostsDTO extends SuccessBaseDTO {
  message: string;
  data: {
    content: PostContentObject[];
    pageable: PageableObject;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: SortObject;
    numberOfElements: number;
    empty: boolean;
  };
}
