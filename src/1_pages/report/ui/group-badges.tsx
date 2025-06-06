import { Badge } from "@shared/ui/badge";
import {
  GROUPINGS,
  useFiltersStore,
} from "@widgets/report/sheet/model/filters-store";
import {
  DAYS,
  GEO,
  ID,
  LOYAL,
  ONLINE,
  PERSONAL,
  PRODUCT,
  SHOP,
} from "@widgets/report/sheet/ui/side/grouping-filter";

import { Link } from "react-router";

const allGroups = [
  ...DAYS,
  ...GEO,
  ...SHOP,
  ...PRODUCT,
  ...LOYAL,
  ...PERSONAL,
  ...ONLINE,
  ...ID,
  {
    label: "Час",
    value: GROUPINGS.HOUR,
  },
];
// Создаем маппинг value -> label
const groupValueToLabelMap = allGroups.reduce<Record<string, string>>(
  (acc, item) => {
    acc[item.value] = item.label;
    return acc;
  },
  {},
);

export function GroupBadges({ tab }: { tab: string }) {
  const { groups } = useFiltersStore();

  if (!groups || groups.length === 0) return null;

  return (
    <Link
      to={`/report/?open=true&tab=${tab}&group=${groups.join(",")}`}
      className="flex gap-2 flex-nowrap w-max"
    >
      {groups.map((group, index) => (
        <Badge key={`group-${index}`}>
          {groupValueToLabelMap[group] || group}
        </Badge>
      ))}
    </Link>
  );
}
