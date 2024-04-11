import { useQuery } from '@tanstack/react-query';

import { getRecommendationMate } from './recommendation.api';

export const useRecommendationMate = ({
  memberId,
  cardType,
  enabled,
}: {
  memberId: string;
  cardType: 'my' | 'mate';
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
