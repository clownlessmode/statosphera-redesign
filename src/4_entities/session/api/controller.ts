import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { SessionService } from "./service";

export const useSessionController = () => {
  const updateSession = useQuery<void, ApiError>({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await SessionService.updateSession();
      return response;
    },
  });

  return {
    getSession: updateSession.refetch,
    isGetSessionLoading: updateSession.isPending,
    session: updateSession.data,
  };
};
