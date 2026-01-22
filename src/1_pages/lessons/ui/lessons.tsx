import { Header } from "@widgets/header";
import {
  LessonCard,
  useLessons,
  Lesson,
  TestComponent,
  TestResultsComponent,
} from "@entities/lessons";
import { LessonCardSkeleton } from "@entities/lessons/ui/lesson-card-skeleton";
import { useNavigate } from "react-router";
import { useState } from "react";
import { TestResult } from "@entities/lessons";

const Lessons = () => {
  const isLoading = false;
  const { lessons, completeTest, resetProgress } = useLessons();
  const navigate = useNavigate();

  // Состояние для тестов
  const [activeTestLessonId, setActiveTestLessonId] = useState<number | null>(
    null,
  );
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleStartTour = (lesson: Lesson) => {
    // Переходим на страницу урока с параметром для автозапуска тура
    const targetPath = lesson.targetPath || "/";
    navigate(`${targetPath}?fromLesson=true`);
  };

  const handleStartTest = (lesson: Lesson) => {
    if (lesson.testId) {
      setActiveTestLessonId(lesson.id);
    }
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setActiveTestLessonId(null);

    // Сбрасываем прогресс только если тест НЕ пройден
    if (!result.passed) {
      resetProgress(result.testId);
    }

    // Записываем прохождение теста только если тест пройден
    if (result.passed) {
      completeTest(result.testId);
    }
  };

  const handleTestClose = () => {
    setActiveTestLessonId(null);
  };

  const handleTestResultsClose = () => {
    setTestResult(null);
  };

  const handleRetakeTest = () => {
    setTestResult(null);
    // Находим урок по testId и запускаем тур с самого начала
    const lesson = lessons.find((l) => l.testId === testResult?.testId);
    if (lesson) {
      // Запускаем тур с самого начала
      handleStartTour(lesson);
    }
  };

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Обучение" />

      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-[320px]">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <LessonCardSkeleton key={index} />
            ))
          : lessons.map((lesson) => {
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onStartLesson={() => {}}
                  onStartTest={handleStartTest}
                  onStartTour={handleStartTour}
                  onProgressChange={() => {}}
                />
              );
            })}
      </div>

      {/* Модалка теста */}
      {activeTestLessonId && (
        <TestComponent
          lessonId={activeTestLessonId}
          onTestComplete={handleTestComplete}
          onTestClose={handleTestClose}
        />
      )}

      {/* Модалка результатов теста */}
      {testResult && (
        <TestResultsComponent
          result={testResult}
          onRetake={handleRetakeTest}
          onClose={handleTestResultsClose}
        />
      )}
    </div>
  );
};

export default Lessons;
