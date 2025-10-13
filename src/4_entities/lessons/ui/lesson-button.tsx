/* eslint-disable no-case-declarations */
import React from "react";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
// import { LessonAction } from "../types/progress";
import { LessonBadgeComponent } from "./lesson-badge";
import { useLessonProgress } from "../hooks/use-lesson-progress";

interface LessonButtonProps {
  lessonId: string;
  totalSteps: number;
  onStart?: () => void;
  onContinue?: (step: number) => void;
  onRestart?: () => void;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  showBadge?: boolean;
  showProgress?: boolean;
}

export const LessonButton: React.FC<LessonButtonProps> = ({
  lessonId,
  totalSteps,
  onStart,
  onContinue,
  onRestart,
  className,
  variant = "default",
  size = "default",
  showBadge = true,
  showProgress = true,
}) => {
  const {
    getLessonAction,
    getLessonBadge,
    getCompletedCount,
    getProgressPercentage,
    getLessonProgress,
    startLesson,
    restartLesson,
  } = useLessonProgress();

  const action = getLessonAction(lessonId);
  const badge = getLessonBadge(lessonId);
  const completedCount = getCompletedCount(lessonId);
  const progressPercentage = getProgressPercentage(lessonId);
  const progress = getLessonProgress(lessonId);

  const handleClick = () => {
    switch (action.type) {
      case "start":
        startLesson(lessonId, totalSteps);
        onStart?.();
        break;

      case "continue":
        const stepToContinue = progress?.currentStep || 0;
        onContinue?.(stepToContinue);
        break;

      case "restart":
        restartLesson(lessonId);
        onRestart?.();
        break;
    }
  };

  const getButtonIcon = () => {
    switch (action.type) {
      case "start":
        return "▶️";
      case "continue":
        return "⏯️";
      case "restart":
        return "🔄";
      default:
        return "▶️";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleClick}
          variant={variant}
          size={size}
          className={cn("flex items-center gap-2", className)}
        >
          <span>{getButtonIcon()}</span>
          <span>{action.label}</span>
        </Button>

        {showBadge && (
          <LessonBadgeComponent badge={badge} completedCount={completedCount} />
        )}
      </div>

      {showProgress && progress && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs">{progressPercentage}%</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground">{action.description}</p>
    </div>
  );
};
