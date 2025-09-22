import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@shared/ui/button";
import { FilterBadges } from "./filter-badges";
import { GroupBadges } from "./group-badges";
import { ReportBadges } from "./values-badges";
import { Card } from "@shared/ui/card";
import { Filter, BarChart3, Layers3 } from "lucide-react";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useNavigate } from "react-router";
import {
  filters,
  grouping,
  indicators,
} from "@widgets/report/sheet/ui/commerce/model/tabs";

const animationVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const FiltersAccordeon = ({
  isOpen,
}: {
  defaultOpen?: boolean;
  isOpen?: boolean;
}) => {
  const { setTargetViewValue, tab } = useTabStore();
  const navigate = useNavigate();

  const handleOpenSheet = (targetValue: string | null) => {
    if (targetValue) {
      setTargetViewValue(targetValue);
      navigate(`/report?open=true&tab=${tab}`);
    }
  };

  const targetFilterValue = filters.length > 0 ? filters[0].title : null;
  const targetIndicatorValue =
    indicators.length > 0 ? indicators[0].title : null;
  const targetGroupingValue = grouping.length > 0 ? grouping[0].title : null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="filters-accordion"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2 w-full"
        >
          {/* Фильтры */}
          <Card
            onClick={() => handleOpenSheet(targetFilterValue)}
            className="items-center gap-1 p-2 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto]"
          >
            <div className="flex items-center gap-1">
              <Filter className="size-4 flex-shrink-0" />
              <p className="text-sm flex-shrink-0">Фильтры:</p>
            </div>
            <div className="min-w-0 overflow-x-auto scrollbar-hide whitespace-nowrap">
              <div className="inline-flex gap-1">
                <FilterBadges tab={tab} />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full max-md:mt-2 md:w-[220px] md:flex-shrink-0 md:justify-between"
            >
              Изменить фильтры <Filter className="size-4" />
            </Button>
          </Card>

          {/* Показатели */}
          <Card
            onClick={() => handleOpenSheet(targetIndicatorValue)}
            className="items-center gap-1 p-2 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto]"
          >
            <div className="flex items-center gap-1">
              <BarChart3 className="size-4 flex-shrink-0" />
              <p className="text-sm flex-shrink-0">Показатели:</p>
            </div>
            <div className="min-w-0 overflow-x-auto scrollbar-hide whitespace-nowrap">
              <div className="inline-flex gap-1">
                <ReportBadges tab={tab} />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full max-md:mt-2 md:w-[220px] md:flex-shrink-0 md:justify-between"
            >
              Изменить показатели <BarChart3 className="size-4" />
            </Button>
          </Card>

          {/* Группировки */}
          <Card
            onClick={() => handleOpenSheet(targetGroupingValue)}
            className="items-center gap-1 p-2 flex flex-row flex-wrap md:grid md:grid-cols-[auto_1fr_auto]"
          >
            <div className="flex items-center gap-1">
              <Layers3 className="size-4 flex-shrink-0" />
              <p className="text-sm flex-shrink-0">Группировки:</p>
            </div>
            <div className="min-w-0 overflow-x-auto scrollbar-hide whitespace-nowrap">
              <div className="inline-flex gap-1">
                <GroupBadges tab={tab} />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full max-md:mt-2 md:w-[220px] md:flex-shrink-0 md:justify-between"
            >
              Изменить группировки <Layers3 className="size-4" />
            </Button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FiltersAccordeon;
