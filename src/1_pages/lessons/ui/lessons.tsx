import { Header } from "@widgets/header";
import { LessonCard, LESSONS_MOCK } from "@entities/lessons";
import { LessonCardSkeleton } from "@entities/lessons/ui/lesson-card-skeleton";

const Lessons = () => {
  const isLoading = false;
  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Обучение" />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-[320px]">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <LessonCardSkeleton key={index} />
            ))
          : LESSONS_MOCK.map((lesson, index) => (
              <LessonCard key={index} lesson={lesson} />
            ))}
      </div>
    </div>
  );
};

export default Lessons;
