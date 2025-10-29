import React from "react";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@shared/ui/dialog";
import { Separator } from "@shared/ui/separator";
import { TestResult } from "@entities/lessons";
import { RotateCcw } from "lucide-react";

interface TestResultsComponentProps {
  result: TestResult;
  onRetake: () => void;
  onClose: () => void;
}

export const TestResultsComponent: React.FC<TestResultsComponentProps> = ({
  result,
  onRetake,
  onClose,
}) => {
  // Выводим в консоль все ответы для отладки
  React.useEffect(() => {
    console.log("🔍 Все ответы пользователя:");
    console.log("=".repeat(60));

    result.answers.forEach((answer, index) => {
      console.log(`${index + 1}. Вопрос ID: ${answer.questionId}`);
      console.log(`   Ответ пользователя:`, answer.userAnswer);

      // Для drag-drop ответов показываем извлеченные категории
      if (Array.isArray(answer.userAnswer) && answer.userAnswer.length > 0) {
        const firstAnswer = answer.userAnswer[0];
        if (typeof firstAnswer === "string" && firstAnswer.includes(":")) {
          const extractedCategories = (answer.userAnswer as string[]).map(
            (ans) => ans.split(":")[0],
          );
          console.log(`   Извлеченные категории:`, extractedCategories);
        }
      }

      console.log(
        `   Статус:`,
        answer.isCorrect ? "✅ Правильно" : "❌ Неправильно",
      );
      console.log("-".repeat(40));
    });

    console.log("=".repeat(60));

    const incorrectAnswers = result.answers.filter(
      (answer) => !answer.isCorrect,
    );

    console.log(`📊 Статистика:`);
    console.log(`   Правильных ответов: ${result.score}`);
    console.log(`   Неправильных ответов: ${incorrectAnswers.length}`);
    console.log(`   Всего вопросов: ${result.totalQuestions}`);
    console.log(`   Процент правильных: ${result.percentage}%`);
    console.log(`   Тест ${result.passed ? "✅ ПРОЙДЕН" : "❌ НЕ ПРОЙДЕН"}`);
    console.log("=".repeat(60));
  }, [result]);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        data-testid="test-results-modal"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl">
            {result.passed ? "Тест пройден!" : "Тест не пройден"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {result.passed
              ? `Поздравляем! Вы успешно прошли тест. Ваш результат: ${result.score}/${result.totalQuestions} (${result.percentage}%)`
              : `К сожалению, вы не набрали достаточно баллов для прохождения теста.`}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {/* Детальная статистика */}
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary">
              {result.percentage}%
            </div>
            <div className="text-sm text-muted-foreground">
              Процент правильных ответов
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-6 ">
          {/* Кнопки */}
          <div className="flex justify-between space-x-4">
            <Button onClick={onClose} variant="outline">
              Закрыть
            </Button>
            <Button onClick={onRetake}>
              <RotateCcw className="w-4 h-4" />
              <span>Начать заново</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
