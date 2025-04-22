import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { product } from "@widgets/report/sheet/ui/side/grouping/ui/grouping";
import { shop } from "@widgets/report/sheet/ui/side/grouping/ui/grouping";
import { geo } from "@widgets/report/sheet/ui/side/grouping/ui/grouping";
import { days } from "@widgets/report/sheet/ui/side/grouping/ui/grouping";
import { Link } from "react-router";

const allGroups = [...days, ...geo, ...shop, ...product];

// Создаем маппинг value -> label
const groupValueToLabelMap = allGroups.reduce<Record<string, string>>(
  (acc, item) => {
    acc[item.value] = item.label;
    return acc;
  },
  {}
);

export function GroupBadges({ tab }: { tab: string }) {
  const { groups } = useFiltersStore();

  if (!groups || groups.length === 0) return null;

  return (
    <Link
      to={`/report/?open=true&tab=${tab}&group=${groups.join(",")}`}
      className="flex flex-row gap-1 flex-wrap"
    >
      {groups.map((group, index) => (
        <Badge key={`group-${index}`}>
          Группировка: {groupValueToLabelMap[group] || group}
        </Badge>
      ))}
    </Link>
  );
}
