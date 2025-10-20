import React from "react";
import { Button } from "@shared/ui/button";
import {
  RangeSelectorQuestion,
  SingleChoiceQuestion,
  TestQuestion,
  OrderCardsQuestion,
  DragDropQuestion,
} from "@entities/lessons";
import { MultipleChoiceQuestion } from "./questions/multiple-choice-question";

interface TestQuestionComponentProps {
  question: TestQuestion;
  userAnswer: number[] | string[] | null;
  onAnswer: (answer: number[] | string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastQuestion: boolean;
  onFinish: () => void;
}

export const TestQuestionComponent: React.FC<TestQuestionComponentProps> = ({
  question,
  userAnswer,
  onAnswer,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  isLastQuestion,
  onFinish,
}) => {
  const renderQuestion = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion
            question={question}
            userAnswer={userAnswer as number[] | null}
            onAnswer={onAnswer as (answer: number[]) => void}
          />
        );
      case "single-choice":
        return (
          <SingleChoiceQuestion
            question={question}
            userAnswer={userAnswer as number[] | null}
            onAnswer={onAnswer as (answer: number[]) => void}
          />
        );
      case "range-selector":
        return (
          <RangeSelectorQuestion
            question={question}
            userAnswer={userAnswer as number[] | null}
            onAnswer={onAnswer as (answer: number[]) => void}
          />
        );
      case "order-cards":
        return (
          <OrderCardsQuestion
            question={question}
            userAnswer={userAnswer as string[] | null}
            onAnswer={onAnswer as (answer: string[]) => void}
          />
        );
      case "drag-drop":
        return (
          <DragDropQuestion
            question={question}
            userAnswer={userAnswer as string[] | null}
            onAnswer={onAnswer as (answer: string[]) => void}
          />
        );
      default:
        return <div>Неподдерживаемый тип вопроса</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Вопрос {question.id}</h3>
        <p className="text-muted-foreground">{question.question}</p>
      </div>

      <div>{renderQuestion()}</div>

      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onPrev} disabled={!canGoPrev}>
          Назад
        </Button>

        <div className="flex gap-2">
          {isLastQuestion ? (
            <Button
              onClick={onFinish}
              disabled={!userAnswer}
              className="bg-green-600 hover:bg-green-700"
            >
              Завершить тест
            </Button>
          ) : (
            <Button onClick={onNext} disabled={!canGoNext || !userAnswer}>
              Далее
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
