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
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetReportsResponse>(
          "/admin/stats/general",
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

export function usePostOffer(payload: PostReportPayload) {
  const { token } = useAuth();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useMutation<PostReportResponse, ApiError>({
    mutationKey: ["offers"],
    mutationFn: async () => {
      try {
        const { data } = await api.post<PostReportResponse>(
          "/offers",
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
