import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";
import { Slider } from "@shared/ui/slider";
import { Textarea } from "@shared/ui/textarea";
import { Label } from "@shared/ui/label";
import {
  useFeedbackController,
  FEEDBACK_TYPES,
} from "@features/header/feedback/model/api/controller";
import { useLocation } from "react-router";

interface RatingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export const RatingModal = ({
  open,
  onOpenChange,
  onSubmitted,
}: RatingModalProps) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const { sendFeedback, isFeedbackLoading } = useFeedbackController();
  const location = useLocation();

  const isLowRating = rating < 4;
  const canSubmit = !isLowRating || (isLowRating && comment.trim().length > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;

    const feedbackText = `ОЦЕНКА СТАТОСФЕРЫ - ${rating}${comment.trim() ? ` КОММЕНТАРИЙ: ${comment.trim()}` : ""}`;

    sendFeedback(
      {
        rank: "",
        textMessage: feedbackText,
        page: location.pathname,
        type: FEEDBACK_TYPES.OTHER,
      },
      {
        onSuccess: () => {
          onSubmitted();
          onOpenChange(false);
          setRating(3);
          setComment("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Оцените Статосферу</DialogTitle>
          <DialogDescription>
            Поделитесь своим мнением о приложении. Ваша обратная связь поможет
            нам стать лучше.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-semibold">
                Оценка: {rating}
              </Label>
              <Slider
                value={[rating]}
                onValueChange={(value) => setRating(value[0])}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {isLowRating && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="comment" className="text-sm font-medium">
                  Почему низкая оценка?{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Расскажите, что можно улучшить..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-y min-h-[100px]"
                />
              </div>
            )}

            {!isLowRating && (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="comment-optional"
                  className="text-sm font-medium"
                >
                  Комментарий (необязательно)
                </Label>
                <Textarea
                  id="comment-optional"
                  placeholder="Оставьте комментарий, если хотите..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-y min-h-[100px]"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isFeedbackLoading}
              className="w-full"
            >
              {isFeedbackLoading ? "Отправка..." : "Отправить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
