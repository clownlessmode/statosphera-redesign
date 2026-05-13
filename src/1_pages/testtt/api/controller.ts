import { ApiError } from "@shared/api/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { NightEntriesRequest } from "./types/request";
import { NightEntriesService } from "./service";
import { NightEntriesResponse, NightStoresResponse } from "./types/response";

const TESTTT_PAGE_SIZE = 10;

type UseGetNightEntriesOptions = {
  enabled?: boolean;
};

export const useGetNightEntries = (
  params: Omit<NightEntriesRequest, "pagination">,
  options?: UseGetNightEntriesOptions,
) => {
  return useInfiniteQuery<NightEntriesResponse[], ApiError>({
    queryKey: ["night-entries", params],
    queryFn: ({ pageParam }) =>
      NightEntriesService.getNightEntries({
        ...params,
        pagination: {
          limit: TESTTT_PAGE_SIZE,
          offset: pageParam as number,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < TESTTT_PAGE_SIZE
        ? undefined
        : allPages.length * TESTTT_PAGE_SIZE,
    enabled: options?.enabled ?? true,
  });
};

export const useGetNightStores = () => {
  return useQuery<NightStoresResponse[], ApiError>({
    queryKey: ["night-stores"],
    queryFn: () => NightEntriesService.getNightStores(),
  });
};
