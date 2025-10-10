import { useState, useEffect } from "react";

/**
 * Хук для управления порядком виджетов на дашборде
 * Сохраняет порядок в localStorage
 */
export function useDashboardLayout(defaultItems: string[]) {
  const [items, setItems] = useState<string[]>(() => {
    const stored = localStorage.getItem("dashboard-layout");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Проверяем что все элементы из defaultItems есть в сохраненном порядке
        const hasAllItems = defaultItems.every((item) => parsed.includes(item));
        if (hasAllItems && parsed.length === defaultItems.length) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse dashboard layout:", e);
      }
    }
    return defaultItems;
  });

  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(items));
  }, [items]);

  const resetLayout = () => {
    setItems(defaultItems);
    localStorage.removeItem("dashboard-layout");
  };

  return { items, setItems, resetLayout };
}
