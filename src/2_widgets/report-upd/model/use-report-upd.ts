import { useState, useCallback } from "react";

const REPORT_UPD_SUBMITTED_KEY = "statosphera-report-upd-submitted";

export const useReportUpd = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Проверяем, был ли уже отправлен рейтинг
  const hasSubmittedReportUpd = useCallback(() => {
    try {
      const submitted = localStorage.getItem(REPORT_UPD_SUBMITTED_KEY);
      return submitted === "true";
    } catch {
      return false;
    }
  }, []);

  // Сохраняем факт просмотра модалки
  const markAsSubmittedReportUpd = useCallback(() => {
    try {
      localStorage.setItem(REPORT_UPD_SUBMITTED_KEY, "true");
    } catch (error) {
      console.error("Failed to save report upd submission:", error);
    }
  }, []);

  // Проверяем, можно ли показать модалку
  const shouldShowReportUpd = useCallback(() => {
    // Если уже просмотрена модалка, не показываем
    return !hasSubmittedReportUpd();
  }, [hasSubmittedReportUpd]);

  // Показываем модалку, если нужно
  const checkAndShow = useCallback(() => {
    if (shouldShowReportUpd()) {
      setIsOpen(true);
    }
  }, [shouldShowReportUpd]);

  // Обработчик просмотра модалки
  const handleSubmitted = useCallback(() => {
    setIsOpen(false);
    markAsSubmittedReportUpd();
  }, [markAsSubmittedReportUpd]);

  return {
    isOpen,
    setIsOpen,
    checkAndShow,
    handleSubmitted,
    shouldShowReportUpd,
  };
};
