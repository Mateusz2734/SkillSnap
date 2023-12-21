import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from './api';

export type HealthResponse = {
  status: string;
};

export type HealthError = {
  status: string;
};

export function useHealth() {
  return useQuery<HealthResponse, HealthError>({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        const { data } = await api.get<HealthResponse>("/health");
        return data;
      } catch (error) {
        const e = error as AxiosError<HealthError>;
        return Promise.reject(e.response?.data);
      }
    },
    throwOnError: false
  });
};
