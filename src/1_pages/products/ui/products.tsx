import { useRef, useEffect, useState, useMemo } from "react";
import { useProductInfiniteScroll } from "../hook/pagination";
import { Header } from "@widgets/header";
import { ProductCardSkeleton } from "./product-skeleton";
import ProductCard from "@entities/product/product-card";
import { Dialog, DialogContent } from "@shared/ui/dialog";
import { ProductFilter, ProductResponse } from "../api/types";
import { EditProduct } from "@features/products/edit-products";
import { extractProductLabels } from "../utils/labels";
import { Switch } from "@shared/ui/switch";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Funnel } from "lucide-react";
import { FilterModal } from "./filter-modal";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

export const Products = () => {
  const [showWithoutGroups, setShowWithoutGroups] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'new'>('all');
  
  const { getApiPayload } = useFiltersStore();
  const payload = getApiPayload()
  const { 
    products, 
    loadMore, 
    isLoading, 
    hasMore, 
    isInitialLoading,
    refetch
  } = useProductInfiniteScroll(20, showWithoutGroups, payload.filters.product as any);

  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null)
  const [productLabels, setProductLabels] = useState<ReturnType<typeof extractProductLabels> | null>(null);
  
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
    setActiveFilter('all');
    setShowWithoutGroups(false);
  };

  const handleNewProductsClick = () => {
    setActiveFilter('new');
    setShowWithoutGroups(true);
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
      { threshold: 0.1, rootMargin: '200px'}
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

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header 
        title="Справочник номенклатуры" 
        actions={{
          left: (
            <div className="flex flex-row gap-4 ml-8">
              <FilterModal refetch={refetch}/>
              <Button 
                variant={activeFilter === 'all' ? 'secondary' : 'outline'}
                onClick={handleAllProductsClick}
              >
                Вся номенклатура
              </Button>
              <Button 
                variant={activeFilter === 'new' ? 'secondary' : 'outline'}
                onClick={handleNewProductsClick}
              >
                Новая номенклатура
              </Button>
            </div>
          )
        }}
      />
      <div className="rounded-3xl px-4 py-4 h-full bg-background overflow-y-auto">

        {isInitialLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-3 gap-4">
            {[...Array(20)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : 
        products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg font-medium">По этим фильтрам номенклатура отсутствует</p>
              <p className="text-sm">Попробуйте изменить параметры фильтрации</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setShowWithoutGroups(false);
                setActiveFilter('all');
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : 
        (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4">
                {[...Array(3)].map((_, i) => (
                  <ProductCardSkeleton key={`loading-${i}`} />
                ))}
              </div>
            )}

            {/* Триггер для загрузки */}
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