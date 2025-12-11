import {
  BadgeCheck,
  Calendar,
  CircleDotDashed,
  Combine,
  Globe,
  Grid2x2Check,
  Receipt,
  ShoppingBasket,
  Store,
} from "lucide-react";

import { DateFilter } from "../../side/date-filter";
import { ShopsFilter } from "../../side/shops-filter";
import { ProductsFilter } from "../../side/products-filter";
import { GroupingFilter } from "../../side/grouping-filter";
import { IndicatorsFilter } from "../../side/indicators-filter";
import { LoyaltyFilter } from "../../side/loyalty-filter";
import { RecieptsFilter } from "../../side/reciepts-filter";
import { OnlineFilter } from "../../side/online-filter";
import { UniqueFilters } from "../../side/uniques-filter";

export const filters = [
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
    title: "Чеки",
    icon: Receipt,
    component: RecieptsFilter,
  },
  {
    title: "Лояльность",
    icon: BadgeCheck,
    component: LoyaltyFilter,
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

export const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: GroupingFilter,
  },
];

export const indicators = [
  {
    title: "Показатели",
    icon: Grid2x2Check,
    component: IndicatorsFilter,
  },
  {
    title: "Уникальные значения",
    icon: Combine,
    component: UniqueFilters,
  },
];
