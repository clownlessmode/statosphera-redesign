import { useMutation } from "@tanstack/react-query";
import {
  SaveUnloadService,
  CheckUniqueRequest,
  SaveUnloadRequest,
} from "./service";

export const useSaveUnloadController = () => {
  const checkUniqueMutation = useMutation({
    mutationFn: (request: CheckUniqueRequest) =>
      SaveUnloadService.checkUnique(request),
  });

  const saveUnloadMutation = useMutation({
    mutationFn: (request: SaveUnloadRequest) =>
      SaveUnloadService.saveUnload(request),
  });

  return {
    checkUnique: checkUniqueMutation.mutateAsync,
    isCheckingUnique: checkUniqueMutation.isPending,
    saveUnload: saveUnloadMutation.mutateAsync,
    isSaving: saveUnloadMutation.isPending,
    checkUniqueError: checkUniqueMutation.error,
    saveUnloadError: saveUnloadMutation.error,
  };
};
