import { type User } from '@/entities/user';

export interface GetUserDataDTO {
  user: User;
  initialized: boolean;
}
