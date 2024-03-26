import axios from 'axios';

import { type GetUserDataDTO } from './auth.dto';

export const getUserData = async () =>
  await axios.get<GetUserDataDTO>('/api/auth/info');
