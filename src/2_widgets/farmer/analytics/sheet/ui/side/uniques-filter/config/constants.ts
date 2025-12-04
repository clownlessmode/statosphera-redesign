import { COLUMN_KEY } from "@shared/constants/table-columns";
import { sortGroups } from "@shared/lib/sort-groups";
import { Landmark, Map, ShoppingBag } from "lucide-react";

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
        tooltip:
          "Количество уникальных магазинов, где были совершены покупки за выбранный период. Например: если покупали в 5 разных магазинах сети, значение будет 5",
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_LM,
        label: "Магазины PM",
        value: COLUMN_KEY.UNIQUE_STORE_LM,
        tooltip:
          "Количество уникальных магазинов, где были покупки в предыдущем месяце. Позволяет сравнить активность торговых точек",
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_LY,
        label: "Магазины PY",
        value: COLUMN_KEY.UNIQUE_STORE_LY,
        tooltip:
          "Количество уникальных магазинов за аналогичный период прошлого года. Помогает оценить развитие сети в годовом сравнении",
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
        tooltip:
          "Количество регионов, где были зафиксированы покупки. Отражает географический охват сети",
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_LM,
        label: "Регионы PM",
        value: COLUMN_KEY.UNIQUE_REGION_LM,
        tooltip:
          "Количество регионов с покупками в предыдущем месяце. Показывает стабильность регионального присутствия",
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_LY,
        label: "Регионы PY",
        value: COLUMN_KEY.UNIQUE_REGION_LY,
        tooltip:
          "Количество регионов с покупками год назад. Помогает оценить расширение или сокращение географии продаж",
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
        tooltip:
          "Количество городов, где совершались покупки. Например: если покупали в Кемерово, Новосибирске и Анжеро-Судженске - значение будет 3",
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_LM,
        label: "Города PM",
        value: COLUMN_KEY.UNIQUE_CITY_LM,
        tooltip:
          "Количество городов с покупками в прошлом месяце. Показывает активность в населенных пунктах",
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_LY,
        label: "Города PY",
        value: COLUMN_KEY.UNIQUE_CITY_LY,
        tooltip:
          "Количество городов с покупками год назад. Демонстрирует динамику городского покрытия",
      },
    ],
  },
];

interface IndicatorGroup {
  id: string;
  label: string;
  value: string;
  icon: any;
  children: {
    id: string;
    label: string;
    value: string;
    tooltip?: string;
  }[];
}

export function excludeIndicators(
  source: IndicatorGroup[],
  excludeList: string[],
): IndicatorGroup[] {
  return source
    .filter((group) => !excludeList.includes(group.id))
    .map((group) => {
      const filteredChildren = group.children.filter(
        (child) => !excludeList.includes(child.id),
      );

      if (filteredChildren.length === 0) {
        return undefined;
      }

      return {
        ...group,
        children: filteredChildren,
      };
    })
    .filter((group): group is IndicatorGroup => Boolean(group));
}

export const useUniqueValues = () => {
  const filtered = sortGroups(all_unique);
  const commerce = excludeIndicators(filtered, [
    "cardNumberUniqueGroup",
    "checkUniqueGroup",
  ]);

  return commerce;
};
