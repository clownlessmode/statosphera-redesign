import { User, Circle, UserRound, Bot } from "lucide-react";

export const SEX = [
  {
    label: "Мужской",
    value: "М",
    icon: User,
  },
  {
    label: "Женский",
    value: "Ж",
    icon: UserRound,
  },
  {
    label: "Не определено",
    value: "",
    icon: Bot,
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
