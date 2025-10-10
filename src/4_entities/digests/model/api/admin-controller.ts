import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DigestsService } from "./service";
import { CreateDigestRequest } from "../types";
import { toast } from "sonner";

export const useAdminDigests = () => {
  const queryClient = useQueryClient();

  const createDigestMutation = useMutation({
    mutationFn: (data: CreateDigestRequest) =>
      DigestsService.createDigest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["digests"] });
      toast.success("Дайджест успешно создан");
    },
    onError: (error) => {
      console.error("Ошибка при создании дайджеста:", error);
      toast.error("Ошибка при создании дайджеста");
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
    deleteDigest: deleteDigestMutation.mutateAsync,
    isCreating: createDigestMutation.isPending,
    isDeleting: deleteDigestMutation.isPending,
  };
};
