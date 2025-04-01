import { FC } from "react";
import { Badge } from "@shared/ui/badge";

interface StatusBadgeProps {
  status: string | null | undefined;
  positiveValues?: string[];
  negativeValues?: string[];
  className?: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({
  status,
  positiveValues = ["действующие"],
  negativeValues = ["закрытые"],
  className = "",
}) => {
  const normalizedStatus = (status ?? "").toLowerCase().trim();

  let variant: "positive" | "destructive" | "secondary" = "secondary";

  if (positiveValues.map((s) => s.toLowerCase()).includes(normalizedStatus)) {
    variant = "positive";
  } else if (
    negativeValues.map((s) => s.toLowerCase()).includes(normalizedStatus)
  ) {
    variant = "destructive";
  }

  return (
    <Badge variant={variant} className={`capitalize ${className}`}>
      {normalizedStatus || "неизвестно"}
    </Badge>
  );
};

export default StatusBadge;
