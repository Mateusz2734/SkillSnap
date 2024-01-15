import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ApiError, GetUserResponse } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import api from "./api";

export function useGetUser(userId: number | undefined) {
  const { token } = useAuth();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  return useQuery<GetUserResponse, ApiError>({
    queryKey: [`user:${userId}`],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetUserResponse>(
          `/users/${userId}`,
          config
        );
        return data;
      } catch (error) {
        const e = error as AxiosError<ApiError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false,
    enabled: !!userId,
  });
}