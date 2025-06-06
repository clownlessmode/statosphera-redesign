import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductRequestDto, ProductResponse } from "../model/types";
import { ProductsService } from "./service";
import { ApiError } from "@shared/api/types";

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
