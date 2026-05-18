import type { PartnerTableGroup } from "@pages/partner/api/types";
import type { LucideIcon } from "lucide-react";
import { Calendar, ShoppingBasket, Store } from "lucide-react";

export const PARTNER_DAYS = [
  { value: "day" as PartnerTableGroup, label: "День" },
  { value: "week" as PartnerTableGroup, label: "Неделя" },
  { value: "month" as PartnerTableGroup, label: "Месяц" },
  { value: "quarter" as PartnerTableGroup, label: "Квартал" },
  { value: "year" as PartnerTableGroup, label: "Год" },
];

export const PARTNER_STORE = [
  { value: "store" as PartnerTableGroup, label: "Магазин" },
];

export const PARTNER_PRODUCT = [
  { value: "product" as PartnerTableGroup, label: "Номенклатура" },
  { value: "subSubGroups" as PartnerTableGroup, label: "Подподгруппа" },
  { value: "subGroups" as PartnerTableGroup, label: "Подгруппа" },
  { value: "group" as PartnerTableGroup, label: "Группа" },
  { value: "directionProducts" as PartnerTableGroup, label: "Направление" },
  { value: "groupsFranchise" as PartnerTableGroup, label: "Структура продаж" },
  { value: "typeProducts" as PartnerTableGroup, label: "Тип поставщика" },
];

export type PartnerGroupingSection = {
  key: string;
  label: string;
  icon: LucideIcon;
  options: { value: PartnerTableGroup; label: string }[];
};

/** Для чипов на странице */
export const PARTNER_GROUPING_SECTIONS: PartnerGroupingSection[] = [
  {
    key: "days",
    label: "Дата",
    icon: Calendar,
    options: [...PARTNER_DAYS],
  },
  {
    key: "store",
    label: "Магазин",
    icon: Store,
    options: [...PARTNER_STORE],
  },
  {
    key: "product",
    label: "Продукт",
    icon: ShoppingBasket,
    options: [...PARTNER_PRODUCT],
  },
];
