import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { RatingModal } from "./modal";
import { useRating } from "../model/use-rating";

export const RatingProvider = () => {
  const location = useLocation();
  const { isOpen, checkAndShow, handleSubmitted } = useRating();
  const previousPathRef = useRef<string | null>(null);
  const isFirstMountRef = useRef<boolean>(true);

  useEffect(() => {
    // Пропускаем первую загрузку страницы
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      previousPathRef.current = location.pathname;
      return;
    }

    // Не показываем модалку на странице авторизации
    if (location.pathname === "/login") {
      previousPathRef.current = location.pathname;
      return;
    }

    // Проверяем, изменился ли путь
    if (previousPathRef.current !== location.pathname) {
      previousPathRef.current = location.pathname;

      // Небольшая задержка перед показом модалки после перехода
      const timer = setTimeout(() => {
        checkAndShow();
      }, 1000); // 1 секунда после перехода

      return () => clearTimeout(timer);
    }
  }, [location.pathname, checkAndShow]);

  return (
    <RatingModal
      open={isOpen}
      onOpenChange={() => {}}
      onSubmitted={handleSubmitted}
    />
  );
};
