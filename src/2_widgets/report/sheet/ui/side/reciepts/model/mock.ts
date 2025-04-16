import { Slash, Badge, Banknote, CreditCard, QrCode } from "lucide-react";

export const typePayment = [
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

export const typeQR = [
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
