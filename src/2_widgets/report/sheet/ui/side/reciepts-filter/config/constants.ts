import {
  Slash,
  Badge,
  Banknote,
  CreditCard,
  QrCode,
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

export const TYPE_QR = [
  {
    label: "Все",
    value: null,
    icon: Badge, // Общая иконка
  },
  {
    label: "C QR",
    value: true,
    icon: QrCode, // Иконка QR-кода
  },
  {
    label: "Без QR",
    value: false,
    icon: Slash,
  },
];
