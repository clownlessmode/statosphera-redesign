import { COLUMN_KEY } from "@shared/constants/table-columns";
import { sortGroups } from "@shared/lib/sort-groups";
import {
  CreditCard,
  Landmark,
  Map,
  Receipt,
  Share2,
  ShoppingBag,
} from "lucide-react";

const all_unique = [
  {
    id: "storeUniqueGroup",
    label: "Магазины",
    value: "storeUniqueGroup",
    icon: ShoppingBag,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_STORE,
        label: "Магазины",
        value: COLUMN_KEY.UNIQUE_STORE,
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_LM,
        label: "Магазины PM",
        value: COLUMN_KEY.UNIQUE_STORE_LM,
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_LY,
        label: "Магазины PY",
        value: COLUMN_KEY.UNIQUE_STORE_LY,
      },
    ],
  },
  {
    id: "channelUniqueGroup",
    label: "Каналы",
    value: "channelUniqueGroup",
    icon: Share2,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL,
        label: "Каналы",
        value: COLUMN_KEY.UNIQUE_CHANNEL,
      },
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_LM,
        label: "Каналы PM",
        value: COLUMN_KEY.UNIQUE_CHANNEL_LM,
      },
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_LY,
        label: "Каналы PY",
        value: COLUMN_KEY.UNIQUE_CHANNEL_LY,
      },
    ],
  },
  {
    id: "regionUniqueGroup",
    label: "Регионы",
    value: "regionUniqueGroup",
    icon: Map,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_REGION,
        label: "Регионы",
        value: COLUMN_KEY.UNIQUE_REGION,
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_LM,
        label: "Регионы PM",
        value: COLUMN_KEY.UNIQUE_REGION_LM,
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_LY,
        label: "Регионы PY",
        value: COLUMN_KEY.UNIQUE_REGION_LY,
      },
    ],
  },
  {
    id: "cityUniqueGroup",
    label: "Города",
    value: "cityUniqueGroup",
    icon: Landmark,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CITY,
        label: "Города",
        value: COLUMN_KEY.UNIQUE_CITY,
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_LM,
        label: "Города PM",
        value: COLUMN_KEY.UNIQUE_CITY_LM,
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_LY,
        label: "Города PY",
        value: COLUMN_KEY.UNIQUE_CITY_LY,
      },
    ],
  },
  {
    id: "cardNumberUniqueGroup",
    label: "Номера карт",
    value: "cardNumberUniqueGroup",
    icon: CreditCard,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER,
        label: "Номера карт",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER,
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_LM,
        label: "Номера карт PM",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_LM,
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_LY,
        label: "Номера карт PY",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_LY,
      },
    ],
  },
  {
    id: "checkUniqueGroup",
    label: "Чек",
    value: "checkUniqueGroup",
    icon: Receipt,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHECK,
        label: "Чек",
        value: COLUMN_KEY.UNIQUE_CHECK,
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_LM,
        label: "Чек PM",
        value: COLUMN_KEY.UNIQUE_CHECK_LM,
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_LY,
        label: "Чек PY",
        value: COLUMN_KEY.UNIQUE_CHECK_LY,
      },
    ],
  },
];
interface IndicatorGroup {
  id: string;
  label: string;
  value: string;
  icon: any;
  children: { id: string; label: string; value: string }[];
}
export function excludeIndicators(
  source: IndicatorGroup[],
  excludeList: string[]
): IndicatorGroup[] {
  return source
    .filter((group) => !excludeList.includes(group.id)) // убираем группы
    .map((group) => {
      const filteredChildren = group.children.filter(
        (child) => !excludeList.includes(child.id)
      );

      // Если после удаления детей ничего не осталось, вернем undefined
      if (filteredChildren.length === 0) {
        return undefined;
      }

      return {
        ...group,
        children: filteredChildren,
      };
    })
    .filter((group): group is IndicatorGroup => Boolean(group)); // правильная фильтрация
}
export const useUniqueValues = (type: "check" | "commerce") => {
  const filtered = sortGroups(all_unique);
  const check = excludeIndicators(filtered, []);
  const commerce = excludeIndicators(filtered, [
    "cardNumberUniqueGroup",
    "checkUniqueGroup",
  ]);
  if (type === "check") {
    return check;
  }
  return commerce;
};
