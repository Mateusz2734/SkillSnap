import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  ApiError,
  GetReportsResponse,
  PostReportResponse,
  PostReportPayload,
  DeleteReportResponse
} from "../types/types";
import api from "./api";
import { useAuth } from "../hooks/useAuth";

export function useGetReports() {
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useQuery<GetReportsResponse, ApiError>({
    queryKey: ["reports"],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetReportsResponse>(
          "/admin/reports",
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

export function usePostReport() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<PostReportResponse, ApiError, PostReportPayload>({
    mutationKey: ["reports"],
    mutationFn: async (payload: PostReportPayload) => {
      try {
        const { data } = await api.post<PostReportResponse>(
          "/reports",
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}

export function useDeleteReport() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<DeleteReportResponse, ApiError, number>({
    mutationKey: ["reports"],
    mutationFn: async (reportId: number) => {
      try {
        const { data } = await api.delete<DeleteReportResponse>(
          `/admin/reports/${reportId}`,
          config
        );
        return data;
      } catch (error) {
        const e = error as AxiosError<ApiError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}

export function useUpdateStatus() {
  const { token } = useAuth();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<DeleteReportResponse, ApiError, number>({
    mutationKey: ["reports"],
    mutationFn: async (reportId: number) => {
      try {
        const { data } = await api.patch<DeleteReportResponse>(
          `/admin/reports/${reportId}`,
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