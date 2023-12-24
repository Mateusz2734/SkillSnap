import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  ApiError,
  GetGeneralStatsResponse,
  GetUserStatsResponse,
} from "../types/types";
import api from "./api";
import { useAuth } from "../hooks/useAuth";

export function useGetGeneralStats() {
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useQuery<GetGeneralStatsResponse, ApiError>({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetGeneralStatsResponse>(
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

export function useGetUserStats(userID: number) {
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useQuery<GetUserStatsResponse, ApiError>({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetUserStatsResponse>(
          `/admin/stats/users/${userID}`,
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
