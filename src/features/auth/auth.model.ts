import { type User } from '@/entities/user';

export interface Auth {
  refreshToken: string;
  expiresIn: number;
  user?: User;
}
