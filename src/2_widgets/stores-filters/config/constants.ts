import {
  STORE_AGE_GROUP,
  STORE_STATUS,
  STORE_CHANNEL,
} from "../model/stores-filters-store";
import {
  Lock,
  LockOpen,
  KeySquare,
  BarChart3,
  ShoppingBag,
  Truck,
  Store,
  Box,
  Flame,
  Cookie,
  Coffee,
  Camera,
  Snowflake,
  TrendingUp,
  Moon,
  ShoppingCart,
} from "lucide-react";

export const TIME = [
  {
    label: "Менее 3 мес.",
    value: STORE_AGE_GROUP.NOT_CALCULATED,
  },
  {
    label: "От 3 до 6 мес.",
    value: STORE_AGE_GROUP.TODDLER,
  },
  {
    label: "От 6 до 12 мес.",
    value: STORE_AGE_GROUP.TEENAGER,
  },
  {
    label: "Более года",
    value: STORE_AGE_GROUP.ADULT,
  },
];

export const STATUS = [
  {
    label: "Открытые",
    value: STORE_STATUS.OPEN,
    icon: LockOpen,
  },
  {
    label: "Закрытые",
    value: STORE_STATUS.CLOSED,
    icon: Lock,
  },
];

export const CHANNELS = [
  {
    label: "В аренду",
    value: STORE_CHANNEL.RENT,
    icon: KeySquare,
  },
  {
    label: "Инвестиционная",
    value: STORE_CHANNEL.INVEST,
    icon: BarChart3,
    disableCheck: true,
  },
  {
    label: "ФРС",
    value: STORE_CHANNEL.FRS,
    icon: ShoppingBag,
  },
  {
    label: "Фудтрак",
    value: STORE_CHANNEL.FOODTRUCK,
    icon: Truck,
  },
  {
    label: "Микромаркет",
    value: STORE_CHANNEL.MICROMARKET,
    icon: Store,
  },
  {
    label: "Вендинг",
    value: STORE_CHANNEL.WENDING,
    icon: Box,
  },
];

// Опции для boolean фильтров (true/false/null)
export const BOOLEAN_OPTIONS = [
  { label: "Да", value: true },
  { label: "Нет", value: false },
];

// Дополнительные фильтры по оборудованию
export const EQUIPMENT_FILTERS = [
  { key: "grill", label: "Гриль", icon: Flame },
  { key: "dopeki", label: "Допеки", icon: Cookie },
  { key: "bakehouse", label: "Пекарня", icon: Cookie },
  { key: "brazier", label: "Мангал", icon: Flame },
  { key: "coffee", label: "Кофе", icon: Coffee },
  { key: "camera", label: "Камера", icon: Camera },
  { key: "milkRefrigerator", label: "Холодильник для молока", icon: Snowflake },
];

// Фильтры по возможностям магазина
export const CAPABILITIES_FILTERS = [
  { key: "shopOnAuto", label: "Магазин на автомате", icon: TrendingUp },
  { key: "deliveryIm", label: "Доставка ИМ", icon: ShoppingCart },
  { key: "walkingDelivery", label: "Пешая доставка", icon: ShoppingCart },
  { key: "nightStore", label: "Ночной магазин", icon: Moon },
];
