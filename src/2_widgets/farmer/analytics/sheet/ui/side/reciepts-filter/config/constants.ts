import {
  Badge,
  Banknote,
  CreditCard,
  ShoppingCart,
  ArrowUpLeft,
} from "lucide-react";

export const TYPE_CHECK = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Продажа",
    value: "Продажа",
    icon: ShoppingCart,
  },
  {
    label: "Возврат",
    value: "Возврат",
    icon: ArrowUpLeft,
  },
];
export const TYPE_PAYMENTS = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Безналичный",
    value: "Безналичный",
    icon: CreditCard,
  },
  {
    label: "Наличный",
    value: "Наличный",
    icon: Banknote,
  },
];
