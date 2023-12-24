import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  ApiError,
  GetReviewsResponse,
  PostReviewResponse,
  PostReviewPayload,
  DeleteReviewResponse,
} from "../types/types";
import api from "./api";
import { useAuth } from "../hooks/useAuth";

export function useGetReviews() {
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useQuery<GetReviewsResponse, ApiError>({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetReviewsResponse>("/reviews", config);
        return data;
      } catch (error) {
        const e = error as AxiosError<ApiError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false,
  });
}

export function usePostReview(payload: PostReviewPayload) {
  const { token } = useAuth();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<PostReviewResponse, ApiError>({
    mutationKey: ["reviews"],
    mutationFn: async () => {
      try {
        const { data } = await api.post<PostReviewResponse>(
          "/reviews",
          payload,
          config
        );
        return data;
      } catch (error) {
        const e = error as AxiosError<ApiError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false,
  });
}

export function useDeleteReview(reviewId: number) {
  const { token } = useAuth();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<DeleteReviewResponse, ApiError>({
    mutationKey: ["reviews"],
    mutationFn: async () => {
      try {
        const { data } = await api.delete<DeleteReviewResponse>(
          `/reviews/${reviewId}`,
          config
        );
        return data;
      } catch (error) {
        const e = error as AxiosError<ApiError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false,
  });
}
