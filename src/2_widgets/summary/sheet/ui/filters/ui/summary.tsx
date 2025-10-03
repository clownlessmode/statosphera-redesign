import { useEffect } from "react";
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
import { DualSubmitButtons } from "./index";
import { Eraser } from "lucide-react";
import { Button } from "@shared/ui/button";
import { useFormResetStore } from "@widgets/summary/sheet/model/reset-store";
import { useTabStore } from "@widgets/summary/sheet/model/url-store";
import { filters, grouping } from "../model/tabs";
import { useSearchParams } from "react-router";
import { useIsMobile } from "@shared/hooks/use-mobile";

const SummaryInner = () => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);
  const { triggerReset } = useFormResetStore();
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
          <ViewTabsGroup>
            <ViewTabsLabel>Фильтры</ViewTabsLabel>
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

          {/* <Separator />

          <ViewTabsGroup>
            <ViewTabsLabel>Группировка</ViewTabsLabel>
            <ViewTabsGroupContent>
              {grouping.map((item, index) => (
                <ViewTabsTrigger
                  value={item.title}
                  icon={item.icon}
                  key={`grouping-trigger-${index}`}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup> */}
          <Separator />

          <DualSubmitButtons />
        </ViewTabsList>
      )}
      <div className="flex flex-col py-4 gap-4 md:max-w-xl md:max-h-screen md:pb-96 md:overflow-auto md:gap-8 max-md:px-4 max-md:w-full max-md:pb-28">
        {isMobile ? (
          <div className="fixed bottom-0 left-0 flex flex-row w-full h-20 mb-4 px-4 z-50">
            <DualSubmitButtons className="w-3/4 h-full mr-2" />
            <div className="flex flex-col gap-2 w-1/4">
              <Button className="w-full" onClick={handleCloseChange}>
                Закрыть
              </Button>
              <Button className="w-full" onClick={() => triggerReset()}>
                Очистить <Eraser className="h-4 w-4 not-xs:hidden" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button onClick={() => triggerReset()}>
              Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
            </Button>
            <Separator />
          </>
        )}

        {filters.map((item, index) => (
          <ViewTabsContent value={item.title} key={`filter-content-${index}`}>
            <item.component />
          </ViewTabsContent>
        ))}
        {/* {grouping.map((item, index) => (
          <ViewTabsContent value={item.title} key={`grouping-content-${index}`}>
            <item.component />
          </ViewTabsContent>
        ))} */}
      </div>
    </>
  );
};

const SummaryIn = () => {
  const defaultValue =
    filters.length > 0
      ? filters[0].title
      : grouping.length > 0
        ? grouping[0].title
        : "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex md:flex-row gap-4 h-screen flex-col"
    >
      <SummaryInner />
    </ViewTabs>
  );
};

export default SummaryIn;
