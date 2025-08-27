import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { useGrillController } from "../api/controller";
import { MultiSelect, MultiSelectOption } from "@shared/ui/multiselect";
import { useState, useMemo } from "react";
import { Button } from "@shared/ui/button";
import { XIcon } from "lucide-react";

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
  } = useGrillController();

  // Состояние для выбранных продуктов (один массив чисел)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Преобразуем данные продуктов в формат для MultiSelect
  const productOptions: MultiSelectOption[] = useMemo(() => {
    if (!products) return [];

    return products.map((product) => ({
      label: product.productName,
      value: product.idProduct.join(","), // Используем строку для MultiSelect
    }));
  }, [products]);

  // Получаем названия выбранных продуктов
  const selectedProductNames = useMemo(() => {
    return selectedProducts.map((id) => {
      const product = products?.find((p) => p.idProduct.includes(id));
      return { id, name: product?.productName || `Продукт ${id}` };
    });
  }, [selectedProducts, products]);

  // Обработчик изменения выбранных продуктов
  const handleProductSelectionChange = (selectedValues: string[]) => {
    // Преобразуем строки в один массив чисел
    const allProductIds: number[] = [];

    selectedValues.forEach((value) => {
      const productIds = value.split(",").map((id) => parseInt(id, 10));
      allProductIds.push(...productIds);
    });

    setSelectedProducts(allProductIds);

    // Выводим названия выбранных продуктов в консоль
    const selectedProductNames = selectedValues.map((productIdString) => {
      const product = products?.find(
        (p) => p.idProduct.join(",") === productIdString,
      );
      return product?.productName || productIdString;
    });
    console.log("Выбранные продукты:", selectedProductNames);
    console.log("Выбранные ID (массив чисел):", allProductIds);
  };

  // Обработчик удаления продукта
  const handleRemoveProduct = (idToRemove: number) => {
    const newSelectedProducts = selectedProducts.filter(
      (id) => id !== idToRemove,
    );
    setSelectedProducts(newSelectedProducts);
  };

  // Обработчик отправки на сервер
  const handleSubmit = async () => {
    if (selectedProducts.length === 0) {
      console.log("Нет выбранных продуктов");
      return;
    }

    try {
      const result = await addProductIm({ idProduct: selectedProducts });
      console.log("Продукты успешно добавлены:", result);
      setSelectedProducts([]); // Очищаем выбор после успешной отправки
      onClose(); // Закрываем модалку после успешной отправки
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="h-[65vh]">
          <div className="px-2 py-4 space-y-4 h-full flex flex-col">
            <p>Добавить продукты</p>
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-4 flex-1 min-h-0">
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
                  placeholder="Выберите продукты"
                  isLoading={isLoadingProducts}
                  maxCount={1}
                />

                {/* Список выбранных продуктов с скроллом */}
                {selectedProductNames.length > 0 && (
                  <div className="flex flex-col gap-2 flex-1 min-h-0">
                    <p className="text-sm text-muted-foreground">
                      Выбранные продукты:
                    </p>
                    <div className="flex-1 overflow-y-auto border rounded-md p-2 max-h-[350px]">
                      <div className="flex flex-col gap-2">
                        {selectedProductNames.map(({ id, name }) => (
                          <div
                            key={id}
                            className="flex items-center justify-between gap-2 bg-muted rounded-md p-2"
                          >
                            <p className="text-sm">{name}</p>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleRemoveProduct(id)}
                              className="h-6 w-6"
                            >
                              <XIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t flex-shrink-0">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    selectedProducts.length === 0 || isAddProductImLoading
                  }
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddProductDialog;
