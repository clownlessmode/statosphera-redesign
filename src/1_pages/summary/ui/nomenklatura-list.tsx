import { useSummaryStore } from "../model";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useSummaryController } from "../api/controller";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
import { useCountStore } from "@pages/report/model/usCountStore";
import { useState } from "react";
import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Check, X } from "lucide-react";

interface NomenklaturaListProps {
  onSelectedProductsChange?: (selectedProducts: number[]) => void;
}

export const NomenklaturaList = ({
  onSelectedProductsChange,
}: NomenklaturaListProps) => {
  const { nomenklatura, setTable } = useSummaryStore();
  const { getTable } = useSummaryController();
  const { getApiPayload } = useSummaryFiltersStore();
  const { setCount } = useCountStore();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  if (!nomenklatura || nomenklatura.length === 0) {
    return <div>Номенклатура по таким фильтрам отсутствует</div>;
  }

  //   const updateTable = async (productIds: number[]) => {
  //     try {
  //       const allData = getApiPayload();

  //       if (productIds.length > 0) {
  //         const dataWithProducts = {
  //           ...allData,
  //           filters: {
  //             ...allData.filters,
  //             product: {
  //               ...allData.filters.product,
  //               idProduct: productIds.map(id => id.toString()),
  //             },
  //           },
  //         };

  //         const tableResponse = await getTable(dataWithProducts);
  //         setTable(tableResponse);
  //         // setCount(tableResponse.totalRows);
  //       } else {
  //         setTable(null);
  //         setCount(0);
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching table for products:", error);
  //     }
  //   };

  const handleProductClick = async (productId: number) => {
    let newSelectedProducts: number[];

    if (selectedProducts.includes(productId)) {
      newSelectedProducts = selectedProducts.filter((id) => id !== productId);
    } else {
      newSelectedProducts = [...selectedProducts, productId];
    }

    setSelectedProducts(newSelectedProducts);
    onSelectedProductsChange?.(newSelectedProducts);
    // await updateTable(newSelectedProducts);
  };

  const handleProductAll = async () => {
    const allIds = nomenklatura.map((item) => item.idProduct);
    const isAllSelected = selectedProducts.length === allIds.length;

    if (isAllSelected) {
      setSelectedProducts([]);
      onSelectedProductsChange?.([]);
      //   await updateTable([]);
    } else {
      setSelectedProducts(allIds);
      onSelectedProductsChange?.(allIds);
      //   await updateTable(allIds);
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    const newSelectedProducts = selectedProducts.filter(
      (id) => id !== productId,
    );
    setSelectedProducts(newSelectedProducts);
    onSelectedProductsChange?.(newSelectedProducts);
    // await updateTable(newSelectedProducts);
  };

  const getProductName = (productId: number) => {
    return (
      nomenklatura.find((item) => item.idProduct === productId)?.productName ||
      ""
    );
  };

  return (
    <Card className="max-w-[550px] h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle>Номенклатура</CardTitle>

          {selectedProducts.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Выбранные: {selectedProducts.length}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold mb-2">
                    Выбранная номенклатура
                  </h3>
                  {selectedProducts.map((productId) => (
                    <div
                      key={productId}
                      className="flex flex-row justify-between items-center mb-2 mt-2"
                    >
                      <span className="col-span-4">
                        {getProductName(productId)}
                      </span>
                      <X
                        className="cursor-pointer hover:text-red-500 transition-colors"
                        size={16}
                        onClick={() => handleRemoveProduct(productId)}
                      />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button variant="outline" size="sm" onClick={handleProductAll}>
            Выбрать все
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 flex-1 overflow-y-auto min-h-0">
        <div className="space-y-2">
          {nomenklatura.map((item) => (
            <div
              key={item.idProduct}
              className={`bg-background flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                selectedProducts.includes(item.idProduct)
                  ? "border-white"
                  : "border-border"
              }`}
              onClick={() => handleProductClick(item.idProduct)}
            >
              <span className="">{item.productName}</span>
              {selectedProducts.includes(item.idProduct) && (
                <Check className="w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
