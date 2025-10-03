// import { Button } from "@shared/ui/button";
// import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
// import { useSearchParams } from "react-router";
// import { useCallback } from "react";
import {
  // useSummaryVersionStore,
  useSelectedProductStore,
} from "@pages/summary/model";
// import { Layers } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";

export const GroupingSubmitButton = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const { bumpDataVersion } = useSummaryVersionStore();
  // const { getApiPayload } = useSummaryFiltersStore();
  const { selectedProduct } = useSelectedProductStore();

  // Проверяем, выбраны ли группировки и продукт
  // const isDisabled = useCallback(() => {
  //   const { groups } = getApiPayload();
  //   return groups.length === 0 || !selectedProduct;
  // }, [getApiPayload, selectedProduct]);

  // const handleSubmit = async () => {
  //   if (!selectedProduct) {
  //     console.warn("⚠️ Нет выбранного продукта для обновления группировок");
  //     return;
  //   }

  //   const allData = getApiPayload();
  //   console.log(
  //     "📊 Обновление группировок для продукта",
  //     selectedProduct,
  //     allData,
  //   );

  //   const newParams = new URLSearchParams(searchParams);
  //   newParams.set("open", "false");
  //   setSearchParams(newParams);

  //   // Таблица автоматически обновится с новыми группировками через bumpDataVersion
  //   // Карточки и график не зависят от группировок - они остаются прежними
  //   console.log(
  //     "📊 Таблица будет обновлена с новыми группировками через dataVersion",
  //   );

  //   // Обновляем версию для перерендера компонентов (таблица перерендерится автоматически)
  //   bumpDataVersion();

  //   console.log("✅ Группировки обновлены");
  // };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* <Button
          onClick={handleSubmit}
          disabled={isDisabled()}
          className="flex items-center gap-2 w-full"
          variant="outline"
        >
          <Layers className="w-4 h-4" />
          Обновить группировку
        </Button> */}
      </TooltipTrigger>
      <TooltipContent>
        <p>Обновить таблицу с новыми группировками</p>
        {!selectedProduct && (
          <p className="text-muted-foreground">
            Сначала выберите продукт из номенклатуры
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
