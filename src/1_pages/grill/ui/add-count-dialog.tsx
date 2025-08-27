import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/alert-dialog";
import { useGrillController } from "../api/controller";
import { useEffect, useState } from "react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { GrillProductTblRo } from "../api/types/responses";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idProduct: number;
  product: GrillProductTblRo | null;
}

const AddCountDialog = ({ isOpen, onClose, idProduct, product }: Props) => {
  const { addProductLeftover, isAddProductImLoading } = useGrillController();

  // Состояние для выбранных продуктов (один массив чисел)
  const [count, setCount] = useState<number>(0);
  // Состояние для отображаемого значения в инпуте
  const [inputValue, setInputValue] = useState<string>("");
  // Состояние для AlertDialog подтверждения
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  // Функция для безопасного сложения/вычитания с учетом единиц измерения
  const updateCount = (increment: boolean) => {
    if (product?.ed === "ШТ") {
      setCount((prev) => {
        const newValue = increment ? prev + 1 : prev - 1;
        setInputValue(newValue.toString());
        return newValue;
      });
    } else if (product?.ed === "КГ") {
      // Для КГ используем целые числа (умножаем на 10)
      setCount((prev) => {
        const currentInTenths = Math.round(prev * 10);
        const newInTenths = increment
          ? currentInTenths + 1
          : currentInTenths - 1;
        const newValue = newInTenths / 10;
        setInputValue(newValue.toFixed(1));
        return newValue;
      });
    }
  };

  // Функция для форматирования отображаемого значения
  const formatDisplayValue = (value: number): string => {
    if (product?.ed === "КГ") {
      return value.toFixed(1);
    }
    return value.toString();
  };

  // Функция для парсинга введенного значения
  const parseInputValue = (value: string): number => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return 0;

    if (product?.ed === "КГ") {
      // Округляем до одного знака после запятой для КГ
      return Math.round(parsed * 10) / 10;
    }
    return parsed;
  };

  // Обработчик изменения инпута
  const handleInputChange = (value: string) => {
    setInputValue(value);
    const parsedValue = parseInputValue(value);
    setCount(parsedValue);
  };

  const handleSubmit = () => {
    if (!idProduct || count === 0) {
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleAddProduct = () => {
    addProductLeftover({ id: idProduct, payload: { count: count } });
    setCount(0);
    setInputValue("");
    setShowConfirmDialog(false);
    onClose();
  };

  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    if (product?.ed === "ШТ") {
      setCount(1);
      setInputValue("1");
    } else if (product?.ed === "КГ") {
      setCount(0.1);
      setInputValue("0.1");
    }
  }, [product]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="h-[42vh]">
          <div className="px-2 py-4 space-y-4 h-full flex flex-col">
            <p>
              Добавить количество для{" "}
              <span className="font-bold text-lg">
                {product?.fullname || ""}
              </span>
            </p>
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Введите количество"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      className="w-full text-xl font-bold hover:bg-red-500"
                      variant="outline"
                      onClick={() => updateCount(false)}
                    >
                      -
                    </Button>
                    <span className="text-sm text-red-500">
                      Отнять {product?.ed === "ШТ" ? 1 : 0.1} {product?.ed}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      className="w-full text-xl font-bold hover:bg-green-500"
                      variant="outline"
                      onClick={() => updateCount(true)}
                    >
                      +
                    </Button>
                    <span className="text-sm text-green-500">
                      Добавить {product?.ed === "ШТ" ? 1 : 0.1} {product?.ed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <p>
                  Ваш остаток:{" "}
                  <span className="font-bold text-lg">
                    {product?.remainder || 0} {product?.ed}
                  </span>
                </p>
                <p>
                  Если вы добавите{" "}
                  <span className="font-bold text-lg">
                    {formatDisplayValue(count)} {product?.ed}
                  </span>{" "}
                  , то ваш остаток будет{" "}
                  <span className="font-bold text-lg">
                    {product?.remainder
                      ? formatDisplayValue(product.remainder + count)
                      : formatDisplayValue(count)}{" "}
                    {product?.ed}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t flex-shrink-0">
                <Button
                  onClick={handleSubmit}
                  disabled={!idProduct || isAddProductImLoading}
                  className="w-fit"
                >
                  {isAddProductImLoading
                    ? "Отправка..."
                    : `Добавить ${formatDisplayValue(count)} ${product?.ed === "ШТ" ? "шт." : "кг."}`}
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Подтверждение добавления
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white-700">
              Вы уверены, что хотите добавить{" "}
              <span className="font-bold">
                {formatDisplayValue(count)} {product?.ed}
              </span>{" "}
              товара для{" "}
              <span className="font-bold">"{product?.fullname}"</span>?
              <br />
              <br />
              Текущий остаток:{" "}
              <span className="font-bold">
                {product?.remainder || 0} {product?.ed}
              </span>
              <br />
              Новый остаток будет:{" "}
              <span className="font-bold">
                {product?.remainder
                  ? formatDisplayValue(product.remainder + count)
                  : formatDisplayValue(count)}{" "}
                {product?.ed}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelConfirm}>
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddProduct}
              disabled={isAddProductImLoading}
            >
              {isAddProductImLoading ? "Добавление..." : "Добавить"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default AddCountDialog;
