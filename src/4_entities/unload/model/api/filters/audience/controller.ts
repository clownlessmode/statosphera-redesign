import { ApiError } from "@shared/api/types";
import { AudienceFilterResponse } from "./types";
import { UnloadService } from "./service";
import { useQuery } from "@tanstack/react-query";

export const useFilters = () => {
  const audience = useQuery<AudienceFilterResponse, ApiError>({
    queryKey: ["audience"],
    queryFn: async () => {
      const response = await UnloadService.getAudience();
      return response;
    },
  });

  return {
    getAudience: audience.refetch,
    isAudienceLoading: audience.isPending,
    audience: audience.data,
  };
};
