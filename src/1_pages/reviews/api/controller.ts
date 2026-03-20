import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReviewsService } from "./service";
import {
  Reviews2GISResponse,
  ReviewsAppStoreResponse,
  ReviewsGooglePlayResponse,
  ReviewsYandexResponse,
  Stores2GIS,
  YandexStores,
} from "./types/response";
import { ReviewsAppStoreRequest } from "./types";
import { ApiError } from "@shared/api/types";
import {
  ReviewsGooglePlayRequest,
  ReviewsUpdateRequest,
  ReviewsYandexRequest,
  Reviews2GISRequest,
} from "./types/request";

const REVIEWS_PAGE_SIZE = 10;

type AppStoreParams = Omit<ReviewsAppStoreRequest, "limit" | "offset">;
type GooglePlayParams = Omit<ReviewsGooglePlayRequest, "limit" | "offset">;
type YandexParams = Omit<ReviewsYandexRequest, "limit" | "offset">;
type Reviews2GISParams = Omit<Reviews2GISRequest, "limit" | "offset">;

export const useAppStoreReviews = (params: AppStoreParams) => {
  return useInfiniteQuery<ReviewsAppStoreResponse[], ApiError>({
    queryKey: ["reviews-app-store", params],
    queryFn: ({ pageParam }) =>
      ReviewsService.getReviewsAppStore({
        ...params,
        limit: REVIEWS_PAGE_SIZE,
        offset: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < REVIEWS_PAGE_SIZE
        ? undefined
        : allPages.length * REVIEWS_PAGE_SIZE,
  });
};

export const useGooglePlayReviews = (params: GooglePlayParams) => {
  return useInfiniteQuery<ReviewsGooglePlayResponse[], ApiError>({
    queryKey: ["reviews-google-play", params],
    queryFn: ({ pageParam }) =>
      ReviewsService.getReviewsGooglePlay({
        ...params,
        limit: REVIEWS_PAGE_SIZE,
        offset: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < REVIEWS_PAGE_SIZE
        ? undefined
        : allPages.length * REVIEWS_PAGE_SIZE,
  });
};

export const useYandexReviews = (params: YandexParams) => {
  return useInfiniteQuery<ReviewsYandexResponse[], ApiError>({
    queryKey: ["reviews-yandex", params],
    queryFn: ({ pageParam }) =>
      ReviewsService.getReviewsYandex({
        ...params,
        limit: REVIEWS_PAGE_SIZE,
        offset: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < REVIEWS_PAGE_SIZE
        ? undefined
        : allPages.length * REVIEWS_PAGE_SIZE,
  });
};

export const use2GISReviews = (params: Reviews2GISParams) => {
  return useInfiniteQuery<Reviews2GISResponse[], ApiError>({
    queryKey: ["reviews-2gis", params],
    queryFn: ({ pageParam }) =>
      ReviewsService.getReviews2GIS({
        ...params,
        limit: REVIEWS_PAGE_SIZE,
        offset: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < REVIEWS_PAGE_SIZE
        ? undefined
        : allPages.length * REVIEWS_PAGE_SIZE,
  });
};

export const useYandexStores = () => {
  return useQuery<YandexStores[], ApiError>({
    queryKey: ["yandex-stores"],
    queryFn: () => ReviewsService.getYandexStores(),
  });
};

export const use2GISStores = () => {
  return useQuery<Stores2GIS[], ApiError>({
    queryKey: ["2gis-stores"],
    queryFn: () => ReviewsService.get2GISStores(),
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

export const useUpdateRepliedYandex = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, ReviewsUpdateRequest>({
    mutationFn: (data: ReviewsUpdateRequest) =>
      ReviewsService.updateRepliedYandex(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews-yandex"] });
    },
  });
};

export const useUpdateReplied2GIS = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, ReviewsUpdateRequest>({
    mutationFn: (data: ReviewsUpdateRequest) =>
      ReviewsService.updateReplied2GIS(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews-2gis"] });
    },
  });
};
