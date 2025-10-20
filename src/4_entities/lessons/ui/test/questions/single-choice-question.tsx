import React from "react";
import { RadioGroup, RadioGroupItem } from "@shared/ui/radio-group";
import { Label } from "@shared/ui/label";
import { TestQuestion } from "@entities/lessons";

interface SingleChoiceQuestionProps {
  question: TestQuestion;
  userAnswer: number[] | null;
  onAnswer: (answer: number[]) => void;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  userAnswer,
  onAnswer,
}) => {
  const handleValueChange = (value: string) => {
    const selectedIndex = parseInt(value);
    onAnswer([selectedIndex]);
  };

  return (
    <RadioGroup
      value={userAnswer?.[0]?.toString() || ""}
      onValueChange={handleValueChange}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 ">
          <RadioGroupItem
            value={index.toString()}
            id={`option-${index}`}
            className="border-border cursor-pointer"
          />
          <Label
            htmlFor={`option-${index}`}
            className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
