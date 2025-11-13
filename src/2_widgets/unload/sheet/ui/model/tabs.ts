import { Captions, Globe, ShoppingBasket, Store, Users } from "lucide-react";
import { MainFilter } from "../side/main-filter";
import { ShopsFilter } from "../side/shops-filter";
import { ProductsFilter } from "../side/products-filter";
import { ClientsFilter } from "../side/clients-filter";
import { OnlineFilter } from "../side/online-filter";

export const filters = [
  {
    title: "Основная информация",
    icon: Captions,
    component: MainFilter,
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
    title: "Продукты",
    icon: ShoppingBasket,
    component: ProductsFilter,
  },
  {
    title: "Интернет магазин",
    icon: Globe,
    component: OnlineFilter,
  },
];
