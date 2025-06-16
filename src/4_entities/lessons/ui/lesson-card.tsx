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
interface Props {
  lesson: Lesson;
}
export const LessonCard: React.FC<Props> = ({ lesson }) => {
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
        <CardTitle className="flex items-center gap-2 text-xl mt-4">
          {lesson.icon}
          {lesson.title}
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
        <Button
          variant={lesson.completed ? "outline" : "default"}
          className="w-full"
        >
          {lesson.completed ? "Запустить заново" : "Продолжить обучение"}
        </Button>
      </CardFooter>
    </Card>
  );
};
