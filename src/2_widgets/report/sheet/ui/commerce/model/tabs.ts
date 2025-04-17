import {
  Calendar,
  CircleDotDashed,
  Combine,
  Grid2x2Check,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { DateFilter } from "../../side/date";
import Shops from "../../side/shops/ui/shops";
import Products from "../../side/products/ui/products";
import Grouping from "../../side/grouping/ui/grouping";
import { Indicators } from "../../side/indicators";
import Unique from "../../side/unique/ui/unique";

export const filters = [
  {
    title: "Дата",
    icon: Calendar,
    component: DateFilter,
  },
  {
    title: "Магазины",
    icon: Store,
    component: Shops,
  },
  {
    title: "Продукты",
    icon: ShoppingBasket,
    component: Products,
  },
];

export const grouping = [
  {
    title: "Группировка",
    icon: CircleDotDashed,
    component: Grouping,
  },
];

export const indicators = [
  {
    title: "Показатели",
    icon: Grid2x2Check,
    component: Indicators,
  },
  {
    title: "Уникальные значения",
    icon: Combine,
    component: Unique,
  },
];
