import { useRef, useEffect, useState } from "react";
import { Header } from "@widgets/header";
import { ProductCardSkeleton } from "./product-skeleton";
import ProductCard from "@entities/product/product-card";
import { ProductResponse } from "../model/types";
import { EditProduct } from "@features/products/edit-products";
import { extractProductLabels } from "../utils/labels";
import { Button } from "@shared/ui/button";
import { FilterModal } from "./filter-modal";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useProductInfiniteScroll } from "../model/hook";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const Products = () => {
  const [showWithoutGroups, setShowWithoutGroups] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "new">("all");

  const { getApiPayload } = useFiltersStore();

  const [appliedFilters, setAppliedFilters] = useState({});
  const { products, loadMore, isLoading, hasMore, isInitialLoading } =
    useProductInfiniteScroll(20, showWithoutGroups, appliedFilters as any);

  // Автоматически обновляем фильтры при изменении состояния в store
  useEffect(() => {
    const currentPayload = getApiPayload();
    setAppliedFilters(currentPayload.filters.product);
  }, [getApiPayload]);

  const handleApplyFilters = () => {
    const currentPayload = getApiPayload();
    setAppliedFilters(currentPayload.filters.product);
  };

  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>(null);
  const [productLabels, setProductLabels] = useState<ReturnType<
    typeof extractProductLabels
  > | null>(null);

  const handleProductClick = (product: ProductResponse) => {
    const labels = extractProductLabels(product);
    setProductLabels(labels);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setProductLabels(null);
  };

  const handleAllProductsClick = () => {
    setActiveFilter("all");
    setShowWithoutGroups(true);
    // Обновляем фильтры при переключении, чтобы они корректно применялись
    const currentPayload = getApiPayload();
    setAppliedFilters(currentPayload.filters.product);
  };

  const handleNewProductsClick = () => {
    setActiveFilter("new");
    setShowWithoutGroups(false);
    // Обновляем фильтры при переключении, чтобы они корректно применялись
    const currentPayload = getApiPayload();
    setAppliedFilters(currentPayload.filters.product);
  };

  const productToFormValues = (product: ProductResponse) => {
    return {
      idProduct: product.idProduct,
      groupFranchise: product.idGroupsFranchise,
      ppProducts: product.ppProducts,
      isImProducts: product.isIm,
      subDivisionProducts: product.idSubdivisionProducts,
      subGroups: product.idSubGroups,
      subSubGroups: product.idSubSubGroups,
      typeProducts: product.idTypeProducts,
      teamProducts: product.idTeamProducts,
      directionProducts: product.idDirectionProducts,
      groupsEconomist: product.idGroupsEconomist,
      idGroupMain: product.idGroupsMain,
      seasonalityProducts: product.idSeasonalityProducts,
      managerAuto: product.idManagerAuto,
    };
  };

  const observerTarget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore]);

  const isMobile = useIsMobile();

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Справочник номенклатуры"
        actions={{
          left: !isMobile && (
            <div className="flex flex-row gap-4 ml-8">
              <FilterModal onApplyFilters={handleApplyFilters} />
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={handleAllProductsClick}
              >
                Новая номенклатура
              </Button>
              <Button
                variant={activeFilter === "new" ? "default" : "outline"}
                onClick={handleNewProductsClick}
              >
                Вся номенклатура
              </Button>
            </div>
          ),
        }}
      />
      <div className="rounded-3xl px-4 py-4 h-full bg-background overflow-y-auto">
        {isMobile && (
          <div className="flex flex-row w-full mb-4 justify-between">
            <FilterModal onApplyFilters={handleApplyFilters} />
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={handleAllProductsClick}
            >
              Новая<span className="max-sm:hidden">номенклатура</span>
            </Button>
            <Button
              variant={activeFilter === "new" ? "default" : "outline"}
              onClick={handleNewProductsClick}
            >
              Вся номенклатура
            </Button>
          </div>
        )}
        {isInitialLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-3 gap-4">
            {[...Array(20)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg font-medium">
                По этим фильтрам номенклатура отсутствует
              </p>
              <p className="text-sm">
                Попробуйте изменить параметры фильтрации
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setShowWithoutGroups(true);
                setActiveFilter("all");
                setAppliedFilters({});
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 max-md:gap-2">
              {products.map((product, index) => (
                <div
                  key={`${product.idProduct[0]}-${index}`}
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                >
                  <ProductCard
                    cover={product.path}
                    id={product.idProduct[0]}
                    title={product.productName}
                    productCode={product.productCode}
                    subGroup={product.subGroups}
                    article={product.article}
                    pp={product.ppProducts}
                    isIm={product.isIm}
                  />
                </div>
              ))}
            </div>

            {isLoading && !isInitialLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {[...Array(3)].map((_, i) => (
                  <ProductCardSkeleton key={`loading-${i}`} />
                ))}
              </div>
            )}

            {hasMore && !isLoading && (
              <div ref={observerTarget} className="h-20" />
            )}
          </>
        )}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 z-50">
          <EditProduct
            product={productToFormValues(selectedProduct)}
            productName={selectedProduct.productName}
            productCode={selectedProduct.productCode}
            productLabels={productLabels ?? {}}
            onClose={handleCloseModal}
            onSuccess={() => {
              handleCloseModal();
            }}
          />
        </div>
      )}
    </div>
  );
};
