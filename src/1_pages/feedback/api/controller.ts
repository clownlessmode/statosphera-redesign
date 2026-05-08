import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FeedbackAllResponse, FeedbackMyResponse } from "./types/response";
import { ApiError } from "@shared/api/types";
import { FeedbackService } from "./service";
import { UpdateFeedbackStatusRequest } from "./types/requests";
import { toast } from "sonner";

export const useGetFeedbackMy = () => {
  return useQuery<FeedbackMyResponse[], ApiError>({
    queryKey: ["feedback-my"],
    queryFn: async () => {
      const response = await FeedbackService.getFeedbackMy();
      return response;
    },
  });
};

export const useGetFeedbackAll = (enabled = true) => {
  return useQuery<FeedbackAllResponse[], ApiError>({
    queryKey: ["feedback-all"],
    queryFn: async () => {
      const response = await FeedbackService.getFeedbackAll();
      return response;
    },
    enabled,
  });
};

export const useUpdateFeedbackStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, UpdateFeedbackStatusRequest>({
    mutationFn: (request) => FeedbackService.updateFeedbackStatus(request),
    onSuccess: async () => {
      toast.success("Статус обратной связи обновлен");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["feedback-all"] }),
        queryClient.invalidateQueries({ queryKey: ["feedback-my"] }),
      ]);
    },
    onError: () => {
      toast.error("Не удалось обновить статус");
    },
  });
};
