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

const CheckInner = () => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();
  const { triggerReset } = useFormResetStore();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);

  return (
    <>
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

      <div className="flex flex-col gap-8 overflow-auto max-h-screen py-4 pb-96 max-w-xl">
        <Button onClick={() => triggerReset()}>
          Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
        </Button>
        <Separator />
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
      className="flex flex-row gap-4 h-screen"
    >
      <CheckInner />
    </ViewTabs>
  );
}
