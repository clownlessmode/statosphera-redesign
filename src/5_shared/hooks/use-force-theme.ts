import { useEffect, useLayoutEffect } from "react";
import { FULL_THEME_PRESETS } from "@shared/constants/theme-presets";

/**
 * Принудительно применяет тему синхронно до рендера
 * @param presetId - ID пресета темы для принудительного применения
 * @param mode - режим темы ('light' или 'dark')
 */
const applyThemeSync = (presetId: string, mode: "light" | "dark" = "light") => {
  const root = window.document.documentElement;

  // Находим пресет по ID
  const preset = FULL_THEME_PRESETS.find((p) => p.id === presetId);
  if (!preset) {
    console.warn(`Theme preset with id "${presetId}" not found`);
    return;
  }

  // Получаем конфигурацию темы для выбранного режима
  const themeConfig = preset[mode];

  // Применяем CSS переменные синхронно
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });

  // Применяем дополнительные стили
  root.style.setProperty("--radius", themeConfig.radius);
  root.style.setProperty("--shadow-x", themeConfig.shadowX);
  root.style.setProperty("--shadow-y", themeConfig.shadowY);
  root.style.setProperty("--shadow-blur", themeConfig.shadowBlur);
  root.style.setProperty("--shadow-spread", themeConfig.shadowSpread);
  root.style.setProperty("--shadow-opacity", themeConfig.shadowOpacity);
  root.style.setProperty("--tracking-normal", themeConfig.trackingNormal);

  // Принудительно устанавливаем класс темы
  root.classList.remove("light", "dark");
  root.classList.add(mode);
};

/**
 * Очищает принудительно примененную тему
 */
const clearForcedTheme = () => {
  const root = window.document.documentElement;

  // Удаляем все кастомные CSS переменные
  const allColorKeys = [
    "background",
    "foreground",
    "card",
    "cardForeground",
    "popover",
    "popoverForeground",
    "primary",
    "primaryForeground",
    "secondary",
    "secondaryForeground",
    "muted",
    "mutedForeground",
    "accent",
    "accentForeground",
    "destructive",
    "destructiveForeground",
    "positive",
    "positiveForeground",
    "average",
    "averageForeground",
    "height",
    "heightForeground",
    "border",
    "input",
    "ring",
    "chart1",
    "chart2",
    "chart3",
    "chart4",
    "chart5",
  ];

  allColorKeys.forEach((key) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.removeProperty(cssVarName);
  });

  // Удаляем дополнительные стили
  root.style.removeProperty("--radius");
  root.style.removeProperty("--shadow-x");
  root.style.removeProperty("--shadow-y");
  root.style.removeProperty("--shadow-blur");
  root.style.removeProperty("--shadow-spread");
  root.style.removeProperty("--shadow-opacity");
  root.style.removeProperty("--tracking-normal");

  // Удаляем принудительный класс темы
  root.classList.remove("light", "dark");
};

/**
 * Хук для принудительного применения темы на определенной странице
 * @param presetId - ID пресета темы для принудительного применения
 * @param mode - режим темы ('light' или 'dark')
 */
export const useForceTheme = (
  presetId: string,
  mode: "light" | "dark" = "light",
) => {
  // Применяем тему синхронно до рендера
  useLayoutEffect(() => {
    applyThemeSync(presetId, mode);
  }, [presetId, mode]);

  // Очищаем тему при размонтировании
  useEffect(() => {
    return () => {
      clearForcedTheme();
    };
  }, []);
};
