import React from "react";
import { Checkbox } from "@shared/ui/checkbox";
import { Label } from "@shared/ui/label";
import { TestQuestion } from "@entities/lessons";

interface MultipleChoiceQuestionProps {
  question: TestQuestion;
  userAnswer: number[] | null;
  onAnswer: (answer: number[]) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  userAnswer,
  onAnswer,
}) => {
  const handleOptionChange = (optionIndex: number, checked: boolean) => {
    if (!question.options) return;

    const currentAnswers = userAnswer || [];
    let newAnswers: number[];

    if (checked) {
      newAnswers = [...currentAnswers, optionIndex];
    } else {
      newAnswers = currentAnswers.filter((index) => index !== optionIndex);
    }

    onAnswer(newAnswers);
  };

  return (
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Checkbox
            id={`option-${index}`}
            className="border-border cursor-pointer"
            checked={userAnswer?.includes(index) || false}
            onCheckedChange={(checked) =>
              handleOptionChange(index, checked as boolean)
            }
          />
          <Label
            htmlFor={`option-${index}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
};
