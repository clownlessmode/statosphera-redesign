import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { UnloadService } from "./service";
import { RequestDto, AudienceResponse } from "../config";

export const useUnload = () => {
  const queryClient = useQueryClient();

  const audience = useMutation<AudienceResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await UnloadService.getAudience(dto);
      queryClient.invalidateQueries({ queryKey: ["audience"] });
      return response;
    },
  });

  return {
    getAudience: audience.mutateAsync,
    isAudienceLoading: audience.isPending,
  };
};
