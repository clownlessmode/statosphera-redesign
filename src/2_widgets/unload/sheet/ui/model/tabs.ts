import {
  Calendar,
  ChartPie,
  Globe,
  ShoppingBasket,
  Store,
  Users,
} from "lucide-react";
import { DateFilter } from "../side/date-filter";
import { ShopsFilter } from "../side/shops-filter";
import { ProductsFilter } from "../side/products-filter";
import { MainFilter } from "../side/main-data";
import { LoyaltyFilter } from "../side/loyalty-filter";
import { OnlineFilter } from "../side/online-filter";

export const filters = [
  {
    title: "Сегменты и период",
    icon: ChartPie,
    component: MainFilter,
  },
  {
    title: "Дата",
    icon: Calendar,
    component: DateFilter,
  },
  {
    title: "Клиенты",
    icon: Users,
    component: LoyaltyFilter,
  },
  {
    title: "Магазины",
    icon: Store,
    component: ShopsFilter,
  },
  {
    title: "Интернет магазин",
    icon: Globe,
    component: OnlineFilter,
  },
  {
    title: "Продукты",
    icon: ShoppingBasket,
    component: ProductsFilter,
  },
];
