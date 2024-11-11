import { useMemo } from "react";

/**
 * Calculates the percentage of reviews for each rating category (from 1 to 5 stars),
 * the average rating, the total number of reviews, and the count of reviews for each rating.
 *
 * @param reviews - Array of review objects.
 *
 * @returns {{
 *   percentages: Record<1 | 2 | 3 | 4 | 5, number>,
 *   averageRating: number,
 *   totalReviews: number,
 *   ratingCount: Record<1 | 2 | 3 | 4 | 5, number>
 * }} - Object containing the percentage of reviews for each star rating, the average rating,
 * the total number of reviews, and the count of reviews for each rating.
 */
function calculateReviewStatistics(
  reviews: {
    id: number;
    userId: string;
    laboratoryId: number;
    reservationId: string;
    rating: number;
    title: string;
    description: string;
    reviewDate: Date;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[],
): {
  percentages: Record<1 | 2 | 3 | 4 | 5, number>;
  averageRating: number;
  totalReviews: number;
  ratingCount: Record<1 | 2 | 3 | 4 | 5, number>;
} {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      percentages: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      averageRating: 0,
      totalReviews: 0,
      ratingCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const ratingCount: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let totalRatingSum = 0;

  // Count the number of reviews for each rating and accumulate the total rating sum
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCount[review.rating as 1 | 2 | 3 | 4 | 5]++;
      totalRatingSum += review.rating;
    }
  });

  // Calculate the percentage of reviews for each rating
  const ratingPercentage: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: (ratingCount[1] / totalReviews) * 100,
    2: (ratingCount[2] / totalReviews) * 100,
    3: (ratingCount[3] / totalReviews) * 100,
    4: (ratingCount[4] / totalReviews) * 100,
    5: (ratingCount[5] / totalReviews) * 100,
  };

  // Calculate the average rating
  const averageRating = totalRatingSum / totalReviews;

  return {
    percentages: ratingPercentage,
    averageRating: parseFloat(averageRating.toFixed(2)), // rounding to 2 decimal places
    totalReviews,
    ratingCount, // Include rating count in the return
  };
}

/**
 * A hook that calculates and memoizes the review statistics to optimize performance.
 *
 * @param reviews - The array of reviews.
 *
 * @returns {{
 *   percentages: Record<1 | 2 | 3 | 4 | 5, number>,
 *   averageRating: number,
 *   totalReviews: number,
 *   ratingCount: Record<1 | 2 | 3 | 4 | 5, number>
 * }} - Memoized review statistics including percentages, average rating, total reviews,
 * and the count of reviews for each rating.
 */
export const useReviewStatistics = (
  reviews: {
    id: number;
    userId: string;
    laboratoryId: number;
    reservationId: string;
    rating: number;
    title: string;
    description: string;
    reviewDate: Date;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[],
) => {
  return useMemo(() => calculateReviewStatistics(reviews), [reviews]);
};
