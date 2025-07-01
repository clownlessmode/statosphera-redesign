import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@shared/ui/card";
import { Filter, Layers3 } from "lucide-react";
import { Button } from "@shared/ui/button";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { useMemo } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useRegionsStore } from "@widgets/write-off/sheet/ui/side/shops-filter/model/hooks/use-regions";
import { useCitiesStore } from "@widgets/write-off/sheet/ui/side/shops-filter/model/hooks/use-cities";
import { useShopsStore } from "@widgets/write-off/sheet/ui/side/shops-filter/model/hooks/use-shops";
import { useProduct } from "@widgets/write-off/sheet/ui/side/products-filter/model/hooks/use-product";
import { ARTICLE_WRITE_OFF } from "@widgets/write-off/sheet/model/filters-store";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";

const animationVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

interface WriteOffFiltersProps {
  isOpen: boolean;
  onOpenSheet: (type: string) => void;
}

export const WriteOffFilters = ({
  isOpen,
  onOpenSheet,
}: WriteOffFiltersProps) => {
  const { filters, groups, filterDate } = useFiltersStore();
  const { tab } = useTabStore();

  // Получаем сохраненные метки из store'ов
  const { savedRegionLabels } = useRegionsStore();
  const { savedCityLabels } = useCitiesStore();
  const { savedShopLabels } = useShopsStore();
  const { savedProductLabels } = useProduct({});
  // Формируем список выбранных фильтров
  const selectedFilters = useMemo(() => {
    const activeFilters: string[] = [];

    // Период
    if (filterDate.dateStart && filterDate.dateEnd) {
      const startDate = format(new Date(filterDate.dateStart), "dd.MM.yyyy", {
        locale: ru,
      });
      const endDate = format(new Date(filterDate.dateEnd), "dd.MM.yyyy", {
        locale: ru,
      });
      activeFilters.push(`Период: ${startDate} - ${endDate}`);
    }

    // Фильтры по магазинам
    if (filters.store.idStore.length > 0) {
      const shopNames = filters.store.idStore
        .map((id) => savedShopLabels.find((shop) => shop.value === id)?.label)
        .filter(Boolean);
      if (shopNames.length > 0) {
        activeFilters.push(`Магазины: ${shopNames.join(", ")}`);
      } else {
        activeFilters.push(`Магазины: ${filters.store.idStore.length}`);
      }
    }

    if (filters.store.idCity.length > 0) {
      const cityNames = filters.store.idCity
        .map((id) => savedCityLabels.find((city) => city.value === id)?.label)
        .filter(Boolean);
      if (cityNames.length > 0) {
        activeFilters.push(`Города: ${cityNames.join(", ")}`);
      } else {
        activeFilters.push(`Города: ${filters.store.idCity.length}`);
      }
    }

    if (filters.store.idRegion.length > 0) {
      const regionNames = filters.store.idRegion
        .map(
          (id) =>
            savedRegionLabels.find((region) => region.value === id)?.label,
        )
        .filter(Boolean);
      if (regionNames.length > 0) {
        activeFilters.push(`Регионы: ${regionNames.join(", ")}`);
      } else {
        activeFilters.push(`Регионы: ${filters.store.idRegion.length}`);
      }
    }

    if (filters.store.channel.length > 0) {
      activeFilters.push(`Каналы: ${filters.store.channel.join(", ")}`);
    }

    // Фильтры по продуктам
    if (filters.product.idProduct.length > 0) {
      const productNames = filters.product.idProduct
        .map(
          (id: string) =>
            savedProductLabels.find((product) => product.value === id)?.label,
        )
        .filter(Boolean);
      if (productNames.length > 0) {
        activeFilters.push(`Продукты: ${productNames.join(", ")}`);
      } else {
        activeFilters.push(`Продукты: ${filters.product.idProduct.length}`);
      }
    }

    if (filters.product.groupsMain.length > 0) {
      activeFilters.push(`Группы: ${filters.product.groupsMain.join(", ")}`);
    }

    if (filters.product.subGroups.length > 0) {
      activeFilters.push(`Подгруппы: ${filters.product.subGroups.join(", ")}`);
    }

    // Фильтры по списаниям (только для обычных списаний)
    if (tab === "write-off") {
      if (filters.writeoff.article.length > 0) {
        const articleNames = filters.writeoff.article.map(
          (article: ARTICLE_WRITE_OFF) => {
            // Получаем человекочитаемое название из enum
            const articleLabels: Record<ARTICLE_WRITE_OFF, string> = {
              [ARTICLE_WRITE_OFF.LOSSES]: "Потери",
              [ARTICLE_WRITE_OFF.EMPLOYEE_MEALS]: "Питание сотрудников",
              [ARTICLE_WRITE_OFF.TASTINGS]: "Дегустации",
              [ARTICLE_WRITE_OFF.CUSTOMER_GIFT]: "Подарок покупателю",
              [ARTICLE_WRITE_OFF.THEFTS]: "Кражи",
              [ARTICLE_WRITE_OFF.MARKETING]: "Маркетинг",
              [ARTICLE_WRITE_OFF.HOUSEHOLD_GOODS]: "Хозяйственные товары",
            };
            return articleLabels[article] || article;
          },
        );
        activeFilters.push(`Причины: ${articleNames.join(", ")}`);
      }

      if (filters.writeoff.household !== null) {
        activeFilters.push(
          `Хоз. товары: ${filters.writeoff.household ? "Да" : "Нет"}`,
        );
      }
    }

    return activeFilters;
  }, [
    filters,
    filterDate,
    savedShopLabels,
    savedCityLabels,
    savedRegionLabels,
    savedProductLabels,
    tab,
  ]);

  // Полный маппинг группировок на основе констант
  const groupingLabels: Record<string, string> = {
    // Временные группировки
    day: "День",
    month: "Месяц",
    quarter: "Квартал",
    week: "Неделя",
    year: "Год",
    hour: "Час",

    // Географические группировки
    store: "Магазин",
    city: "Город",
    region: "Регион",
    channel: "Канал",
    ageGroup: "Период деятельности магазина",
    storeCondition: "Статус магазина",

    // Продуктовые группировки
    product: "Номенклатура",
    group: "Группа",
    subGroups: "Подгруппа",
    subSubGroups: "Подподгруппа",
    groupsFranchise: "Структура продаж",
    groupsEconomist: "Справочник экономиста",
    typeProducts: "Тип поставщика",
    managerAuto: "Менеджер автозаказа",
    directionProducts: "Направление",
    seasonalityProducts: "Сезон",

    // Лояльность
    cardNumber: "Номер карты",
    sexLoyal: "Пол",
    loyalAge: "Возраст",
    discountType: "Тип скидки",

    // Онлайн магазин
    imTypeOrder: "Источник заказа",
    imDeliveryMethod: "Способ доставки",
    imPaymentMethod: "Способ оплаты",
    imStatusOrder: "Статус",
    imPromo: "Промо",
    imReceiveInterval: "Период доставки",

    // Чек
    idCheck: "ID чека",
    cashBox: "Номер кассы",
    type: "Тип чека",

    // Списания
    ops: "Тип списания",

    // Дополнительные
    tabNumber: "Кассиры",
    legalEntity: "Юр.лицо",
    nameManager: "Партнер",
    formatStore: "Формат магазина",
  };

  // Формируем список выбранных группировок
  const selectedGroupings = useMemo(() => {
    if (groups.length === 0) return ["Не выбрано"];

    return groups.map((group) => groupingLabels[group] || group);
  }, [groups]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="write-off-filters"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2 w-full"
        >
          <Card
            onClick={() => onOpenSheet("date")}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-1 p-2 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Filter className="size-4 flex-shrink-0" />
              <p className="text-sm flex-shrink-0">Фильтры:</p>
            </div>
            <div className="min-w-0 overflow-hidden">
              <div className="flex flex-wrap gap-1">
                {selectedFilters.length > 0 ? (
                  selectedFilters.map((filter, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                    >
                      {filter}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    не выбрано
                  </span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              className="flex-shrink-0 justify-between w-[200px]"
            >
              Изменить фильтры <Filter className="size-4" />
            </Button>
          </Card>

          <Card
            onClick={() => onOpenSheet("type")}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-1 p-2 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Layers3 className="size-4 flex-shrink-0" />
              <p className="text-sm flex-shrink-0">Группировка по:</p>
            </div>
            <div className="min-w-0 overflow-x-auto scrollbar-hide whitespace-nowrap">
              <div className="inline-flex gap-1">
                {selectedGroupings.map((grouping, index) => (
                  <span
                    key={index}
                    className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    {grouping}
                  </span>
                ))}
              </div>
            </div>
            <Button
              size="sm"
              className="flex-shrink-0 justify-between w-[200px]"
            >
              Изменить группировку <Layers3 className="size-4" />
            </Button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
