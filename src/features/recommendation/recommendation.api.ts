import axios from 'axios';

import { type GetRecommendationMateDTO } from './recommendation.dto';

import { type CardTypeFilterOptions } from '@/entities/shared-posts-filter';

export const getRecommendationMate = async (
  memberId: string,
  cardType: CardTypeFilterOptions,
) =>
  await axios.get<GetRecommendationMateDTO>(
    `http://localhost:8000/recommendation/${memberId}/${cardType}`,
  );
