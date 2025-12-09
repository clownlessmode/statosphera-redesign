import {
  Calendar,
  CircleDotDashed,
  ShoppingBasket,
  Store,
  ChartLine,
} from "lucide-react";

import { DateFilter } from "../../side/date-filter";
import { ShopsFilter } from "../../side/shops-filter";
import { ProductsFilter } from "../../side/products-filter";
import { GroupingFilter } from "../../side/grouping-filter";
import { WriteOffFilter } from "../../side/write-off-filter";

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
    title: "Продукты",
    icon: ShoppingBasket,
    component: ProductsFilter,
  },
  {
    title: "Типы списаний",
    icon: ChartLine,
    component: WriteOffFilter,
  },
];

export const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: GroupingFilter,
  },
];
