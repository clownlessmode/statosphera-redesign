import { Link } from "react-router";
import { Badge } from "@shared/ui/badge";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

export function GroupBadges({ tab }: { tab: string }) {
  const { groups } = useFiltersStore();

  if (!groups || groups.length === 0) return null;

  return (
    <Link
      to={`/report/?open=true&tab=${tab}&group=${groups.join(",")}`}
      className="flex flex-row gap-1 flex-wrap"
    >
      {groups.map((group, index) => (
        <Badge key={`group-${index}`}>Группировка: {group}</Badge>
      ))}
    </Link>
  );
}
