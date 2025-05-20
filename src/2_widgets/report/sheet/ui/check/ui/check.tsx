import {
  BadgeCheck,
  Calendar,
  CircleDotDashed,
  Combine,
  Eraser,
  Globe,
  Grid2x2Check,
  Receipt,
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
// import Shops from "../../side/shops/ui/shops";

import Unique from "../../side/unique/ui/unique";

import { CombinedSubmitButton } from "../../commerce/ui/submit-button";

import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { DateFilter } from "../../side/date-filter";
import { ShopsFilter } from "../../side/shops-filter";
import { ProductsFilter } from "../../side/products-filter";
import { Button } from "@shared/ui/button";
import { GroupingFilter } from "../../side/grouping-filter";
import { IndicatorsFilter } from "../../side/indicators-filter";
import { LoyaltyFilter } from "../../side/loyalty-filter";
import { RecieptsFilter } from "../../side/reciepts-filter";
import { OnlineFilter } from "../../side/online-filter";
const filters = [
  {
    title: "Дата",
    icon: Calendar,
    component: DateFilter,
  },
  {
    title: "Магазины",
    icon: Store,
    component: ShopsFilter,
  },
  {
    title: "Лояльность",
    icon: BadgeCheck,
    component: LoyaltyFilter,
  },
  {
    title: "Чеки",
    icon: Receipt,
    component: RecieptsFilter,
  },
  {
    title: "Продукты",
    icon: ShoppingBasket,
    component: ProductsFilter,
  },
  {
    title: "Интернет магазин",
    icon: Globe,
    component: OnlineFilter,
  },
];

const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: GroupingFilter,
  },
];

const indicators = [
  {
    title: "Показатели",
    icon: Grid2x2Check,
    component: IndicatorsFilter,
  },
  {
    title: "Уникальные значения",
    icon: Combine,
    component: Unique,
  },
];
const Check = () => {
  const { triggerReset } = useFormResetStore();
  return (
    <ViewTabs
      defaultValue={filters[0].title}
      className="flex flex-row gap-4 h-screen"
    >
      <ViewTabsList className="flex flex-col bg-background text-inherit rounded-none px-4 gap-4 border-r border-border pt-4 h-full">
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
      <div className="flex flex-col gap-8 overflow-auto max-h-screen py-4 pb-96 max-w-xl">
        <div className="flex flex-col gap-2">
          <Button onClick={() => triggerReset()}>
            Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
          </Button>
          <Separator />
        </div>
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

export default Check;
