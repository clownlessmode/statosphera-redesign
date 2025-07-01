import {
  Calendar,
  ChartLine,
  CircleDotDashed,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { DateFilter } from "../../side/date-filter";
import { ShopsFilter } from "../../side/shops-filter";
import { GroupingFilter } from "../../side/grouping-filter";
import { WriteOffFilter } from "../../side/write-off-filter";
import { ProductsFilter } from "../../side/products-filter";

// Фильтры для обычных списаний (включая типы списаний)
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

// Фильтры для списаний по поломкам (без типов списаний)
export const equipmentFilters = [
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
];

export const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: GroupingFilter,
  },
];
