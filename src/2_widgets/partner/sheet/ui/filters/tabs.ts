import {
  Calendar,
  CircleDotDashed,
  Grid2x2Check,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { DateFilter } from "@widgets/write-off/sheet/ui/side/date-filter";
import { PartnerShopsFilter } from "../side/shops-filter/partner-shops-filter";
import { PartnerProductsFilter } from "../side/products-filter/partner-products-filter";
import { PartnerGroupingFilter } from "../side/grouping-filter/ui";
import { PartnerMetricsFilter } from "../side/metrics-filter/ui";

export const partnerFilters = [
  { title: "Дата", icon: Calendar, component: DateFilter },
  { title: "Магазины", icon: Store, component: PartnerShopsFilter },
  { title: "Продукты", icon: ShoppingBasket, component: PartnerProductsFilter },
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
