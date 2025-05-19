import { useMutation } from "@tanstack/react-query";
import { FeedbackService } from "./service";
import { ApiError } from "@shared/api/types";
import { FormValues } from "../config";

export const useFeedbackController = () => {
  const sendFeedback = useMutation<
    unknown,
    ApiError,
    { data: FormValues; id: string }
  >({
    mutationFn: async ({ data, id }) => {
      // Деструктурируем объект параметров
      const response = await FeedbackService.sendFeedback(data, id);
      return response;
    },
  });

  return {
    isFeedbackLoading: sendFeedback.isPending,
    sendFeedback: sendFeedback.mutate,
  };
};

export default useFeedbackController;
