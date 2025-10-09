// Утилиты для работы с цветами и генерации цветовых схем

/**
 * Конвертирует HEX в HSL
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Убираем # если есть
  hex = hex.replace(/^#/, "");

  // Парсим RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Конвертирует HSL в HEX
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

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

/**
 * Генерирует полную цветовую схему на основе базового цвета
 */
export function generateColorScheme(baseColor: string, isDark: boolean) {
  const hsl = hexToHSL(baseColor);
  const { h, s } = hsl;

  // Генерируем цвета на основе базового оттенка
  const primary = baseColor;
  const primaryForeground = isDark ? hslToHex(h, 20, 95) : hslToHex(h, 20, 95);

  // Secondary - немного светлее/прозрачнее primary
  const secondary = hslToHex(h, Math.max(s - 20, 30), isDark ? 45 : 85);
  const secondaryForeground = primary;

  // Accent - такой же как primary
  const accent = primary;
  const accentForeground = primaryForeground;

  // Muted - нейтральный серый с оттенком базового цвета
  const muted = isDark ? hslToHex(h, 5, 15) : hslToHex(h, 5, 92);
  const mutedForeground = isDark ? hslToHex(h, 5, 39) : hslToHex(h, 5, 42);

  // Card - немного отличается от фона
  const card = isDark ? hslToHex(h, 5, 15) : hslToHex(h, 5, 98);
  const cardForeground = isDark ? hslToHex(h, 5, 83) : hslToHex(h, 5, 20);

  // Popover
  const popover = isDark ? hslToHex(h, 5, 10) : hslToHex(0, 0, 100);
  const popoverForeground = isDark ? hslToHex(h, 5, 83) : hslToHex(h, 5, 20);

  // Border & Input
  const border = isDark ? hslToHex(h, 5, 18) : hslToHex(h, 5, 85);
  const input = border;

  // Ring
  const ring = hslToHex(h, Math.max(s - 20, 30), isDark ? 60 : 72);

  // Background & Foreground
  const background = isDark ? hslToHex(h, 5, 10) : hslToHex(0, 0, 100);
  const foreground = isDark ? hslToHex(h, 5, 83) : hslToHex(h, 5, 20);

  // Destructive (красный оттенок)
  const destructive = isDark ? hslToHex(0, 45, 53) : hslToHex(0, 77, 45);
  const destructiveForeground = isDark
    ? hslToHex(0, 42, 95)
    : hslToHex(0, 42, 95);

  // Positive (зеленый)
  const positive = isDark ? hslToHex(142, 54, 43) : hslToHex(142, 70, 35);
  const positiveForeground = isDark
    ? hslToHex(142, 49, 85)
    : hslToHex(142, 49, 70);

  // Average (оранжевый)
  const average = hslToHex(24, 88, 45);
  const averageForeground = hslToHex(24, 97, 67);

  // Height (желтый)
  const height = isDark ? hslToHex(47, 95, 45) : hslToHex(47, 95, 42);
  const heightForeground = isDark ? hslToHex(47, 78, 67) : hslToHex(47, 78, 48);

  // Chart colors - вариации базового цвета
  const chart1 = `${h} ${s}% 50%`;
  const chart2 = `${(h + 5) % 360} ${Math.min(s + 10, 100)}% 91%`;
  const chart3 = `${(h - 5 + 360) % 360} ${Math.min(s + 5, 100)}% 72%`;
  const chart4 = `${(h + 10) % 360} ${Math.min(s + 10, 100)}% 82%`;
  const chart5 = `${h} ${s}% 62%`;

  return {
    background,
    foreground,
    card,
    cardForeground,
    popover,
    popoverForeground,
    primary,
    primaryForeground,
    secondary,
    secondaryForeground,
    muted,
    mutedForeground,
    accent,
    accentForeground,
    destructive,
    destructiveForeground,
    positive,
    positiveForeground,
    average,
    averageForeground,
    height,
    heightForeground,
    border,
    input,
    ring,
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
  };
}

/**
 * Предустановленные цветовые схемы
 */
export const COLOR_PRESETS = [
  {
    id: "default",
    name: "По умолчанию",
    color: "#e50046",
  },
  {
    id: "blue",
    name: "Синий",
    color: "#3b82f6",
  },
  {
    id: "purple",
    name: "Фиолетовый",
    color: "#8b5cf6",
  },
  {
    id: "green",
    name: "Зеленый",
    color: "#10b981",
  },
  {
    id: "orange",
    name: "Оранжевый",
    color: "#f59e0b",
  },
  {
    id: "pink",
    name: "Розовый",
    color: "#ec4899",
  },
  {
    id: "teal",
    name: "Бирюзовый",
    color: "#14b8a6",
  },
  {
    id: "yellow",
    name: "Желтый",
    color: "#eab308",
  },
  {
    id: "indigo",
    name: "Индиго",
    color: "#6366f1",
  },
  {
    id: "rose",
    name: "Алый",
    color: "#f43f5e",
  },
] as const;
