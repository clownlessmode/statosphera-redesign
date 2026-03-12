import { useState, useEffect } from "react";
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

  const loadProducts = async (
    pageNumber: number,
    overrides?: {
      showWithoutGroups?: boolean;
      productFilters?: ProductFilter;
    },
  ) => {
    try {
      setIsLoading(true);

      const effectiveShowWithoutGroups =
        overrides?.showWithoutGroups ?? showWithoutGroups;
      const effectiveFilters = overrides?.productFilters ?? productFilters;

      const payload: ProductRequestDto = {
        filters: effectiveFilters,
        pagination: {
          limit: itemsPerPage,
          offset: pageNumber * itemsPerPage,
          filter: effectiveShowWithoutGroups,
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

  useEffect(() => {
    loadProducts(0);
  }, []);

  const refetch = (opts?: {
    showWithoutGroups?: boolean;
    productFilters?: ProductFilter;
  }) => {
    setPage(0);
    setHasMore(true);
    setIsInitialLoading(true);
    loadProducts(0, opts);
  };

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
