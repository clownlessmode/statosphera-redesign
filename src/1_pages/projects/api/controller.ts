import { ApiError } from "@shared/api/types";
import { ProjectsRequest } from "./types/requests";
import { Projects } from "./types/response";
import { ProjectsService } from "./service";
import { useInfiniteQuery } from "@tanstack/react-query";

const REVIEWS_PAGE_SIZE = 10;

export const useGetProjects = (
  params: Omit<ProjectsRequest, "pagination"> = {},
) => {
  return useInfiniteQuery<Projects[], ApiError>({
    queryKey: ["projects", params],
    queryFn: ({ pageParam }) =>
      ProjectsService.getProjects({
        ...params,
        pagination: {
          limit: REVIEWS_PAGE_SIZE,
          offset: pageParam as number,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < REVIEWS_PAGE_SIZE
        ? undefined
        : allPages.length * REVIEWS_PAGE_SIZE,
  });
};
