import { useQuery } from '@tanstack/react-query';

import { getRecommendationMate } from './recommendation.api';

export const useRecommendationMate = ({
  memberId,
  enabled,
}: {
  memberId: string;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: ['/api/match/recommendation', { memberId }],
    queryFn: async () =>
      await getRecommendationMate(memberId).then(
        response => response.data.recommendation,
      ),
    enabled,
  });
