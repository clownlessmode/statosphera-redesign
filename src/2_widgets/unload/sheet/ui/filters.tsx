import { useEffect, useState } from "react";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import {
  ViewTabs,
  ViewTabsContent,
  ViewTabsGroup,
  ViewTabsGroupContent,
  ViewTabsList,
  ViewTabsTrigger,
  useViewTabs,
} from "@shared/ui/view-tabs";
import { filters } from "./model/tabs";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import { useUnloadFilterStore } from "../model/filters-store";
import { FC } from "react";
import { ChevronLeft } from "lucide-react";

interface FiltersProps {
  isLoading: boolean;
  setShowFilters?: (value: React.SetStateAction<boolean>) => void;
}

const FiltersInner: FC<FiltersProps> = ({ isLoading, setShowFilters }) => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();
  const { getPreparedFilterPayload, updatePreparedFilter, resetAllFilters } =
    useUnloadFilterStore();
  const [resetKey, setResetKey] = useState(0);
  const payload = getPreparedFilterPayload();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);

  const handleApply = (type: "include" | "exclude") => {
    updatePreparedFilter(type, payload);
    resetAllFilters();
    setResetKey((k) => k + 1);
  };

  return (
    <>
      {!isMobile && (
        <ViewTabsList className="flex flex-col w-1/4 bg-background text-inherit rounded-none px-4 gap-4 border-none md:border-r md:border-border pt-4">
          <ViewTabsGroup>
            <ViewTabsGroupContent>
              {filters.map((item, index) => (
                <ViewTabsTrigger
                  value={item.title}
                  icon={item.icon}
                  key={`filter-trigger-${index}`}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
        </ViewTabsList>
      )}
      <div className="flex flex-col gap-4 pb-34 w-3/4 max-md:w-full">
        <div
          key={resetKey}
          className="flex flex-col md:overflow-auto gap-4 md:pt-4 scrollbar-hide max-md:pb-17"
        >
          {filters.map((item, index) => (
            <ViewTabsContent value={item.title} key={`filter-content-${index}`}>
              <item.component />
            </ViewTabsContent>
          ))}
        </div>
        <div className="w-full grid grid-cols-2 max-md:grid-cols-[min-content_1fr_1fr] gap-2 max-md:fixed max-md:bottom-7 max-md:inset-x-0 max-md:px-6 z-50">
          <Button className="md:hidden" onClick={() => setShowFilters?.(false)}>
            <ChevronLeft />
          </Button>
          <Button
            disabled={
              !payload.filterDate.dateStart ||
              !payload.filterDate.dateEnd ||
              isLoading
            }
            onClick={() => handleApply("include")}
          >
            Применить
          </Button>
          <Button
            disabled={
              !payload.filterDate.dateStart ||
              !payload.filterDate.dateEnd ||
              isLoading
            }
            onClick={() => handleApply("exclude")}
          >
            Исключить
          </Button>
        </div>
      </div>
    </>
  );
};

const Filters: FC<FiltersProps> = ({ isLoading, setShowFilters }) => {
  const defaultValue = filters.length > 0 ? filters[0].title : "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex flex-row gap-4 h-screen w-full"
    >
      <FiltersInner isLoading={isLoading} setShowFilters={setShowFilters} />
    </ViewTabs>
  );
};

export default Filters;
