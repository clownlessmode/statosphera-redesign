import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GrillService } from "./service";
import { GraphData, GrillProductRo } from "./types/responses";
import { ApiError } from "@shared/api/types";

export const useGrillController = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<GrillProductRo[]>({
    queryKey: ["grill-products"],
    queryFn: () => GrillService.getProducts(),
  });

  const addProductIm = useMutation<any, ApiError, { idProduct: number[] }>({
    mutationFn: (payload: { idProduct: number[] }) => {
      return GrillService.addProductIm(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grill-table"] });
      queryClient.invalidateQueries({ queryKey: ["grill-products"] });
    },
  });

  const addProductLeftover = useMutation<
    any,
    ApiError,
    { id: number; payload: { count: number } }
  >({
    mutationFn: (payload: { id: number; payload: { count: number } }) => {
      console.log("Payload count", payload);
      return GrillService.addProductLeftover(payload.id, payload.payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grill-table"] });
    },
  });

  const deleteProductIm = useMutation<any, ApiError, { id: number }>({
    mutationFn: (payload: { id: number }) => {
      return GrillService.deleteProductIm(payload.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grill-table"] });
    },
  });

  const tableQuery = useQuery<any>({
    queryKey: ["grill-table"],
    queryFn: () => GrillService.getTable(),
  });

  const getStatistic = useMutation<any, ApiError, { idProduct: number[] }>({
    mutationFn: (payload: { idProduct: number[] }) => {
      return GrillService.getStatistic(payload);
    },
  });

  const getGraph = useMutation<GraphData, ApiError, { idProduct: number[] }>({
    mutationFn: (payload: { idProduct: number[] }) => {
      return GrillService.getGraph(payload);
    },
  });

  return {
    data: productsQuery.data,
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,

    addProductIm: addProductIm.mutateAsync,
    isAddProductImLoading: addProductIm.isPending,

    addProductLeftover: addProductLeftover.mutateAsync,
    isAddProductLeftoverLoading: addProductLeftover.isPending,

    deleteProductIm: deleteProductIm.mutateAsync,
    isDeleteProductImLoading: deleteProductIm.isPending,

    tableData: tableQuery.data,
    isTableLoading: tableQuery.isLoading,
    errorTable: tableQuery.error,

    getStatistic: getStatistic.mutateAsync,
    isGetStatisticLoading: getStatistic.isPending,

    getGraph: getGraph.mutateAsync,
    isGetGraphLoading: getGraph.isPending,
  };
};
