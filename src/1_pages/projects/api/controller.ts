import { ApiError } from "@shared/api/types";
import {
  CreateForExcelRequest,
  CreateProjectRequest,
  ProjectsFilters,
} from "./types/requests";
import { CreateProjectResponse, Graph, Projects } from "./types/response";
import { ProjectsService } from "./service";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const REVIEWS_PAGE_SIZE = 10;

export const useGetProjects = (filters: ProjectsFilters = {}) => {
  return useInfiniteQuery<Projects[], ApiError>({
    queryKey: ["projects", filters],
    queryFn: ({ pageParam }) =>
      ProjectsService.getProjects({
        ...filters,
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

export const useCreateForExcel = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, CreateForExcelRequest>({
    mutationFn: (request) => ProjectsService.createForExcel(request),
    onSuccess: async () => {
      toast.success("Проекты успешно загружены");
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Произошла ошибка при загрузке проектов");
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateProjectResponse, ApiError, CreateProjectRequest>({
    mutationFn: (request) => ProjectsService.createProject(request),
    onSuccess: async () => {
      toast.success("Проект успешно создан");
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Произошла ошибка при создании проекта");
    },
  });
};

export const useGetGraph = () => {
  return useQuery<Graph[], ApiError>({
    queryKey: ["graph"],
    queryFn: () => ProjectsService.getGraph(),
  });
};
