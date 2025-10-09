import { useEffect, useState } from "react";
import { useTheme } from "@app/providers/theme-provider";

/**
 * Хук для получения цветов графиков из CSS-переменных
 * Автоматически обновляется при изменении темы или кастомных цветов
 */
export function useGraphColors() {
  const { theme, customThemeMode, colors } = useTheme();
  const [graphColors, setGraphColors] = useState(() => getColorsFromCSS());

  // Функция для получения значения CSS-переменной
  function getCSSVariable(varName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }

  // Функция для конвертации HSL строки в HEX (для chart-переменных)
  function hslToHex(hslString: string): string {
    // Если уже HEX формат, возвращаем как есть
    if (hslString.startsWith("#")) {
      return hslString;
    }

    // Парсим строку вида "347 77% 50%"
    const parts = hslString.trim().split(/\s+/);
    if (parts.length !== 3) return "#E50046"; // fallback

    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function getColorsFromCSS() {
    // Получаем цвета из CSS переменных
    const foreground = getCSSVariable("--foreground");
    const background = getCSSVariable("--background");
    const card = getCSSVariable("--card");
    const mutedForeground = getCSSVariable("--muted-foreground");
    const popover = getCSSVariable("--popover");
    const border = getCSSVariable("--border");

    // Получаем chart цвета (они в формате HSL)
    const chart1 = hslToHex(getCSSVariable("--chart-1"));
    const chart2 = hslToHex(getCSSVariable("--chart-2"));
    const chart3 = hslToHex(getCSSVariable("--chart-3"));
    const chart4 = hslToHex(getCSSVariable("--chart-4"));
    const chart5 = hslToHex(getCSSVariable("--chart-5"));

    return {
      text: foreground || "#333333",
      background: card || background || "#fafafa",
      gridLine: mutedForeground
        ? `${mutedForeground}40`
        : "rgba(172, 170, 167, 0.25)",
      series: [chart1, chart2, chart3, chart4, chart5],
      tooltipBg: popover || background || "#ffffff",
      tooltipBorder: border || "#dad9d8",
    };
  }

  useEffect(() => {
    // Обновляем цвета при изменении темы или кастомных цветов
    const updateColors = () => {
      setGraphColors(getColorsFromCSS());
    };

    // Небольшая задержка чтобы CSS переменные успели примениться
    const timeoutId = setTimeout(updateColors, 50);

    return () => clearTimeout(timeoutId);
  }, [theme, customThemeMode, colors]);

  return graphColors;
}
