import { useState, useCallback } from "react";

const NEWS_SUBMITTED_KEY = "statosphera-news-submitted";

export const useNews = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Проверяем, был ли уже просмотрена новость
  const hasSubmittedNews = useCallback(() => {
    try {
      const submitted = localStorage.getItem(NEWS_SUBMITTED_KEY);
      return submitted === "true";
    } catch {
      return false;
    }
  }, []);

  // Сохраняем факт просмотра модалки
  const markAsSubmittedNews = useCallback(() => {
    try {
      localStorage.setItem(NEWS_SUBMITTED_KEY, "true");
    } catch (error) {
      console.error("Failed to save news submission:", error);
    }
  }, []);

  // Проверяем, можно ли показать модалку
  const shouldShowNews = useCallback(() => {
    // Если уже просмотрена модалка, не показываем
    return !hasSubmittedNews();
  }, [hasSubmittedNews]);

  // Показываем модалку, если нужно
  const checkAndShow = useCallback(() => {
    if (shouldShowNews()) {
      setIsOpen(true);
    }
  }, [shouldShowNews]);

  // Обработчик просмотра модалки
  const handleSubmitted = useCallback(() => {
    setIsOpen(false);
    markAsSubmittedNews();
  }, [markAsSubmittedNews]);

  return {
    isOpen,
    setIsOpen,
    checkAndShow,
    handleSubmitted,
    shouldShowNews,
  };
};
