import { BadgeCheck, BadgeX, User2, User, Badge, Users } from "lucide-react";

export const type = [
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
export const gender = [
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
