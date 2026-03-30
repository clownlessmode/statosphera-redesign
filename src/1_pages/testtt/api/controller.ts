import { ApiError } from "@shared/api/types";
import { TestttResponse, TestttStores } from "./types/response";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TestttRequest } from "./types/request";
import { TestttService } from "./service";

const TESTTT_PAGE_SIZE = 10;

type UseGetTestttOptions = {
  enabled?: boolean;
};

export const useGetTesttt = (
  params: Omit<TestttRequest, "pagination">,
  options?: UseGetTestttOptions,
) => {
  return useInfiniteQuery<TestttResponse[], ApiError>({
    queryKey: ["testtt", params],
    queryFn: ({ pageParam }) =>
      TestttService.getTesttt({
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

export const useGetTestttStores = () => {
  return useQuery<TestttStores[], ApiError>({
    queryKey: ["testtt-stores"],
    queryFn: () => TestttService.getTestttStores(),
  });
};
