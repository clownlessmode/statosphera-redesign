import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { useIndicatorList } from "@widgets/forest/sheet/ui/side/indicators-filter";
import { useUniqueValues } from "@widgets/forest/sheet/ui/side/uniques-filter";
// Компонент для отображения уникальных значений

type WithChildren<T = any> = {
  label: string;
  value: string;
  children?: WithChildren<T>[];
};

/**
 * Ищет label по значению value в дереве
 */
export function getLabelByValue(
  list: WithChildren[],
  value: string,
): string | undefined {
  for (const item of list) {
    if (item.value === value) {
      return item.label;
    }

    if (item.children) {
      const found = getLabelByValue(item.children, value);
      if (found) return found;
    }
  }

  return undefined;
}
export function UniqueBadges({ tab }: { tab: string }) {
  const { uniques } = useFiltersStore();
  const uniqueList = useUniqueValues(tab as any);

  if (!uniques || uniques.length === 0) return null;

  return (
    <>
      {uniques.map((unique, index) => (
        <Badge key={`unique-${index}`} className="flex-shrink-0">
          {getLabelByValue(uniqueList, unique) || unique}
        </Badge>
      ))}
    </>
  );
}

export function IndicatorBadges({ tab }: { tab: string }) {
  const { indicators } = useFiltersStore();
  const indicatorList = useIndicatorList(tab as any);

  if (!indicators || indicators.length === 0) return null;

  return (
    <>
      {indicators.map((indicator, index) => (
        <Badge key={`indicator-${index}`} className="flex-shrink-0">
          {getLabelByValue(indicatorList, indicator) || indicator}
        </Badge>
      ))}
    </>
  );
}

export function ForestBadges({ tab }: { tab: string }) {
  return (
    <div className="flex-1 min-w-0 overflow-x-auto">
      <div className="flex gap-2 flex-nowrap w-max ">
        <UniqueBadges tab={tab} />
        <IndicatorBadges tab={tab} />
      </div>
    </div>
  );
}
