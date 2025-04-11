import {
  Calendar,
  CircleDotDashed,
  Combine,
  Grid2x2Check,
  ShoppingBasket,
  Store,
} from "lucide-react";

import { Separator } from "@shared/ui/separator";

import {
  ViewTabs,
  ViewTabsContent,
  ViewTabsGroup,
  ViewTabsGroupContent,
  ViewTabsLabel,
  ViewTabsList,
  ViewTabsTrigger,
} from "@shared/ui/view-tabs";
import Shops from "../../side/shops/ui/shops";
import Products from "../../side/products/ui/products";
import Grouping from "../../side/grouping/ui/grouping";
import Indicators from "../../side/indicators";
import Unique from "../../side/unique";
import { DateFilter } from "../../side/date";
import { CombinedSubmitButton } from "./submit-button";
const filters = [
  {
    title: "Дата",
    icon: Calendar,
    component: DateFilter,
  },
  {
    title: "Магазины",
    icon: Store,
    component: Shops,
  },
  {
    title: "Продукты",
    icon: ShoppingBasket,
    component: Products,
  },
];

const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: Grouping,
  },
];

const indicators = [
  {
    title: "Показатели",
    icon: Grid2x2Check,
    component: Indicators,
  },
  {
    title: "Уникальные значения",
    icon: Combine,
    component: Unique,
  },
];
const Commerce = () => {
  return (
    <ViewTabs defaultValue={filters[0].title} className="flex flex-row gap-4">
      <ViewTabsList className="flex flex-col bg-background text-inherit rounded-none px-4 gap-4 border-r border-border pt-4">
        <ViewTabsGroup>
          <ViewTabsLabel>Фильтры</ViewTabsLabel>
          <ViewTabsGroupContent>
            {filters.map((item, index) => (
              <ViewTabsTrigger value={item.title} icon={item.icon} key={index}>
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
              <ViewTabsTrigger value={item.title} icon={item.icon} key={index}>
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
              <ViewTabsTrigger value={item.title} icon={item.icon} key={index}>
                {item.title}
              </ViewTabsTrigger>
            ))}
          </ViewTabsGroupContent>
        </ViewTabsGroup>
        <Separator />
        <CombinedSubmitButton />
      </ViewTabsList>
      <div className="flex flex-col gap-8 overflow-auto max-h-screen py-4 pb-96">
        {filters.map((item, index) => (
          <ViewTabsContent value={item.title} key={index}>
            <item.component />
          </ViewTabsContent>
        ))}
        {grouping.map((item, index) => (
          <ViewTabsContent value={item.title} key={index}>
            <item.component />
          </ViewTabsContent>
        ))}
        {indicators.map((item, index) => (
          <ViewTabsContent value={item.title} key={index}>
            <item.component />
          </ViewTabsContent>
        ))}
      </div>
    </ViewTabs>
  );
};

export default Commerce;
