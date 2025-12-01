import { useEffect } from "react";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import {
  ViewTabs,
  ViewTabsContent,
  ViewTabsGroup,
  ViewTabsGroupContent,
  ViewTabsLabel,
  ViewTabsList,
  ViewTabsTrigger,
  useViewTabs,
} from "@shared/ui/view-tabs";
import { Separator } from "@shared/ui/separator";

import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { CombinedSubmitButton } from "../../commerce/ui/submit-button";
import { filters, grouping, indicators } from "../model/tabs";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useSearchParams } from "react-router";

const CheckInner = () => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();
  const { triggerReset } = useFormResetStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);

  const isMobile = useIsMobile();

  const handleCloseChange = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("open", "false");
    setSearchParams(newParams);
  };

  return (
    <>
      {!isMobile && (
        <ViewTabsList className="flex flex-col bg-background text-inherit rounded-none px-4 gap-4 border-r border-border pt-4 h-full">
          {/* Список триггеров (Filters / Grouping / Indicators) */}
          <ViewTabsGroup>
            <ViewTabsLabel>Фильтры</ViewTabsLabel>
            <ViewTabsGroupContent>
              {filters.map((item) => (
                <ViewTabsTrigger
                  value={item.title}
                  icon={item.icon}
                  key={item.title}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <ViewTabsGroup>
            <ViewTabsLabel>Группировка</ViewTabsLabel>
            <ViewTabsGroupContent>
              {grouping.map((item) => (
                <ViewTabsTrigger
                  value={item.title}
                  icon={item.icon}
                  key={item.title}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <ViewTabsGroup>
            <ViewTabsLabel>Показатели</ViewTabsLabel>
            <ViewTabsGroupContent>
              {indicators.map((item) => (
                <ViewTabsTrigger
                  value={item.title}
                  icon={item.icon}
                  key={item.title}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <CombinedSubmitButton />
        </ViewTabsList>
      )}

      <div className="flex flex-col py-4 gap-4 md:max-w-xl md:max-h-screen md:pb-96 md:overflow-auto md:gap-8 max-md:px-4 max-md:w-full max-md:pb-18">
        {isMobile ? (
          <div className="fixed bottom-0 left-0 flex flex-row w-full h-10 mb-4 px-4 z-50">
            <Button className="w-1/4 h-full" onClick={handleCloseChange}>
              Закрыть
            </Button>
            <CombinedSubmitButton className="w-2/4 h-full mx-2" />
            <Button className="w-1/4 h-full" onClick={() => triggerReset()}>
              Очистить <Eraser className="h-4 w-4 not-xs:hidden" />
            </Button>
          </div>
        ) : (
          <>
            <Button onClick={() => triggerReset()}>
              Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
            </Button>
            <Separator />
          </>
        )}
        {filters.map((item) => (
          <ViewTabsContent value={item.title} key={item.title}>
            <item.component />
          </ViewTabsContent>
        ))}
        {grouping.map((item) => (
          <ViewTabsContent value={item.title} key={item.title}>
            <item.component />
          </ViewTabsContent>
        ))}
        {indicators.map((item) => (
          <ViewTabsContent value={item.title} key={item.title}>
            <item.component />
          </ViewTabsContent>
        ))}
      </div>
    </>
  );
};

export default function Check() {
  // берём дефолтное значение, как и в Commerce
  const defaultValue =
    filters[0]?.title || grouping[0]?.title || indicators[0]?.title || "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex md:flex-row gap-4 h-screen flex-col"
    >
      <CheckInner />
    </ViewTabs>
  );
}
