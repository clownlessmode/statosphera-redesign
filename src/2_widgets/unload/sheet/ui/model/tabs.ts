import {
  ChartPie,
  Globe,
  Receipt,
  ShoppingBasket,
  Store,
  Users,
} from "lucide-react";
import { DateFilter } from "../side/date-filter";
import { ShopsFilter } from "../side/shops-filter";
import { ProductsFilter } from "../side/products-filter";
import { MainFilter } from "../side/main-data";
import { ClientsFilter } from "../side/clients-filter";
import { OnlineFilter } from "../side/online-filter";

export const filters = [
  {
    title: "Сегменты и период",
    icon: ChartPie,
    component: MainFilter,
  },
  {
    title: "Покупки",
    icon: Receipt,
    component: DateFilter,
  },
  {
    title: "Клиенты",
    icon: Users,
    component: ClientsFilter,
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
