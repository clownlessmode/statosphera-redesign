import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface AutoReloadProviderProps {
  reloadTime?: string; // Время перезагрузки в формате "HH:MM" (по умолчанию "03:00")
  enabled?: boolean; // Включить/выключить автоперезагрузку
  reloadIntervalMinutes?: number; // Интервал перезагрузки в минутах (если указан, игнорирует reloadTime)
}

const AutoReloadProvider: FC<PropsWithChildren<AutoReloadProviderProps>> = ({
  children,
  reloadTime = "07:00",
  enabled = true,
  reloadIntervalMinutes,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastReloadDateRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Режим периодической перезагрузки (каждые N минут)
    if (reloadIntervalMinutes && reloadIntervalMinutes > 0) {
      const intervalMs = reloadIntervalMinutes * 60 * 1000;

      console.log(`Автоперезагрузка каждые ${reloadIntervalMinutes} минут`);

      const intervalId = setInterval(() => {
        console.log(
          `Автоматическая перезагрузка страницы каждые ${reloadIntervalMinutes} минут`,
        );
        window.location.reload();
      }, intervalMs);

      return () => {
        clearInterval(intervalId);
      };
    }

    // Режим ежедневной перезагрузки в определенное время
    const scheduleReload = () => {
      // Очищаем предыдущий таймаут
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const now = new Date();
      const today = now.toDateString();

      // Проверяем, не перезагружали ли мы уже сегодня
      if (lastReloadDateRef.current === today) {
        return;
      }

      const [targetHour, targetMinute] = reloadTime.split(":").map(Number);
      const targetTime = new Date();
      targetTime.setHours(targetHour, targetMinute, 0, 0);

      // Если целевое время уже прошло сегодня, планируем на завтра
      if (now >= targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const timeUntilReload = targetTime.getTime() - now.getTime();

      // Устанавливаем таймаут на перезагрузку
      timeoutRef.current = setTimeout(() => {
        // Проверяем еще раз, не перезагружали ли мы уже сегодня
        const currentDate = new Date().toDateString();
        if (lastReloadDateRef.current !== currentDate) {
          lastReloadDateRef.current = currentDate;
          console.log(`Автоматическая перезагрузка страницы в ${reloadTime}`);
          window.location.reload();
        }
      }, timeUntilReload);

      console.log(
        `Автоперезагрузка запланирована на ${targetTime.toLocaleString()}`,
      );
    };

    // Запускаем планировщик
    scheduleReload();

    // Устанавливаем интервал для проверки каждую минуту (на случай, если время было пропущено)
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      if (currentTime === reloadTime) {
        const today = now.toDateString();
        if (lastReloadDateRef.current !== today) {
          lastReloadDateRef.current = today;
          console.log(`Автоматическая перезагрузка страницы в ${reloadTime}`);
          window.location.reload();
        }
      }
    }, 60000); // Проверяем каждую минуту

    // Очистка при размонтировании
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      clearInterval(intervalId);
    };
  }, [reloadTime, enabled, reloadIntervalMinutes]);

  return <>{children}</>;
};

export default AutoReloadProvider;
