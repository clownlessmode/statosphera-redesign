import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReviewsService } from "./service";
import {
  ReviewsAppStoreResponse,
  ReviewsGooglePlayResponse,
} from "./types/response";
import { ReviewsAppStoreRequest } from "./types";
import { ApiError } from "@shared/api/types";
import {
  ReviewsGooglePlayRequest,
  ReviewsUpdateRequest,
} from "./types/request";

export const useAppStoreReviews = (params: ReviewsAppStoreRequest) => {
  return useQuery<ReviewsAppStoreResponse[], ApiError>({
    queryKey: ["reviews-app-store", params],
    queryFn: () => ReviewsService.getReviewsAppStore(params),
  });
};

export const useGooglePlayReviews = (params: ReviewsGooglePlayRequest) => {
  return useQuery<ReviewsGooglePlayResponse[], ApiError>({
    queryKey: ["reviews-google-play", params],
    queryFn: () => ReviewsService.getReviewsGooglePlay(params),
  });
};

export const useUpdateRepliedGooglePlay = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, ReviewsUpdateRequest>({
    mutationFn: (data: ReviewsUpdateRequest) =>
      ReviewsService.updateRepliedGooglePlay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews-google-play"] });
    },
  });
};

export const useUpdateRepliedAppStore = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, ReviewsUpdateRequest>({
    mutationFn: (data: ReviewsUpdateRequest) =>
      ReviewsService.updateRepliedAppStore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews-app-store"] });
    },
  });
};
