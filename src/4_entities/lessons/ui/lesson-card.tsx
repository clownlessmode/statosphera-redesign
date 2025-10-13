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
import { Clock } from "lucide-react";
import { Lesson } from "../config";
// import { LessonButton } from "./lesson-button";
import { useLessonProgress } from "../hooks/use-lesson-progress";

interface Props {
  lesson: Lesson;
  onStartLesson?: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<Props> = ({ lesson, onStartLesson }) => {
  const { getLessonAction, getLessonBadge, getCompletedCount } =
    useLessonProgress();

  const action = getLessonAction(lesson.id.toString());
  const badge = getLessonBadge(lesson.id.toString());
  const completedCount = getCompletedCount(lesson.id.toString());

  const handleClick = () => {
    onStartLesson?.(lesson);
  };

  return (
    <Card
      key={lesson.id}
      className="min-h-[320px] h-fit flex flex-col justify-between"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-1">
            {lesson.to.map((to, index) => (
              <Badge key={`${to}-${index}`} variant="default">
                {to}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" /> {lesson.duration}
          </div>
        </div>
        <CardTitle className="flex items-center justify-between text-xl mt-4">
          <div className="flex items-center gap-2">
            {lesson.icon}
            {lesson.title}
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge.text}
              {badge.showCount && completedCount > 1 && ` x${completedCount}`}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex flex-wrap gap-2">
          {lesson.tags.map((tag, index) => (
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
          <Progress value={lesson.progress} className="h-2" />
          <span className="text-xs font-medium">{lesson.progress}%</span>
        </div>
        <div className="w-full space-y-2">
          <Button
            variant={action.type === "restart" ? "outline" : "default"}
            className="w-full"
            onClick={handleClick}
          >
            {action.label}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
