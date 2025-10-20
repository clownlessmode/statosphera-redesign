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
              ? "Поздравляем! Вы успешно прошли тест."
              : "К сожалению, вы не набрали достаточно баллов для прохождения теста."}
          </DialogDescription>
        </DialogHeader>

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
