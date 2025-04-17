import React, { useEffect } from "react";
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
import { CombinedSubmitButton } from "./submit-button";
import { filters, grouping, indicators } from "../model/tabs";

const CommerceInner = () => {
  const { targetViewValue, setTargetViewValue } = useTabStore();
  const { scrollTo } = useViewTabs();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);

  return (
    <>
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
        <ViewTabsGroup>
          <ViewTabsLabel>Показатели</ViewTabsLabel>
          <ViewTabsGroupContent>
            {indicators.map((item, index) => (
              <ViewTabsTrigger
                value={item.title}
                icon={item.icon}
                key={`indicator-trigger-${index}`}
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
        {filters.map((item, index) => (
          <ViewTabsContent value={item.title} key={`filter-content-${index}`}>
            <item.component />
          </ViewTabsContent>
        ))}
        {grouping.map((item, index) => (
          <ViewTabsContent value={item.title} key={`grouping-content-${index}`}>
            <item.component />
          </ViewTabsContent>
        ))}
        {indicators.map((item, index) => (
          <ViewTabsContent
            value={item.title}
            key={`indicator-content-${index}`}
          >
            <item.component />
          </ViewTabsContent>
        ))}
      </div>
    </>
  );
};

const Commerce = () => {
  const defaultValue =
    filters.length > 0
      ? filters[0].title
      : grouping.length > 0
      ? grouping[0].title
      : indicators.length > 0
      ? indicators[0].title
      : "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex flex-row gap-4 h-screen"
    >
      <CommerceInner />
    </ViewTabs>
  );
};

export default Commerce;
