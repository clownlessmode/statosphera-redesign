import { Captions, Globe, ShoppingBasket, Store, Users } from "lucide-react";
import { DateFilter } from "../side/date-filter";
import { ShopsFilter } from "../side/shops-filter";
import { ProductsFilter } from "../side/products-filter";
import { ClientsFilter } from "../side/clients-filter";
import { OnlineFilter } from "../side/online-filter";

export const filters = [
  {
    title: "Основная информация",
    icon: Captions,
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
