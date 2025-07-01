import { Pizza, Salad, Utensils } from "lucide-react";

export const HEALTHY = [
  {
    label: "Все",
    value: null,
    icon: Utensils,
  },
  {
    label: "ПП",
    value: true,
    icon: Salad,
  },
  {
    label: "Не ПП",
    value: false,
    icon: Pizza,
  },
];
