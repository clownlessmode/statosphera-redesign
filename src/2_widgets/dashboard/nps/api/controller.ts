import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NpsService } from "./service";
import { NpsGraphRequest, NpsGraphResponse } from "./types";
import { ApiError } from "@shared/api/types";

export const useNpsController = () => {
  const queryClient = useQueryClient();

  const summaryNps = useQuery({
    queryKey: ["nps"],
    queryFn: NpsService.getSummaryNps,
  });

  const allNps = useQuery({
    queryKey: ["nps-all"],
    queryFn: NpsService.getAllNps,
  });

  const npsGraph = useMutation<NpsGraphResponse[], ApiError, NpsGraphRequest>({
    mutationFn: async (request: NpsGraphRequest) => {
      const response = await NpsService.getNpsGraph(request);
      queryClient.invalidateQueries({
        queryKey: ["nps-graph"],
      });
      return response;
    },
  });

  return {
    summaryNps: summaryNps.data,
    isSummaryNpsLoading: summaryNps.isLoading,
    isSummaryNpsError: summaryNps.error,
    allNps: allNps.data,
    isAllNpsLoading: allNps.isLoading,
    isAllNpsError: allNps.error,
    getNpsGraph: npsGraph.mutateAsync,
    isNpsGraphLoading: npsGraph.isPending,
    npsGraphError: npsGraph.error,
  };
};
