import { useMutation } from "@tanstack/react-query";
import { FeedbackService } from "./service";
import { ApiError } from "@shared/api/types";
import { FormValues } from "../types";
export enum FEEDBACK_TYPES {
  WISH = "Пожелание",
  ERROR = "Ошибка",
  OTHER = "Другое",
}
export const useFeedbackController = () => {
  const sendFeedback = useMutation<
    unknown,
    ApiError,
    FormValues & { type: FEEDBACK_TYPES }
  >({
    mutationFn: async (data: FormValues & { type: FEEDBACK_TYPES }) => {
      const response = await FeedbackService.sendFeedback(data);
      return response;
    },
  });
  return {
    isFeedbackLoading: sendFeedback.isPending,
    sendFeedback: sendFeedback.mutate,
  };
};

export default useFeedbackController;
