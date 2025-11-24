import { useState, useEffect, useRef } from "react";
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

const SUBMISSION_TIMEOUT_MS = 10000; // 10 секунд
const RETRY_DELAY_MS = 2000; // 2 секунды перед retry

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { sendFeedback } = useFeedbackController();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackDataRef = useRef<{
    rank: string;
    textMessage: string;
    page: string;
    type: FEEDBACK_TYPES;
  } | null>(null);
  const isSubmittedRef = useRef<boolean>(false);

  const isLowRating = rating < 4;
  const canSubmit = !isLowRating || (isLowRating && comment.trim().length > 0);

  // Функция для retry отправки в фоне
  const retrySubmission = () => {
    if (!feedbackDataRef.current || isSubmittedRef.current) return;

    sendFeedback(feedbackDataRef.current, {
      onSuccess: () => {
        isSubmittedRef.current = true;
        feedbackDataRef.current = null;
      },
      onError: () => {
        // Если retry тоже не удался, просто игнорируем
        // Пользователь уже может работать дальше
        isSubmittedRef.current = true;
        feedbackDataRef.current = null;
      },
    });
  };

  // Очистка таймаутов при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Таймаут для отправки
  useEffect(() => {
    if (isSubmitting && !isSubmittedRef.current) {
      // Очищаем предыдущий таймаут если есть
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Устанавливаем новый таймаут
      timeoutRef.current = setTimeout(() => {
        // Если запрос все еще выполняется, закрываем модалку
        if (isSubmitting && !isSubmittedRef.current) {
          isSubmittedRef.current = true;
          setIsSubmitting(false);
          onSubmitted();
          onOpenChange(false);
          setRating(5);
          setComment("");

          // Запускаем retry в фоне
          retryTimeoutRef.current = setTimeout(() => {
            retrySubmission();
          }, RETRY_DELAY_MS);
        }
      }, SUBMISSION_TIMEOUT_MS);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (!isSubmitting && timeoutRef.current) {
      // Если запрос завершился, очищаем таймаут
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [isSubmitting, onSubmitted, onOpenChange]);

  const handleSubmit = () => {
    if (!canSubmit || isSubmitting) return;

    const feedbackText = `ОЦЕНКА СТАТОСФЕРЫ - ${rating}${comment.trim() ? ` КОММЕНТАРИЙ: ${comment.trim()}` : ""}`;

    const feedbackData = {
      rank: "",
      textMessage: feedbackText,
      page: location.pathname,
      type: FEEDBACK_TYPES.OTHER,
    };

    // Сохраняем данные для возможного retry
    feedbackDataRef.current = feedbackData;
    isSubmittedRef.current = false;
    setIsSubmitting(true);

    sendFeedback(feedbackData, {
      onSuccess: () => {
        isSubmittedRef.current = true;
        feedbackDataRef.current = null;
        setIsSubmitting(false);

        // Очищаем таймаут если он был установлен
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        onSubmitted();
        onOpenChange(false);
        setRating(5);
        setComment("");
      },
      onError: () => {
        // При ошибке тоже закрываем модалку и делаем retry
        isSubmittedRef.current = true;
        setIsSubmitting(false);
        onSubmitted();
        onOpenChange(false);
        setRating(5);
        setComment("");

        // Запускаем retry в фоне через небольшую задержку
        retryTimeoutRef.current = setTimeout(() => {
          retrySubmission();
        }, RETRY_DELAY_MS);
      },
    });
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
              disabled={!canSubmit || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
