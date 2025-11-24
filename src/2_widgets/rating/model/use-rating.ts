import { useState, useCallback } from "react";

const RATING_SUBMITTED_KEY = "statosphera-rating-submitted";

export const useRating = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Проверяем, был ли уже отправлен рейтинг
  const hasSubmittedRating = useCallback(() => {
    try {
      const submitted = localStorage.getItem(RATING_SUBMITTED_KEY);
      return submitted === "true";
    } catch {
      return false;
    }
  }, []);

  // Сохраняем факт отправки рейтинга
  const markAsSubmitted = useCallback(() => {
    try {
      localStorage.setItem(RATING_SUBMITTED_KEY, "true");
    } catch (error) {
      console.error("Failed to save rating submission:", error);
    }
  }, []);

  // Проверяем, можно ли показать модалку
  const shouldShowRating = useCallback(() => {
    // Если уже отправлен рейтинг, не показываем
    return !hasSubmittedRating();
  }, [hasSubmittedRating]);

  // Показываем модалку, если нужно
  const checkAndShow = useCallback(() => {
    if (shouldShowRating()) {
      setIsOpen(true);
    }
  }, [shouldShowRating]);

  // Обработчик отправки рейтинга
  const handleSubmitted = useCallback(() => {
    setIsOpen(false);
    markAsSubmitted();
  }, [markAsSubmitted]);

  return {
    isOpen,
    setIsOpen,
    checkAndShow,
    handleSubmitted,
    shouldShowRating,
  };
};
