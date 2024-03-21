import axios from 'axios';

export const naverLogin = async ({
  code,
  state,
}: {
  code: string;
  state: string;
}) => await axios.post('/api/oauth/login/naver', { code, state });
