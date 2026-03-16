import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DigestsService } from "./service";
import { DigestRequest } from "../types";
import { toast } from "sonner";

export const useAdminDigests = () => {
  const queryClient = useQueryClient();

  const createDigestMutation = useMutation({
    mutationFn: (data: DigestRequest) => DigestsService.createDigest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["digests"] });
      toast.success("Дайджест успешно создан");
    },
    onError: (error) => {
      console.error("Ошибка при создании дайджеста:", error);
      toast.error("Ошибка при создании дайджеста");
    },
  });

  const updateDigestMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DigestRequest> }) =>
      DigestsService.updateDigest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["digests"] });
      toast.success("Дайджест успешно обновлен");
    },
    onError: (error) => {
      console.error("Ошибка при обновлении дайджеста:", error);
      toast.error("Ошибка при обновлении дайджеста");
    },
  });

  const deleteDigestMutation = useMutation({
    mutationFn: (id: string) => DigestsService.deleteDigest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["digests"] });
      toast.success("Дайджест успешно удален");
    },
    onError: (error) => {
      console.error("Ошибка при удалении дайджеста:", error);
      toast.error("Ошибка при удалении дайджеста");
    },
  });

  return {
    createDigest: createDigestMutation.mutateAsync,
    updateDigest: updateDigestMutation.mutateAsync,
    deleteDigest: deleteDigestMutation.mutateAsync,
    isCreating: createDigestMutation.isPending,
    isUpdating: updateDigestMutation.isPending,
    isDeleting: deleteDigestMutation.isPending,
  };
};
