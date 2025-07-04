import { useMutation } from "@tanstack/react-query";
import {
  SaveReportService,
  CheckUniqueRequest,
  SaveReportRequest,
} from "./service";

export const useSaveReportController = () => {
  const checkUniqueMutation = useMutation({
    mutationFn: (request: CheckUniqueRequest) =>
      SaveReportService.checkUnique(request),
  });

  const saveReportMutation = useMutation({
    mutationFn: (request: SaveReportRequest) =>
      SaveReportService.saveReport(request),
  });

  return {
    checkUnique: checkUniqueMutation.mutateAsync,
    saveReport: saveReportMutation.mutateAsync,
    isCheckingUnique: checkUniqueMutation.isPending,
    isSaving: saveReportMutation.isPending,
    checkUniqueError: checkUniqueMutation.error,
    saveReportError: saveReportMutation.error,
  };
};
