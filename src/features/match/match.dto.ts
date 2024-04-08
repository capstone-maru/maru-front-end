export interface GetRecommendationMateDTO {
  user: { userId: string; gender: string };
  recommendation: {
    userId: string;
    similarity: number;
  };
}
