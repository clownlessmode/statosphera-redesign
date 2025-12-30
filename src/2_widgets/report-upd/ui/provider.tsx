import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { ReportUpdModal } from "./modal";
import { useReportUpd } from "../model/use-report-upd";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";

export const ReportUpdProvider = () => {
  const location = useLocation();
  const { isOpen, checkAndShow, handleSubmitted } = useReportUpd();
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
    <ReportUpdModal
      open={isOpen}
      onOpenChange={() => {}}
      onSubmitted={handleSubmitted}
    />
  );
};
