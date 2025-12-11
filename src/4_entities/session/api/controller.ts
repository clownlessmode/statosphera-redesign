import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { SessionService } from "./service";
import { Session } from "../model/types";

export const useSessionController = () => {
  const updateSession = useQuery<Session, ApiError>({
    queryKey: ["session"],
    queryFn: async (): Promise<Session> => {
      const response = await SessionService.updateSession();
      return response;
    },
  });

  return {
    getUpdatedSession: updateSession.refetch,
    isUpdatedSessionLoading: updateSession.isPending,
    updatedSession: updateSession.data,
  };
};
