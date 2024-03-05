import type User from '@/models/user';
import axios from 'axios';

class AuthService {
  private constructor() {}

  private static baseURL = '/auth';

  static async login(): Promise<{
    success: boolean;
    data?: { user: User; token: string };
  }> {
    try {
      const response = await axios.post<{ user: User; token: string }>(
        `${this.baseURL}/login`,
      );
      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false };
      }
      return { success: false };
    }
  }

  static async logout(): Promise<{ success: boolean }> {
    try {
      await axios.post(`${this.baseURL}/logout`);
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false };
      }
      return { success: false };
    }
  }
}

export default AuthService;
