import { useQuery } from "@tanstack/react-query";
import { SavedReportsService } from "./service";
import { SavedReport } from "../config";

export const useSavedReportsController = () => {
  const savedReports = useQuery<SavedReport[]>({
    queryKey: ["saved-reports"],
    queryFn: () => SavedReportsService.getSavedReports(),
  });

  return {
    saved: savedReports.data,
    isSavedReportsLoading: savedReports.isLoading,
  };
};
