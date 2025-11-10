import {
  BadgeCheck,
  BadgeX,
  User2,
  User,
  Badge,
  Users,
  Circle,
} from "lucide-react";

export const TYPE = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Лояльность",
    value: true,
    icon: BadgeCheck,
  },
  {
    label: "Кроме лояльности",
    value: false,
    icon: BadgeX,
  },
];
export const GENDER = [
  {
    label: "Все",
    value: null,
    icon: Users,
  },
  {
    label: "Мужской",
    value: "M",
    icon: User,
  },
  {
    label: "Женский",
    value: "Ж",
    icon: User2,
  },
];

export const COLORS = [
  {
    label: "Остальные",
    value: "other",
    icon: Circle,
  },
  {
    label: "Оранжевый",
    value: "orange",
    icon: Circle,
  },
];
