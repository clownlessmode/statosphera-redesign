import { FC } from "react";
import { cn } from "@shared/lib/utils";
import { Circle } from "lucide-react";

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
    <Circle
      fill="currentColor"
      className={cn(
        "size-2 rounded-full block",
        variant === "positive" ? "text-positive" : "text-destructive",
        className,
      )}
    />
  );
};

export default StatusBadge;
