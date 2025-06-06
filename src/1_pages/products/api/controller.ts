import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductRequestDto, ProductResponse } from "./types";
import { ProductsService } from "./service";
import { ApiError } from "@shared/api/types";

export const useProductDashboard = (params?: ProductRequestDto) => {
  const queryClient = useQueryClient()
    // const defaultParams: Product = {
    //     limit: params?.limit || 10,
    //     offset: params?.offset || 0,
    //     filter: params?.filter || false
    //   };
    
    //   const dashboard = useQuery<ProductResponse[]>({
    //     queryKey: ["dashboard"],
    //     queryFn: () => ProductsService.getAllData(defaultParams),
    //   });
    
    //   return {
    //     dashboard: dashboard.data,
    //     isDashboardLoading: dashboard.isLoading,
    //     refetch: dashboard.refetch,
    //   };

    const products = useMutation<ProductResponse[], ApiError, ProductRequestDto>({
      mutationFn: async (dto: ProductRequestDto) => {
        const response = await ProductsService.getAllData(dto)
        queryClient.invalidateQueries({queryKey: ['products']})
        return response
      }
    })

    return {
      getProducts: products,
      isProductsLoading: products.isPending,
    }
};
