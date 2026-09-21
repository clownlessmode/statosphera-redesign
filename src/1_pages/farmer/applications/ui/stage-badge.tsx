import { Badge, badgeVariants } from "@shared/ui/badge";
import { Stage, StageCategory } from "../config/stage-flow";
import { FC } from "react";
import { VariantProps } from "class-variance-authority";

const stageBadgeVariants: Record<
  StageCategory,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  success: "positive",
  fail: "destructive",
  action_required: "muted",
  in_progress: "muted",
};

export const StageBadge: FC<{ stage?: Stage }> = ({ stage }) => {
  if (!stage) return null;
  const variant = stageBadgeVariants[stage.category] ?? "outline";

  return <Badge variant={variant}>{stage.shortName}</Badge>;
};
