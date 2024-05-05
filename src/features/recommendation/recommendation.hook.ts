import { useQuery } from '@tanstack/react-query';

import { getRecommendationMate } from './recommendation.api';

import { type CardTypeFilter } from '@/entities/shared-posts-filter';

export const useRecommendationMate = ({
  memberId,
  cardType,
  enabled,
}: {
  memberId: string;
  cardType: CardTypeFilter;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: ['/api/match/recommendation', { memberId, cardType }],
    queryFn: async () =>
      await getRecommendationMate(memberId, cardType).then(
        response => response.data.recommendation,
      ),
    enabled,
  });
