import { Calendar, CircleDotDashed, ShoppingBasket, Store } from "lucide-react";
import { DateFilter } from "../../side/date-filter";
import { ShopsFilter } from "../../side/shops-filter";
import { ProductsFilter } from "../../side/products-filter";
import { GroupingFilter } from "../../side/grouping-filter";

// Фильтры для сводной таблицы
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
];

export const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: GroupingFilter,
  },
];
