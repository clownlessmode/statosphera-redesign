import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@shared/ui/card";
import { BarChart3, Filter, Grid2x2Check, Layers3 } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Badge } from "@shared/ui/badge";
import { useMemo } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useWriteOffFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { usePartnerFiltersStore } from "../model/filters-store";
import { PARTNER_METRIC_LABELS } from "../lib/labels";
import { PARTNER_GROUPING_SECTIONS } from "@widgets/partner/sheet/ui/side/grouping-filter/config/constants";

const GROUP_LABELS = Object.fromEntries(
  PARTNER_GROUPING_SECTIONS.flatMap((s) =>
    s.options.map((o) => [o.value, o.label]),
  ),
);

const animationVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

type PartnerFiltersChipsProps = {
  isOpen: boolean;
  onOpenSheet: (section: string) => void;
};

export const PartnerFiltersChips = ({
  isOpen,
  onOpenSheet,
}: PartnerFiltersChipsProps) => {
  const { filterDate, filters } = useWriteOffFiltersStore();
  const { values, group } = usePartnerFiltersStore();

  const filterBadges = useMemo(() => {
    const list: string[] = [];

    if (filterDate.dateStart && filterDate.dateEnd) {
      const start = format(new Date(filterDate.dateStart), "dd.MM.yyyy", {
        locale: ru,
      });
      const end = format(new Date(filterDate.dateEnd), "dd.MM.yyyy", {
        locale: ru,
      });
      list.push(`${start} – ${end}`);
    }

    if (filters.store.idStore.length > 0) {
      list.push(`Магазины: ${filters.store.idStore.length}`);
    }
    if (filters.product.idProduct.length > 0) {
      list.push(`Товары: ${filters.product.idProduct.length}`);
    }
    if (filters.product.idGroupMain.length > 0) {
      list.push(`Группы: ${filters.product.idGroupMain.length}`);
    }
    if (filters.product.subGroups.length > 0) {
      list.push(`Подгруппы: ${filters.product.subGroups.length}`);
    }
    if (filters.product.subSubGroups.length > 0) {
      list.push(`Подподгруппы: ${filters.product.subSubGroups.length}`);
    }
    if (filters.product.directionProducts.length > 0) {
      list.push(`Направления: ${filters.product.directionProducts.length}`);
    }
    if (filters.product.groupFranchise.length > 0) {
      list.push(`Структура продаж: ${filters.product.groupFranchise.length}`);
    }
    if (filters.product.typeProducts.length > 0) {
      list.push(`Тип поставщика: ${filters.product.typeProducts.length}`);
    }

    return list;
  }, [filterDate, filters]);

  const metricBadges = useMemo(
    () => values.map((v) => PARTNER_METRIC_LABELS[v] ?? v),
    [values],
  );

  const groupingBadges = useMemo(
    () => group.map((g) => GROUP_LABELS[g] ?? g),
    [group],
  );

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="partner-filters-panel"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          className="flex flex-col gap-2 w-full overflow-hidden"
        >
          <Card
            className="items-center gap-2 p-3 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto] cursor-pointer hover:bg-muted/40 transition-colors"
            onClick={() => onOpenSheet("Дата")}
          >
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium">Фильтры</p>
            </div>
            <div className="min-w-0 flex flex-wrap gap-1">
              {filterBadges.length > 0 ? (
                filterBadges.map((badge) => (
                  <Badge key={badge} variant="default">
                    {badge}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Не выбрано
                </span>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="default"
              className="w-full max-md:mt-1 md:w-[200px] md:shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSheet("Дата");
              }}
            >
              Изменить фильтры <Filter className="size-4" />
            </Button>
          </Card>

          <Card
            className="items-center gap-2 p-3 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto] cursor-pointer hover:bg-muted/40 transition-colors"
            onClick={() => onOpenSheet("Показатели")}
          >
            <div className="flex items-center gap-2 shrink-0">
              <Grid2x2Check className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium">Показатели</p>
            </div>
            <div className="min-w-0 flex flex-wrap gap-1">
              {metricBadges.length > 0 ? (
                metricBadges.map((badge) => (
                  <Badge key={badge} variant="default">
                    {badge}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Не выбрано
                </span>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="default"
              className="w-full max-md:mt-1 md:w-[200px] md:shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSheet("Показатели");
              }}
            >
              Изменить показатели
              <BarChart3 className="size-4" />
            </Button>
          </Card>

          <Card
            className="items-center gap-2 p-3 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto] cursor-pointer hover:bg-muted/40 transition-colors"
            onClick={() => onOpenSheet("Группировка")}
          >
            <div className="flex items-center gap-2 shrink-0">
              <Layers3 className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium">Группировка</p>
            </div>
            <div className="min-w-0 overflow-x-auto scrollbar-hide">
              <div className="inline-flex flex-wrap gap-1">
                {groupingBadges.length > 0 ? (
                  groupingBadges.map((badge, index) => (
                    <Badge key={`${badge}-${index}`} variant="default">
                      {badge}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Не выбрано
                  </span>
                )}
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="default"
              className="w-full max-md:mt-1 md:w-[200px] md:shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSheet("Группировка");
              }}
            >
              Изменить группировки <Layers3 className="size-4" />
            </Button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
