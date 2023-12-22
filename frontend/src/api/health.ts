import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ApiError, GetHealthResponse } from "../types/types";
import api from "./api";

export function useGetHealth() {
  return useQuery<GetHealthResponse, ApiError>({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        const { data } = await api.get<GetHealthResponse>("/health");
        return data;
      } catch (error) {
        const e = error as AxiosError<ApiError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false,
  });
}
