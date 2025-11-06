import {
  Calendar,
  ChartPie,
  Grid2x2Check,
  PanelsTopLeft,
  Store,
} from "lucide-react";
import { DateFilter } from "../side/date-filter";
import { ShopsFilter } from "../side/shops-filter";
import { ProductsFilter } from "../side/products-filter";

export const filters = [
  {
    title: "Дата",
    icon: Calendar,
    component: DateFilter,
  },
  {
    title: "Города и магазины",
    icon: Store,
    component: ShopsFilter,
  },
  {
    title: "Группы и номенклатуры",
    icon: PanelsTopLeft,
    component: ProductsFilter,
  },
  {
    title: "Сегменты",
    icon: ChartPie,
    component: ShopsFilter,
  },
  {
    title: "Показатели",
    icon: Grid2x2Check,
    component: ProductsFilter,
  },
];
