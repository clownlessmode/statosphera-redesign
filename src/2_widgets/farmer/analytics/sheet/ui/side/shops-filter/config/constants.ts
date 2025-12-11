import {
  AGE_GROUP,
  STORE_CONDITIONS,
} from "@widgets/farmer/analytics/sheet/model/filters-store";
import { Lock, LockOpen } from "lucide-react";

export const TIME = [
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

export const STATUS = [
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
