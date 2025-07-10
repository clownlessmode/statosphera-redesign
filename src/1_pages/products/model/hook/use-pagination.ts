import { useState, useEffect, useRef, useCallback } from "react";
import { ProductFilter, ProductRequestDto, ProductResponse } from "../types";
import { ProductsService } from "@pages/products/api";

export const useProductInfiniteScroll = (
  itemsPerPage: number = 20,
  showWithoutGroups: boolean = false,
  productFilters: ProductFilter = {},
) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const loadProducts = async (pageNumber: number) => {
    try {
      setIsLoading(true);

      const payload: ProductRequestDto = {
        filters: productFilters,
        pagination: {
          limit: itemsPerPage,
          offset: pageNumber * itemsPerPage,
          filter: showWithoutGroups,
        },
      };

      const newProducts = await ProductsService.getAllData(payload);

      if (newProducts.length < itemsPerPage) {
        setHasMore(false);
      }

      if (pageNumber === 0) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
    } catch (error) {
      console.error("Ошибка загрузки продуктов:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  const refetch = useCallback(() => {
    setPage(0);
    setHasMore(true);
    setIsInitialLoading(true);
    loadProducts(0);
  }, [productFilters, showWithoutGroups, itemsPerPage]);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      loadProducts(0);
    }
  }, []);

  // Объединяем логику обработки изменений showWithoutGroups и productFilters
  const prevStateRef = useRef<{
    showWithoutGroups: boolean;
    productFilters: ProductFilter;
  } | null>(null);

  useEffect(() => {
    if (!isFirstLoad) {
      const prevState = prevStateRef.current;
      const currentState = { showWithoutGroups, productFilters };

      const shouldRefetch =
        !prevState ||
        prevState.showWithoutGroups !== showWithoutGroups ||
        JSON.stringify(prevState.productFilters) !==
          JSON.stringify(productFilters);

      if (shouldRefetch) {
        setPage(0);
        setHasMore(true);
        loadProducts(0);
      }

      prevStateRef.current = currentState;
    }
  }, [showWithoutGroups, productFilters]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage);
    }
  };

  return {
    products,
    loadMore,
    isLoading,
    hasMore,
    refetch,
    isInitialLoading,
  };
};
