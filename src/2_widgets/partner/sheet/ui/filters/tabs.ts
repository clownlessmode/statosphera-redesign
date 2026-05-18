import {
  Calendar,
  CircleDotDashed,
  Grid2x2Check,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { DateFilter } from "@widgets/write-off/sheet/ui/side/date-filter";
import { ShopsFilter } from "@widgets/write-off/sheet/ui/side/shops-filter";
import { ProductsFilter } from "@widgets/write-off/sheet/ui/side/products-filter";
import { PartnerGroupingFilter } from "../side/grouping-filter/grouping-filter";
import { PartnerMetricsFilter } from "../side/metrics-filter/metrics-filter";

export const partnerFilters = [
  { title: "Дата", icon: Calendar, component: DateFilter },
  { title: "Магазины", icon: Store, component: ShopsFilter },
  { title: "Продукты", icon: ShoppingBasket, component: ProductsFilter },
];

export const partnerGrouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: PartnerGroupingFilter,
  },
];

export const partnerIndicators = [
  {
    title: "Показатели",
    icon: Grid2x2Check,
    component: PartnerMetricsFilter,
  },
];
