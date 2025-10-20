import React from "react";
import { Slider } from "@shared/ui/slider";
import { TestQuestion } from "@entities/lessons";

interface RangeSelectorQuestionProps {
  question: TestQuestion;
  userAnswer: number[] | null;
  onAnswer: (answer: number[]) => void;
}

export const RangeSelectorQuestion: React.FC<RangeSelectorQuestionProps> = ({
  question,
  userAnswer,
  onAnswer,
}) => {
  if (!question.range) return null;

  const { min, max, step, unit } = question.range;
  const currentValue = userAnswer?.[0] || min;

  const handleValueChange = (value: number[]) => {
    onAnswer(value);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">
          {currentValue} {unit}
        </div>
      </div>

      <Slider
        value={[currentValue]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
};
