import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  ApiError,
  GetReportsResponse,
  PostReportResponse,
  PostReportPayload,
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

export function usePostReport(payload: PostReportPayload) {
  const { token } = useAuth();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<PostReportResponse, ApiError>({
    mutationKey: ["reports"],
    mutationFn: async () => {
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
  });
}
