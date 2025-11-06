import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { RfmService } from "./service";
import {
  NameSegmentResponse,
  RequestDto,
  TreemapRfmOrderDeliveryResponse,
} from "../config";

export const useRfm = () => {
  const queryClient = useQueryClient();

  const nameSegment = useQuery<NameSegmentResponse[], ApiError>({
    queryKey: ["nameSegment"],
    queryFn: async () => {
      const response = await RfmService.getNameSegment();
      return response;
    },
  });

  const treemapRfmOrderDelivery = useMutation<
    TreemapRfmOrderDeliveryResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getTreemapRfmOrderDelivery(dto);
      queryClient.invalidateQueries({ queryKey: ["treemapRfmOrderDelivery"] });
      return response;
    },
  });

  return {
    getNameSegment: nameSegment.refetch,
    isNameSegmentLoading: nameSegment.isPending,
    nameSegment: nameSegment.data,
    getTreemapRfmOrderDelivery: treemapRfmOrderDelivery.mutateAsync,
    isTreemapRfmOrderDeliveryLoading: treemapRfmOrderDelivery.isPending,
  };
};
