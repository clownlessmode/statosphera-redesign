import React from "react";

import { Dialog, DialogContent } from "@shared/ui/dialog";

import { useTests } from "@entities/lessons";
import { TestQuestionComponent } from "./test-question-component";

interface TestComponentProps {
  lessonId: number;
  onTestComplete: (result: any) => void;
  onTestClose: () => void;
}

export const TestComponent: React.FC<TestComponentProps> = ({
  lessonId,
  onTestComplete,
  onTestClose,
}) => {
  const {
    currentTest,
    currentQuestionIndex,
    isTestActive,
    startTest,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishTest,
    resetTest,
    getCurrentQuestion,
    getCurrentAnswer,
  } = useTests();

  React.useEffect(() => {
    startTest(lessonId);
  }, [lessonId, startTest]);

  const handleAnswer = (answer: number[] | string[]) => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      answerQuestion(currentQuestion.id, answer);
    }
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handlePrev = () => {
    prevQuestion();
  };

  const handleFinish = () => {
    const result = finishTest();
    onTestComplete(result);
  };

  const handleClose = () => {
    resetTest();
    onTestClose();
  };

  if (!isTestActive || !currentTest) {
    return null;
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    return null;
  }

  const isLastQuestion =
    currentQuestionIndex === currentTest.questions.length - 1;

  return (
    <Dialog open={isTestActive} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        data-testid="test-modal"
      >
        {/* Вопрос */}
        <TestQuestionComponent
          question={currentQuestion}
          userAnswer={getCurrentAnswer()}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          canGoNext={currentQuestionIndex < currentTest.questions.length - 1}
          canGoPrev={currentQuestionIndex > 0}
          isLastQuestion={isLastQuestion}
          onFinish={handleFinish}
        />
      </DialogContent>
    </Dialog>
  );
};
