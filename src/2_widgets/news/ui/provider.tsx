import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { NewsModal } from "./modal";
import { useNews } from "../model/use-news";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";

interface NewsProviderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const NewsProvider = ({
  title,
  description,
  children,
}: NewsProviderProps) => {
  const location = useLocation();
  const { isOpen, checkAndShow, handleSubmitted } = useNews();
  const previousPathRef = useRef<string | null>(null);
  const { session } = useSession();

  useEffect(() => {
    // Не показываем модалку на странице авторизации
    if (location.pathname === "/login" || location.pathname === "/tv") {
      previousPathRef.current = location.pathname;
      return;
    }

    if (session?.role === ROLES.FARMER) {
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
    <NewsModal
      open={isOpen}
      onOpenChange={() => {}}
      onSubmitted={handleSubmitted}
      title={title}
      description={description}
    >
      {children}
    </NewsModal>
  );
};
