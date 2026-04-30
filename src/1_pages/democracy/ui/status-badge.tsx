import { Badge } from "@shared/ui/badge";
import { Status } from "../api/types";

export const StatusBadge = ({ status }: { status: Status }) => {
  switch (status) {
    case "DONE":
      return <Badge variant="positive">Реализовано</Badge>;
    case "DENIED":
      return <Badge variant="destructive">Отклонено</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="outline">В разработке</Badge>;
    default:
      return null;
  }
};
