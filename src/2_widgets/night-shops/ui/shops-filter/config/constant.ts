import {
  AGE_GROUP,
  CHANNEL,
  STORE_CONDITIONS,
} from "@widgets/report/sheet/model/filters-store";
import {
  ShoppingBag,
  KeySquare,
  BarChart3,
  LockOpen,
  Lock,
} from "lucide-react";

export const CHANNEL_SHOP = [
  {
    label: "В аренду",
    value: CHANNEL.RENT,
    icon: KeySquare,
  },
  {
    label: "Инвестиционная",
    value: CHANNEL.INVEST,
    icon: BarChart3,
    disableCheck: true,
  },
  {
    label: "ФРС",
    value: CHANNEL.FRS,
    icon: ShoppingBag,
  },
];

export const AGE_GROUP_SHOP = [
  {
    label: "Менее 3 мес.",
    value: AGE_GROUP.NOT_CALCULATED,
  },
  {
    label: "От 3 до 6 мес.",
    value: AGE_GROUP.TODDLER,
  },
  {
    label: "От 6 до 12 мес.",
    value: AGE_GROUP.TEENAGER,
  },
  {
    label: "Более года",
    value: AGE_GROUP.ADULT,
  },
];

export const CONDITIONS_SHOP = [
  {
    label: "Открытые",
    value: STORE_CONDITIONS.OPEN,
    icon: LockOpen,
  },
  {
    label: "Закрытые",
    value: STORE_CONDITIONS.CLOSED,
    icon: Lock,
  },
];
