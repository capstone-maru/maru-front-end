export interface GetRecommendationMateDTO {
  user: { userId: string; gender: string };
  recommendation: Array<{
    userId: string;
    name: string;
    similarity: number;
    cardType: 'my' | 'mate';
  }>;
}
