import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsService } from "./service";
import { ApiError } from "@shared/api/types";
import { ProductRequestDto, ProductResponse } from "../model";

export const useProduct = () => {
  const queryClient = useQueryClient();

  const products = useMutation<ProductResponse[], ApiError, ProductRequestDto>({
    mutationFn: async (dto: ProductRequestDto) => {
      const response = await ProductsService.getAllData(dto);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      return response;
    },
  });

  return {
    getProducts: products,
    isProductsLoading: products.isPending,
  };
};
