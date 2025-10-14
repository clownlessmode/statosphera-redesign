import { Header } from "@widgets/header";
import {
  LessonCard,
  LESSONS_MOCK,
  useLessonTour,
  getLessonTour,
  useLessonProgress,
  Lesson,
} from "@entities/lessons";
import { LessonCardSkeleton } from "@entities/lessons/ui/lesson-card-skeleton";
import { useNavigate } from "react-router";
import { useCallback, useMemo } from "react";

const Lessons = () => {
  const isLoading = false;
  const navigate = useNavigate();
  const { startTour } = useLessonTour();
  const { getProgressPercentage, isLessonCompleted, progressData } =
    useLessonProgress();

  // Фильтруем тестовые уроки и обновляем прогресс из localStorage
  const visibleLessons = useMemo(() => {
    console.log("📊 Загружаем страницу уроков...");
    return LESSONS_MOCK.filter((lesson) => !lesson.isTest).map((lesson) => {
      const progressPercentage = getProgressPercentage(lesson.id.toString());
      const completed = isLessonCompleted(lesson.id.toString());

      console.log(
        `Урок "${lesson.title}": отображается ${progressPercentage}%`,
      );

      return {
        ...lesson,
        progress: progressPercentage,
        completed: completed,
      };
    });
  }, [getProgressPercentage, isLessonCompleted, progressData]);

  const handleStartLesson = useCallback(
    (lesson: Lesson) => {
      const tour = getLessonTour(lesson.id);
      if (!tour) {
        console.warn(`Урок ${lesson.id} не найден в конфигурации туров`);
        return;
      }

      // Если есть целевой путь, переходим на него
      if (lesson.targetPath) {
        navigate(lesson.targetPath);
        // Даем время на загрузку страницы
        setTimeout(() => {
          startTour({
            lessonId: lesson.id.toString(),
            steps: tour.steps,
            onComplete: () => {
              console.log("🚀 onComplete вызван в lessons.tsx!");
              // Прогресс автоматически обновляется в useLessonTour
              // Возвращаемся на страницу уроков
              console.log("🚀 Переходим на /lessons...");
              navigate("/lessons");
              console.log("🚀 navigate выполнен");
            },
            onDestroy: () => {
              console.log("🚀 onDestroy вызван в lessons.tsx!");
              // Прогресс автоматически сохраняется в useLessonTour
              // Возвращаемся на страницу уроков
              console.log("🚀 Переходим на /lessons через onDestroy...");
              navigate("/lessons");
              console.log("🚀 navigate выполнен через onDestroy");
            },
          });
        }, 500);
      } else {
        // Запускаем тур на текущей странице
        startTour({
          lessonId: lesson.id.toString(),
          steps: tour.steps,
          onComplete: () => {
            console.log("🚀 onComplete вызван в lessons.tsx (без targetPath)!");
            // Прогресс автоматически обновляется в useLessonTour
            // Возвращаемся на страницу уроков
            console.log("🚀 Переходим на /lessons (без targetPath)...");
            navigate("/lessons");
            console.log("🚀 navigate выполнен (без targetPath)");
          },
          onDestroy: () => {
            console.log("🚀 onDestroy вызван в lessons.tsx (без targetPath)!");
            // Прогресс автоматически сохраняется в useLessonTour
            // Возвращаемся на страницу уроков
            console.log(
              "🚀 Переходим на /lessons через onDestroy (без targetPath)...",
            );
            navigate("/lessons");
            console.log(
              "🚀 navigate выполнен через onDestroy (без targetPath)",
            );
          },
        });
      }
    },
    [navigate, startTour],
  );

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Обучение" />

      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-[320px]">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <LessonCardSkeleton key={index} />
            ))
          : visibleLessons.map((lesson, index) => (
              <LessonCard
                key={index}
                lesson={lesson}
                onStartLesson={handleStartLesson}
              />
            ))}
      </div>
    </div>
  );
};

export default Lessons;
