import { useEffect } from "react";
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

const FiltersInner = () => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <ViewTabsList className="flex flex-col w-1/4 bg-background text-inherit rounded-none px-4 gap-4 border-none md:border-r md:border-border pt-4 h-full">
          <ViewTabsGroup>
            <ViewTabsGroupContent className="flex-col">
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
      <div className="flex flex-col gap-4 pb-20 w-3/4">
        <div className="flex flex-col overflow-auto gap-4 pt-4 scrollbar-hide">
          {filters.map((item, index) => (
            <ViewTabsContent value={item.title} key={`filter-content-${index}`}>
              <item.component />
            </ViewTabsContent>
          ))}
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button>Применить</Button>
          <Button>Исключить</Button>
        </div>
      </div>
    </>
  );
};

const Filers = () => {
  const defaultValue = filters.length > 0 ? filters[0].title : "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex flex-row gap-4 h-screen w-full"
    >
      <FiltersInner />
    </ViewTabs>
  );
};

export default Filers;
