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

  const handleSubmit = async () => {
    clearAll();
    const allData = getApiPayload();

    console.log("🔄 Обновление данных и номенклатуры", allData);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("open", "false");
    setSearchParams(newParams);

    try {
      const nomenklaturaResponse = await getNomenklatura(allData);
      setNomenklatura(nomenklaturaResponse);
      console.log("✅ Номенклатура обновлена");
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
