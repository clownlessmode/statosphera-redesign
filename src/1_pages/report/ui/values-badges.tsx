import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useIndicatorList } from "@widgets/report/sheet/ui/side/indicators/model/list";

// Компонент для отображения уникальных значений
export function UniqueBadges({ tab }: { tab: string }) {
  const { uniques } = useFiltersStore();
  const uniqueList = useIndicatorList(tab as any);

  if (!uniques || uniques.length === 0) return null;

  return (
    <Link
      to={`/report/?open=true&tab=${tab}&unique=${uniques.join(",")}`}
      className="flex flex-row gap-1 flex-wrap"
    >
      {uniques.map((unique, index) => (
        <Badge key={`unique-${index}`}>
          {getLabelByValue(uniqueList, unique) || unique}
        </Badge>
      ))}
    </Link>
  );
}
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
  value: string
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

export function IndicatorBadges({ tab }: { tab: string }) {
  const { indicators } = useFiltersStore();
  const indicatorList = useIndicatorList("check");

  if (!indicators || indicators.length === 0) return null;

  return (
    <Link
      to={`/report/?open=true&tab=${tab}&indicator=${indicators.join(",")}`}
      className="flex flex-row gap-1 flex-wrap"
    >
      {indicators.map((indicator, index) => (
        <Badge key={`indicator-${index}`}>
          {getLabelByValue(indicatorList, indicator) || indicator}
        </Badge>
      ))}
    </Link>
  );
}

// Объединенный компонент (опционально)
export function ReportBadges({ tab }: { tab: string }) {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <UniqueBadges tab={tab} />
      <IndicatorBadges tab={tab} />
    </div>
  );
}
