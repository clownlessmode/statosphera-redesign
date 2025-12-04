import {
  Calendar,
  CircleDotDashed,
  Combine,
  Grid2x2Check,
  Store,
} from "lucide-react";

import { UniqueFilters } from "../../side/uniques-filter";
import { DateFilter } from "../../side/date-filter";
import { ShopsProductFilter } from "../../side/shops-product-filter";
import { GroupingFilter } from "../../side/grouping-filter";
import { IndicatorsFilter } from "../../side/indicators-filter";

export const filters = [
  {
    title: "Дата",
    icon: Calendar,
    component: DateFilter,
  },
  {
    title: "Магазины и продукты",
    icon: Store,
    component: ShopsProductFilter,
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
