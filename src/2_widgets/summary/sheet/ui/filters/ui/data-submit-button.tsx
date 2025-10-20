import { Button } from "@shared/ui/button";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
import { useSearchParams } from "react-router";
import { useSummaryController } from "@pages/summary/api/controller";
import { useSummaryStore, useSummaryVersionStore } from "@pages/summary/model";
import { RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";

export const DataSubmitButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bumpDataVersion } = useSummaryVersionStore();
  const { getApiPayload } = useSummaryFiltersStore();
  const { clearAll, setNomenklatura } = useSummaryStore();
  const { getNomenklatura } = useSummaryController();

  const parseAllStringArrays = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.flatMap((item: any): any => {
        if (
          typeof item === "string" &&
          item.startsWith("[") &&
          item.endsWith("]")
        ) {
          try {
            const parsed = JSON.parse(item);
            return Array.isArray(parsed) ? parsed : item;
          } catch (e) {
            console.warn("Ошибка парсинга строкового массива:", item, e);
            return item;
          }
        }
        if (item && typeof item === "object") {
          return parseAllStringArrays(item);
        }
        return item;
      });
    }

    if (obj && typeof obj === "object" && obj.constructor === Object) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = parseAllStringArrays(value);
      }
      return result;
    }

    return obj;
  };

  const handleSubmit = async () => {
    clearAll();
    const allData = getApiPayload();

    const processedData = {
      ...allData,
      filters: parseAllStringArrays(allData.filters),
    };

    const newParams = new URLSearchParams(searchParams);
    newParams.set("open", "false");
    setSearchParams(newParams);

    try {
      const nomenklaturaResponse = await getNomenklatura(processedData);
      setNomenklatura(nomenklaturaResponse);
    } catch (error) {
      console.error("❌ Error fetching nomenklatura:", error);
    }

    bumpDataVersion();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 w-full"
          variant="default"
        >
          <RefreshCw className="w-4 h-4" />
          Обновить данные
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Применить фильтры и получить новую номенклатуру</p>
      </TooltipContent>
    </Tooltip>
  );
};
