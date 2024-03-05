import type User from '@/models/user';
import axios from 'axios';

const AuthService = {
  baseURL: '/auth',
  async login(): Promise<{
    success: boolean;
    data?: { user: User; token: string };
  }> {
    const response = await axios.post<{ user: User; token: string }>(
      `${this.baseURL}/login`,
    );
    if (response.status < 200 || response.status >= 300) {
      return { success: false };
    }
    return { success: true, data: response.data };
  },
  async logout(): Promise<{ success: boolean }> {
    const response = await axios.post(`${this.baseURL}/logout`);
    if (response.status < 200 || response.status >= 300) {
      return { success: false };
    }
    return { success: true };
  },
} as const;

export default AuthService;
