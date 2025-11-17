import { ApiError } from "@shared/api/types";
import { UnloadService } from "./service";
import { RequestDto, AudienceResponse } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export const useUnload = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const audience = useMutation<AudienceResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const newController = new AbortController();
      abortControllerRef.current = newController;
      const response = await UnloadService.getAudience(
        dto,
        newController.signal,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audience"] });
    },
    onSettled: () => {
      abortControllerRef.current = null;
    },
  });

  return {
    getAudience: audience.mutateAsync,
    isAudienceLoading: audience.isPending,
  };
};
