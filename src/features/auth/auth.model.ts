import { type User } from '@/entities/user';

export interface Auth {
  accessToken: string;
  refreshToken: string;
  user: User;
}
