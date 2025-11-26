import { themeMaterial, Theme } from "ag-grid-community";

interface ThemeParams {
  backgroundColor: string;
  foregroundColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  oddRowBackgroundColor: string;
  headerColumnResizeHandleColor: string;
  accentColor: string;
  borderColor: string;
  selectedRowBackgroundColor: string;
}

// Функция для получения CSS переменной как hex цвета
function getCSSVariableAsHex(variableName: string): string {
  if (typeof window === "undefined") return "#000000";

  // Принудительно обновляем computed styles
  const root = document.documentElement;

  // Добавляем временный класс для принудительного обновления
  const tempClass = `temp-${Date.now()}`;
  root.classList.add(tempClass);
  void root.offsetHeight; // trigger reflow
  root.classList.remove(tempClass);

  const value = getComputedStyle(root).getPropertyValue(variableName).trim();

  // Если это HSL значение, конвертируем в hex
  if (value.startsWith("hsl(")) {
    return hslToHex(value);
  }

  return value;
}

// Функция для затемнения HSL цвета на определенное количество единиц lightness
function darkenHSL(hslValue: string, lightnessDelta: number): string {
  if (typeof window === "undefined") return hslValue;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(hslValue)
    .trim();

  if (!value.startsWith("hsl(")) return value;

  // Парсим HSL: hsl(h, s%, l%)
  const match = value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return value;

  const [, h, s, l] = match;
  const newLightness = Math.max(0, Math.min(100, parseInt(l) + lightnessDelta));

  return `hsl(${h}, ${s}%, ${newLightness}%)`;
}

// Функция для конвертации HSL в hex
function hslToHex(hsl: string): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return "#000000";

  const [, h, s, l] = match.map(Number);

  const c = ((1 - Math.abs((2 * l) / 100 - 1)) * s) / 100;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r, g, b;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function getAgGridTheme(): Theme {
  // Получаем базовые цвета из CSS переменных
  const background = getCSSVariableAsHex("--background");
  const foreground = getCSSVariableAsHex("--foreground");
  const muted = getCSSVariableAsHex("--muted");
  const border = getCSSVariableAsHex("--border");
  const primary = getCSSVariableAsHex("--primary");

  // Создаем затемненные версии
  const darkerBorder = hslToHex(darkenHSL("--border", -10));

  const params: ThemeParams = {
    backgroundColor: background,
    foregroundColor: foreground,
    headerBackgroundColor: muted,
    headerTextColor: foreground,
    oddRowBackgroundColor: muted,
    headerColumnResizeHandleColor: darkerBorder,
    accentColor: primary,
    borderColor: border,
    selectedRowBackgroundColor: `${primary}20`, // добавляем прозрачность
  };

  return themeMaterial.withParams(params);
}
