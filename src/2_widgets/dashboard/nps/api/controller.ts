import { useQuery } from "@tanstack/react-query";
import { NpsService } from "./service";

export const useNpsController = () => {
  const summaryNps = useQuery({
    queryKey: ["nps"],
    queryFn: NpsService.getSummaryNps,
  });

  return {
    summaryNps: summaryNps.data,
    isSummaryNpsLoading: summaryNps.isLoading,
    isSummaryNpsError: summaryNps.error,
  };
};
