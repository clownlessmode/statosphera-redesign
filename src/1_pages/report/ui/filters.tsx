import { Button } from "@shared/ui/button";
import { FilterBadges } from "./filter-badges";
import { GroupBadges } from "./group-badges";
import { ReportBadges } from "./values-badges";
import { Card } from "@shared/ui/card";
import { Filter, BarChart3, Layers3 } from "lucide-react";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useNavigate } from "react-router";
import {
  filters,
  grouping,
  indicators,
} from "@widgets/report/sheet/ui/commerce/model/tabs";

const FiltersAccordeon = () => {
  const { setTargetViewValue, tab } = useTabStore();
  const navigate = useNavigate();
  const handleOpenSheet = (targetValue: string | null) => {
    if (targetValue) {
      setTargetViewValue(targetValue);
      navigate(`/report?open=true&tab=${tab}`);
    }
  };

  // Determine target values from imported arrays
  const targetFilterValue = filters.length > 0 ? filters[0].title : null;
  const targetIndicatorValue =
    indicators.length > 0 ? indicators[0].title : null;
  const targetGroupingValue = grouping.length > 0 ? grouping[0].title : null;

  return (
    <div className="flex flex-col gap-2">
      <Card
        onClick={() => handleOpenSheet(targetFilterValue)}
        className="flex flex-row gap-1 justify-between items-center p-2"
      >
        <div className="flex flex-row gap-1 items-center ">
          <Filter className="size-4" />
          <p className="text-sm">Фильтры:</p>
          <FilterBadges tab={tab} />
        </div>
        <Button className="w-[220px] justify-between" size={"sm"}>
          Изменить фильтры <Filter className="size-4" />
        </Button>
      </Card>
      <Card
        onClick={() => handleOpenSheet(targetIndicatorValue)}
        className="flex flex-row gap-1 justify-between items-center p-2"
      >
        <div className="flex flex-row gap-1 items-center">
          <BarChart3 className="size-4" />
          <p className="text-sm">Показатели:</p>
          <ReportBadges tab={tab} />
        </div>
        <Button size={"sm"} className="w-[220px] justify-between">
          Изменить показатели <BarChart3 className="size-4" />
        </Button>
      </Card>
      <Card
        onClick={() => handleOpenSheet(targetGroupingValue)}
        className="flex flex-row gap-1 justify-between items-center p-2"
      >
        <div className="flex flex-row gap-1 items-center">
          <Layers3 className="size-4" />
          <p className="text-sm">Группировки:</p>
          <GroupBadges tab={tab} />
        </div>
        <Button size={"sm"} className="w-[220px] justify-between">
          Изменить группировки <Layers3 className="size-4" />
        </Button>
      </Card>
    </div>
  );
};

export default FiltersAccordeon;
