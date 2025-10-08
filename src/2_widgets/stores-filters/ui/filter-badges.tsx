import { Badge } from "@shared/ui/badge";
import { useStoresFiltersStore } from "../model/stores-filters-store";
import { JSX } from "react";

const getFilterLabel = (filterKey: string): string => {
  const labels: Record<string, string> = {
    idStore: "Магазины",
    idCity: "Города",
    idRegion: "Регионы",
    idManager: "Партнеры",
    storeCondition: "Статус",
    ageGroup: "Период",
    channel: "Каналы",
    shopOnAuto: "Магазин на автомате",
    deliveryIm: "Доставка ИМ",
    walkingDelivery: "Пешая доставка",
    nightStore: "Ночной магазин",
    grill: "Гриль",
    dopeki: "Допеки",
    bakehouse: "Пекарня",
    brazier: "Мангал",
    coffee: "Кофе",
    camera: "Камера",
    milkRefrigerator: "Холодильник",
  };

  return labels[filterKey] || filterKey;
};

export const FilterBadges = () => {
  const { filters } = useStoresFiltersStore();

  const renderBadges = () => {
    const badges: JSX.Element[] = [];

    // Проходим по всем фильтрам
    Object.entries(filters).forEach(([filterKey, value]) => {
      // Пропускаем даты и другие служебные поля
      if (
        filterKey === "startDate" ||
        filterKey === "endDate" ||
        filterKey === "idLegalEntity" ||
        filterKey === "district" ||
        filterKey === "typeCoffee" ||
        filterKey === "ownershipCoffee" ||
        filterKey === "pizzaCm" ||
        filterKey === "pizzaDaysSchedule" ||
        filterKey === "pizzaHoursSchedule" ||
        filterKey === "maxPower" ||
        filterKey === "format" ||
        filterKey === "discountTime"
      ) {
        return;
      }

      // Пропускаем пустые значения
      if (value === null || value === undefined) return;

      // Для массивов - проверяем длину
      if (Array.isArray(value)) {
        if (value.length === 0) return;
        badges.push(
          <Badge key={filterKey}>
            {`${getFilterLabel(filterKey)}: ${value.length}`}
          </Badge>,
        );
      } else if (typeof value === "boolean") {
        // Для boolean показываем значение
        badges.push(
          <Badge key={filterKey}>
            {`${getFilterLabel(filterKey)}: ${value ? "Да" : "Нет"}`}
          </Badge>,
        );
      }
    });

    return badges;
  };

  const badges = renderBadges();

  if (badges.length === 0) {
    return <Badge>Не выбрано</Badge>;
  }

  return <>{badges}</>;
};
