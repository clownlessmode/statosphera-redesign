import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { useGrillController } from "../api/controller";
import { MultiSelect, MultiSelectOption } from "@shared/ui/multiselect";
import { useState, useMemo } from "react";
import { Button } from "@shared/ui/button";
import { XIcon } from "lucide-react";
import { GrillProductTblRo } from "../api/types/responses";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductDialog = ({ isOpen, onClose }: Props) => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    addProductIm,
    isAddProductImLoading,
    tableData,
  } = useGrillController();

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const addedProductIds = useMemo(() => {
    if (!tableData) return new Set<number>();

    const ids = new Set<number>();
    tableData.forEach((item: any) => {
      if (item.idProduct) {
        ids.add(item.idProduct);
      }
    });
    return ids;
  }, [tableData]);

  const addedProductsInfo = useMemo(() => {
    if (!tableData || !products) return [];

    return tableData.map((tableItem: GrillProductTblRo) => {
      const product = products.find((p) =>
        p.idProduct.includes(tableItem.idProduct),
      );
      return {
        id: tableItem.idProduct,
        name:
          tableItem.fullname ||
          product?.productName ||
          `Продукт ${tableItem.idProduct}`,
        remainder: tableItem.remainder,
        ed: tableItem.ed,
      };
    });
  }, [tableData, products]);

  const productOptions: MultiSelectOption[] = useMemo(() => {
    if (!products) return [];

    return products
      .filter((product) => {
        return product.idProduct.some((id) => !addedProductIds.has(id));
      })
      .map((product) => {
        const availableIds = product.idProduct.filter(
          (id) => !addedProductIds.has(id),
        );
        return {
          label: `${product.productName}${addedProductIds.has(product.idProduct[0]) ? " (частично добавлен)" : ""}`,
          value: availableIds.join(","),
        };
      });
  }, [products, addedProductIds]);

  const selectedProductNames = useMemo(() => {
    return selectedProducts.map((id) => {
      const product = products?.find((p) => p.idProduct.includes(id));
      return {
        id,
        name: product?.productName || `Продукт ${id}`,
        isAdded: false,
      };
    });
  }, [selectedProducts, products]);

  const allDisplayedProducts = useMemo(() => {
    const selectedProducts = selectedProductNames.map((product: any) => ({
      id: product.id,
      name: product.name,
      isAdded: false,
    }));

    const addedProducts = addedProductsInfo.map((product: any) => ({
      id: product.id,
      name: product.name,
      isAdded: true,
      remainder: product.remainder,
      ed: product.ed,
    }));

    return [...selectedProducts, ...addedProducts];
  }, [addedProductsInfo, selectedProductNames]);

  const handleProductSelectionChange = (selectedValues: string[]) => {
    const allProductIds: number[] = [];

    selectedValues.forEach((value) => {
      const productIds = value.split(",").map((id) => parseInt(id, 10));
      allProductIds.push(...productIds);
    });

    setSelectedProducts(allProductIds);

    const selectedProductNames = selectedValues.map((productIdString) => {
      const product = products?.find(
        (p) => p.idProduct.join(",") === productIdString,
      );
      return product?.productName || productIdString;
    });
    console.log("Выбранные продукты:", selectedProductNames);
    console.log("Выбранные ID (массив чисел):", allProductIds);
  };

  const handleRemoveProduct = (idToRemove: number) => {
    const newSelectedProducts = selectedProducts.filter(
      (id) => id !== idToRemove,
    );
    setSelectedProducts(newSelectedProducts);
  };

  const handleSubmit = async () => {
    if (selectedProducts.length === 0) {
      console.log("Нет выбранных продуктов");
      return;
    }

    try {
      const result = await addProductIm({ idProduct: selectedProducts });
      console.log("Продукты успешно добавлены:", result);
      setSelectedProducts([]);
      onClose();
    } catch (error) {
      console.error("Ошибка при добавлении продуктов:", error);
    }
  };

  if (isLoadingProducts) {
    return <div>Загрузка..</div>;
  }

  if (!products || products.length === 0) {
    return <></>;
  }

  if (productOptions.length === 0 && products.length > 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="h-[30vh]">
          <div className="px-2 py-4 space-y-4 h-full flex flex-col justify-center items-center">
            <p className="text-center">
              Все доступные продукты уже добавлены в гриль
            </p>
            <Button onClick={onClose}>Закрыть</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="h-[68vh] sm:max-w-[60vw]! max-w-[50vw]! border-white flex flex-col">
          <div className="flex flex-col gap-2 flex-shrink-0">
            <p>Добавить продукты</p>
            {addedProductIds.size > 0 && (
              <p className="text-sm text-muted-foreground">
                Уже добавлено в гриль: {addedProductIds.size} продуктов
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
            <div className="flex-shrink-0">
              <MultiSelect
                options={productOptions}
                value={
                  selectedProducts.length > 0
                    ? products
                        ?.filter((p) =>
                          p.idProduct.some((id) =>
                            selectedProducts.includes(id),
                          ),
                        )
                        .map((p) => p.idProduct.join(",")) || []
                    : []
                }
                onValueChange={handleProductSelectionChange}
                placeholder="Выберите продукты для добавления"
                isLoading={isLoadingProducts}
                maxCount={1}
              />
            </div>

            {allDisplayedProducts.length > 0 && (
              <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
                <p className="text-sm text-muted-foreground flex-shrink-0">
                  Продукты:
                </p>
                <div className="flex-1 min-h-0 overflow-y-auto border rounded-md p-2">
                  <div className="flex flex-col gap-2">
                    {allDisplayedProducts.map((product: any) => (
                      <div
                        key={product.id}
                        className={`flex items-center justify-between gap-2 rounded-md p-2 ${
                          product.isAdded
                            ? "bg-muted/60 border border-muted"
                            : "border "
                        }`}
                      >
                        <div className="flex-1">
                          <p className="text-sm">{product.name}</p>
                          {product.isAdded &&
                            product.remainder !== undefined && (
                              <p className="text-xs text-muted-foreground">
                                Остаток: {product.remainder || 0} {product.ed}
                              </p>
                            )}
                        </div>

                        {product.isAdded ? (
                          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded">
                            Добавлен
                          </span>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveProduct(product.id)}
                            className="h-6 w-6"
                          >
                            <XIcon className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t flex-shrink-0">
            <Button
              onClick={handleSubmit}
              disabled={selectedProducts.length === 0 || isAddProductImLoading}
              className="w-fit"
            >
              {isAddProductImLoading
                ? "Отправка..."
                : "Добавить выбранные продукты"}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isAddProductImLoading}
            >
              Отмена
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddProductDialog;
