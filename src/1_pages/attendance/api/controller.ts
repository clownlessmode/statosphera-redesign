import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { CameraService } from "./service";
import type {
  CameraStatsRequest,
  CameraEventsRequest,
  CameraStatsResponse,
  CameraEventsResponse,
  CameraStoresResponse,
  CameraGraphRequest,
  CameraGraphResponses,
} from "./types";

const EVENTS_PAGE_SIZE = 10;

export const useCameraStats = (
  params: CameraStatsRequest | undefined,
  options?: Partial<UseQueryOptions<CameraStatsResponse, ApiError>>,
) => {
  return useQuery<CameraStatsResponse, ApiError>({
    queryKey: ["camera-stats", params],
    queryFn: () => {
      if (!params) {
        throw new Error("Параметры запроса не могут быть пустыми");
      }
      return CameraService.getStats(params);
    },
    enabled: !!params && options?.enabled,
    ...options,
  });
};

export const useCameraEvents = (
  params: CameraEventsRequest | undefined,
  options?: Partial<UseQueryOptions<CameraEventsResponse[], ApiError>>,
) => {
  return useQuery<CameraEventsResponse[], ApiError>({
    queryKey: ["camera-events", params],
    queryFn: () => {
      if (!params) {
        throw new Error("Параметры запроса не могут быть пустыми");
      }
      return CameraService.getEvents(params);
    },
    enabled: !!params && options?.enabled,
    ...options,
  });
};

export const useCameraEventsInfinite = (
  baseParams: Omit<CameraEventsRequest, "pagination"> | undefined,
) => {
  return useInfiniteQuery<CameraEventsResponse[], ApiError>({
    queryKey: ["camera-events-infinite", baseParams],
    queryFn: async ({ pageParam }) => {
      if (!baseParams)
        throw new Error("Параметры запроса не могут быть пустыми");
      return CameraService.getEvents({
        ...baseParams,
        pagination: { limit: EVENTS_PAGE_SIZE, offset: pageParam as number },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < EVENTS_PAGE_SIZE) return undefined;
      return allPages.flat().length;
    },
    enabled: !!baseParams,
  });
};

export const useCameraStores = () => {
  return useQuery<CameraStoresResponse, ApiError>({
    queryKey: ["camera-stores"],
    queryFn: () => CameraService.getStores(),
  });
};

export const useCameraGraph = (
  params: CameraGraphRequest | undefined,
  options?: Partial<UseQueryOptions<CameraGraphResponses, ApiError>>,
) => {
  return useQuery<CameraGraphResponses, ApiError>({
    queryKey: ["camera-graph", params],
    queryFn: () => {
      if (!params) throw new Error("Параметры запроса не могут быть пустыми");
      return CameraService.getGraph(params);
    },
    enabled: !!params && options?.enabled !== false,
    ...options,
  });
};
