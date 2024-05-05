import axios from 'axios';

import { type GetRecommendationMateDTO } from './recommendation.dto';

import { type CardTypeFilter } from '@/entities/shared-posts-filter';

export const getRecommendationMate = async (
  memberId: string,
  cardType: CardTypeFilter,
) =>
  await axios.get<GetRecommendationMateDTO>(
    `http://localhost:8000/recommendation/${memberId}/${cardType}`,
  );
