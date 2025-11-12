import { http } from './http';
import type { Review, BestReview } from '../types';

export interface CreateReviewDto {
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  rating: number;
  comment: string;
}

export const reviews = {
  create: (orderId: string, data: CreateReviewDto) =>
    http.post<Review>('/repair-order-reviews', { repairOrderId: orderId, ...data }, true),
  
  getBest: () =>
    http.get<BestReview[]>('/repair-order-reviews/best-reviews'),

  findByRepairOrderId: (repairOrderId: string) =>
    http.get<Review>(`/repair-order-reviews/${repairOrderId}`, true),

  update: (reviewId: string, data: UpdateReviewDto) =>
    http.patch<Review>(`/repair-order-reviews/${reviewId}`, data, true),
};
