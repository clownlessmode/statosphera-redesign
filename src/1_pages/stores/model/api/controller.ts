import { useQuery } from "@tanstack/react-query";
import { StoresService } from "./service";
import { Store } from "@entities/store/config";
import { StoreFilters } from "../types";
import { ApiError } from "@shared/api/types";

export const useStoresController = (id?: number, filters?: StoreFilters) => {
  const stores = useQuery({
    queryKey: ["stores", filters],
    queryFn: () => StoresService.getStores(filters as StoreFilters),
    enabled: !!filters,
  });
  const store = useQuery<Store, ApiError, Store, [string, number]>({
    queryKey: ["store", id as number],
    queryFn: () => StoresService.getStore(id as number),
    enabled: !!id,
  });
  const map = useQuery({
    queryKey: ["stores-map"],
    queryFn: StoresService.getMap,
  });
  return {
    map: map.data,
    isMapLoading: map.isLoading,
    stores: stores.data,
    isStoresLoading: stores.isLoading,
    store: store.data,
    isStoreLoading: store.isLoading,
  };
};
