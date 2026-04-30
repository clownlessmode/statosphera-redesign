import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DemocracyService } from "./service";
import { ApiError } from "@shared/api/types";
import {
  CreateIdeaRequest,
  IdeasResponse,
  MyIdeaResponse,
  UpdateIdeaRequest,
  VoteRequest,
} from "./types";

export const useInfiniteDemocracyController = (params: { limit: number }) => {
  const getIdeas = useInfiniteQuery<IdeasResponse, ApiError>({
    queryKey: ["democracy-ideas", "list", params],
    queryFn: ({ pageParam }) =>
      DemocracyService.getIdeas(params.limit, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length * params.limit : undefined;
    },
    initialPageParam: 0,
  });

  return {
    ideas: getIdeas.data?.pages.flatMap((page) => page.items) || [],
    isIdeasLoading: getIdeas.isLoading,
    isIdeasFetchingNextPage: getIdeas.isFetchingNextPage,
    fetchNextPage: getIdeas.fetchNextPage,
    hasNextPage: getIdeas.hasNextPage,
  };
};

export const useDemocracyController = () => {
  const queryClient = useQueryClient();

  const getMyIdeas = useQuery<MyIdeaResponse, ApiError>({
    queryKey: ["democracy-idea"],
    queryFn: () => DemocracyService.getMyIdea(),
  });

  const createIdea = useMutation<void, ApiError, CreateIdeaRequest>({
    mutationFn: async (dto: CreateIdeaRequest) => {
      const response = await DemocracyService.createIdea(dto);
      queryClient.invalidateQueries({ queryKey: ["democracy-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["democracy-idea"] });
      return response;
    },
  });

  const updateIdea = useMutation<
    void,
    ApiError,
    { ideaId: number; dto: UpdateIdeaRequest }
  >({
    mutationFn: async ({ ideaId, dto }) => {
      const response = await DemocracyService.updateIdea(ideaId, dto);
      queryClient.invalidateQueries({ queryKey: ["democracy-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["democracy-idea"] });
      return response;
    },
  });

  const deleteIdea = useMutation<void, ApiError, { ideaId: number }>({
    mutationFn: async ({ ideaId }) => {
      const response = await DemocracyService.deleteIdea(ideaId);
      queryClient.invalidateQueries({ queryKey: ["democracy-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["democracy-idea"] });
      return response;
    },
  });

  const voteIdea = useMutation<
    void,
    ApiError,
    { ideaId: number; dto: VoteRequest }
  >({
    mutationFn: async ({ ideaId, dto }) => {
      const response = await DemocracyService.voteIdea(ideaId, dto);
      queryClient.invalidateQueries({ queryKey: ["democracy-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["democracy-idea"] });
      return response;
    },
  });

  return {
    myIdeas: getMyIdeas.data || [],
    isMyIdeasLoading: getMyIdeas.isLoading,
    createIdea: createIdea.mutateAsync,
    isCreateIdeaLoading: createIdea.isPending,
    voteIdea: voteIdea.mutateAsync,
    isVoteIdeaLoading: voteIdea.isPending,
    updateIdea: updateIdea.mutateAsync,
    isUpdateIdeaLoading: updateIdea.isPending,
    deleteIdea: deleteIdea.mutateAsync,
    isDeleteIdeaLoading: deleteIdea.isPending,
  };
};
