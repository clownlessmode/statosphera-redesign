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
import { CombinedSubmitButton } from "./submit-button";
import { Eraser } from "lucide-react";
import { Button } from "@shared/ui/button";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { equipmentFilters, grouping } from "../model/tabs";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";

const WriteOffEquipInner = () => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);
  const { triggerReset } = useFormResetStore();
  return (
    <>
      <ViewTabsList className="flex flex-col bg-background text-inherit rounded-none px-4 gap-4 border-r border-border pt-4 h-full">
        <ViewTabsGroup>
          <ViewTabsLabel>Фильтры</ViewTabsLabel>
          <ViewTabsGroupContent>
            {equipmentFilters.map((item, index) => (
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

        <Separator />

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
        </ViewTabsGroup>
        <Separator />

        <CombinedSubmitButton />
      </ViewTabsList>
      <div className="flex flex-col gap-8 overflow-auto max-h-screen py-4 pb-96 max-w-xl">
        <Button onClick={() => triggerReset()}>
          Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
        </Button>
        <Separator />

        {equipmentFilters.map((item, index) => (
          <ViewTabsContent value={item.title} key={`filter-content-${index}`}>
            <item.component />
          </ViewTabsContent>
        ))}
        {grouping.map((item, index) => (
          <ViewTabsContent value={item.title} key={`grouping-content-${index}`}>
            <item.component />
          </ViewTabsContent>
        ))}
      </div>
    </>
  );
};

const WriteOffEquip = () => {
  const defaultValue =
    equipmentFilters.length > 0
      ? equipmentFilters[0].title
      : grouping.length > 0
        ? grouping[0].title
        : "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex flex-row gap-4 h-screen"
    >
      <WriteOffEquipInner />
    </ViewTabs>
  );
};

export default WriteOffEquip;
