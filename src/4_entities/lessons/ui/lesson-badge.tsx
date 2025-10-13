import React from "react";
import { cn } from "@shared/lib/utils";
import { LessonBadge } from "../types/progress";

interface LessonBadgeProps {
  badge: LessonBadge | null;
  completedCount: number;
  className?: string;
}

export const LessonBadgeComponent: React.FC<LessonBadgeProps> = ({
  badge,
  completedCount,
  className,
}) => {
  if (!badge) return null;

  const getVariantStyles = (variant: LessonBadge["variant"]) => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "secondary":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        getVariantStyles(badge.variant),
        className,
      )}
    >
      <span>{badge.text}</span>
      {badge.showCount && completedCount > 1 && (
        <span className="ml-1 font-bold">x{completedCount}</span>
      )}
    </div>
  );
};
