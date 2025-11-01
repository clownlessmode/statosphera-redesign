import { useQuery } from "@tanstack/react-query";
import { MonitoringService } from "./service";
import { ShopProductsResponse } from "../config/types";
import { ApiError } from "@shared/api/types";

export const useMonitoringController = (search: string) => {
  const getProducts = useQuery<ShopProductsResponse[], ApiError>({
    queryKey: ["monitoring-products", search],
    queryFn: () => MonitoringService.getProducts(search),
    enabled: !!search,
  });

  return {
    products: getProducts.data,
    isProductsLoading: getProducts.isLoading,
  };
};
