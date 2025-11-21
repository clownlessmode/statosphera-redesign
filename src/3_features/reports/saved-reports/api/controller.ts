import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SavedReportsService } from "./service";
import { SavedReport } from "../config";
import { toast } from "sonner";

export const useSavedReportsController = () => {
  const queryClient = useQueryClient();

  const savedReports = useQuery<SavedReport[]>({
    queryKey: ["saved-reports"],
    queryFn: () => SavedReportsService.getSavedReports(),
  });

  const deleteReport = useMutation({
    mutationFn: (id: number) => SavedReportsService.deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-reports"] });
      toast.success("Отчет успешно удален");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Ошибка при удалении отчета",
      );
    },
  });

  return {
    saved: savedReports.data,
    isSavedReportsLoading: savedReports.isLoading,
    deleteReport: deleteReport.mutateAsync,
    isDeleting: deleteReport.isPending,
  };
};
