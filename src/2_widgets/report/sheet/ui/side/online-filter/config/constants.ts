import {
  Badge,
  Store,
  Globe,
  Smartphone,
  MonitorSmartphone,
  Truck,
  CreditCard,
  Building,
} from "lucide-react";

export const TYPE = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Только ИМ",
    value: true,
    icon: Globe,
  },
  {
    label: "Кроме ИМ",
    value: false,
    icon: Store,
  },
];

export const TYPE_ORDER = [
  {
    label: "Приложение",
    value: "Мобилка",
    icon: Smartphone,
  },
  {
    label: "Сайт",
    value: "Сайт",
    icon: MonitorSmartphone,
  },
];

export const TYPE_DELIVERY = [
  {
    label: "Курьер",
    value: "Курьер",
    icon: Truck,
  },
  {
    label: "Самовывоз",
    value: "Самовывоз",
    icon: Store,
  },
  {
    label: "Сбермаркет",
    value: "Сбермаркет",
    icon: Globe,
  },
];

export const TYPE_PAYMENT = [
  {
    label: "Онлайн",
    value: "Онлайн",
    icon: Globe,
  },
  {
    label: "Офлайн",
    value: "Офлайн",
    icon: Building,
  },
  {
    label: "Картой курьеру",
    value: "Картой курьера",
    icon: CreditCard,
    disableCheck: true,
  },
];
