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

export const type = [
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

export const typeOrder = [
  {
    label: "Все",
    value: "all",
    icon: Badge,
  },
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

export const typeDelivery = [
  {
    label: "Все",
    value: "all",
    icon: Badge,
  },
  {
    label: "Доставка",
    value: "Курьер",
    icon: Truck,
  },
  {
    label: "Самовывоз",
    value: "Самовывоз",
    icon: Store,
  },
];

export const typePayment = [
  {
    label: "Все",
    value: "all",
    icon: Badge,
  },
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
