import type { PartnerTableGroup } from "@pages/partner/api/types";
import type { LucideIcon } from "lucide-react";
import { Calendar, ShoppingBasket, Store } from "lucide-react";

export type PartnerGroupingSection = {
  key: string;
  label: string;
  icon: LucideIcon;
  options: { value: PartnerTableGroup; label: string }[];
};

export const PARTNER_GROUPING_SECTIONS: PartnerGroupingSection[] = [
  {
    key: "days",
    label: "Дата",
    icon: Calendar,
    options: [
      { value: "day", label: "День" },
      { value: "week", label: "Неделя" },
      { value: "month", label: "Месяц" },
      { value: "quarter", label: "Квартал" },
      { value: "year", label: "Год" },
    ],
  },
  {
    key: "store",
    label: "Магазин",
    icon: Store,
    options: [{ value: "store", label: "Магазин" }],
  },
  {
    key: "product",
    label: "Продукт",
    icon: ShoppingBasket,
    options: [
      { value: "directionProducts", label: "Направление" },
      { value: "group", label: "Группа" },
      { value: "subGroups", label: "Подгруппа" },
      { value: "subSubGroups", label: "Подподгруппа" },
      { value: "product", label: "Товар" },
      { value: "groupsFranchise", label: "Франшиза" },
    ],
  },
];
