import apiClient from "../services/api-client";

export const swrGlobalConfig = {
  refreshInterval: 3000,
  fetcher: async (url: string) => {
    const response = await apiClient.get(url);
    return response;
  },
  shouldRetryOnError: false,
  errorRetryCount: 3,
};
