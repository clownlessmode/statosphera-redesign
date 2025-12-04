import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { FarmersService } from "./service";
import { FarmersResponse } from "../config";

export const useFarmers = () => {
  const farmers = useQuery<FarmersResponse[], ApiError>({
    queryKey: ["farmers"],
    queryFn: async () => {
      const response = await FarmersService.getAllFarmers();
      return response;
    },
  });

  return {
    getFarmers: farmers.refetch,
    isFarmersLoading: farmers.isPending,
    farmers: farmers.data,
  };
};
