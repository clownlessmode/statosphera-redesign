import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { Progress } from "@shared/ui/progress";
import { Separator } from "@shared/ui/separator";
import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";

import { Clock, MoreVertical, RotateCcw, Trash2 } from "lucide-react";

import { Lesson } from "../config";
import { useLessons, calculateLessonState, handleLessonClick } from "../model";

interface Props {
  lesson: Lesson;
  onStartLesson?: (lesson: Lesson) => void;
  onStartTest?: (lesson: Lesson) => void;
  onStartTour?: (lesson: Lesson) => void;
  onProgressChange?: () => void;
}

export const LessonCard: React.FC<Props> = ({
  lesson,
  onStartLesson,
  onStartTest,
  onStartTour,
}) => {
  const {
    resetProgress,
    resetLessonProgress,
    calculateProgress,
    getLessonProgress,
  } = useLessons();

  const progress = getLessonProgress(lesson.id);
  const progressValue = calculateProgress(lesson.id);

  // Используем бизнес-логику из model
  const lessonState = calculateLessonState(lesson, progress, progressValue);

  const handleClick = () => {
    handleLessonClick(
      lessonState.action,
      lesson,
      onStartLesson,
      onStartTest,
      onStartTour,
      resetProgress,
    );
  };

  const handleResetAttempt = () => {
    resetProgress(lesson.id);
  };

  const handleResetComplete = () => {
    resetLessonProgress(lesson.id);
  };

  return (
    <Card
      key={lesson.id}
      className="min-h-[320px] h-fit flex flex-col justify-between"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-2">
            {lesson.to.map((to: string, index: number) => (
              <Badge key={`${to}-${index}`} variant="default">
                {to}
              </Badge>
            ))}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" /> {lesson.duration}
            </div>
          </div>
          {lessonState.showDropdown && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {lessonState.hasProgress && (
                  <DropdownMenuItem onClick={handleResetAttempt}>
                    <RotateCcw className="mr-2 h-3 w-3" />
                    <span className="text-xs">Сбросить прогресс</span>
                  </DropdownMenuItem>
                )}
                {lessonState.hasAttempts && (
                  <DropdownMenuItem onClick={handleResetComplete}>
                    <Trash2 className="mr-2 h-3 w-3" />
                    <span className="text-xs">Сбросить всё</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <CardTitle className="flex items-center justify-between text-xl mt-4">
          <div className="flex items-center gap-2">
            {lesson.icon}
            {lesson.title}
          </div>
          {lessonState.progressValue > 0 && (
            <Badge
              variant={
                lessonState.progressValue === 100
                  ? "default"
                  : lessonState.progressValue > 0
                    ? "secondary"
                    : "outline"
              }
              className="text-xs"
            >
              {lessonState.progressValue === 100 && "Завершен"}
              {lessonState.progressValue > 0 &&
                lessonState.progressValue < 100 &&
                "В процессе"}
              {lessonState.progressValue === 0 && "Не начат"}
              {lessonState.completedCount > 0 &&
                ` (${lessonState.completedCount}x)`}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex flex-wrap gap-2">
          {lesson.tags.map((tag: string, index: number) => (
            <Badge
              key={`${tag}-${index}`}
              variant="outline"
              className="bg-muted/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center flex-col gap-2">
        <Separator className="w-full" />
        <div className="w-full  flex items-center gap-2">
          <Progress value={lessonState.progressValue} className="h-2" />
          <span className="text-xs font-medium">
            {lessonState.progressValue}%
          </span>
        </div>

        <div className="w-full space-y-2">
          <Button
            variant={lessonState.action === "restart" ? "outline" : "default"}
            className="w-full"
            onClick={handleClick}
          >
            {lessonState.action === "start" && "Начать"}
            {lessonState.action === "continue" && "Продолжить"}
            {lessonState.action === "restart" && "Начать заново"}
            {lessonState.action === "start_test" && "Начать тестирование"}
            {lessonState.action === "continue_test" &&
              "Продолжить тестирование"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
