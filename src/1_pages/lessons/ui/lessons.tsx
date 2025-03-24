import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Progress } from "@shared/ui/progress";
import { Separator } from "@shared/ui/separator";
import { Header } from "@widgets/header";
import { ChartLine, Clock, FileText, Handshake, Home } from "lucide-react";

const LESSONS_LIST = [
  {
    id: 1,
    title: "Главная страница",
    description:
      "Вы изучите основные элементы интерфейса: навигацию, меню и информационные виджеты. Это поможет быстро начать работу с системой.",
    duration: "10 минут",
    progress: 12,
    completed: true,
    to: ["Аналитики"],
    icon: <Home className="size-5" />,
    tags: ["Интерфейс", "Виджеты", "Навигация"],
  },
  {
    id: 2,
    title: "Конструктор отчетов",
    description:
      "Вы освоите работу с конструктором отчетов, включая фильтрацию, группировку и выбор показателей для анализа данных.",
    duration: "15 минут",
    progress: 65,
    completed: false,
    to: ["Специалисты"],
    icon: <FileText className="size-5" />,
    tags: ["Аналитика", "Отчеты", "Визуализация"],
  },
  {
    id: 3,
    title: "Стандарты",
    description:
      "Вы научитесь искать, фильтровать и просматривать стандарты в системе.",
    duration: "15 минут",
    progress: 100,
    completed: true,
    to: ["Руководители"],
    icon: <Handshake className="size-5" />,
    tags: ["Стандарты", "Поиск", "Фильтрация"],
  },
  {
    id: 4,
    title: "Динамика продаж",
    description:
      "Вы научитесь использовать инструменты аналитики для работы с данными о продажах. Курс охватывает фильтрацию, визуализацию и экспорт информации.",
    duration: "15 минут",
    progress: 0,
    completed: false,
    to: ["Руководители"],
    icon: <ChartLine className="size-5" />,
    tags: ["Аналитика", "Продажи", "Визуализация"],
  },
];

const Lessons = () => {
  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Обучение" />
      <div className="rounded-3xl bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {LESSONS_LIST.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-1">
                  {lesson.to.map((to) => (
                    <Badge variant="default">{to}</Badge>
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
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="flex flex-wrap gap-2">
                {lesson.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/50">
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
        ))}
      </div>
    </div>
  );
};

export default Lessons;
