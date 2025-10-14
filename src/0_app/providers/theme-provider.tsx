import { createContext, useContext, useEffect, useState } from "react";
import type { FullThemePreset } from "@shared/constants/theme-presets";

export type Theme = "dark" | "light" | "custom";
export type CustomThemeMode = "dark" | "light";

export type ThemeColors = {
  background?: string;
  foreground?: string;
  card?: string;
  cardForeground?: string;
  popover?: string;
  popoverForeground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  muted?: string;
  mutedForeground?: string;
  accent?: string;
  accentForeground?: string;
  destructive?: string;
  destructiveForeground?: string;
  positive?: string;
  positiveForeground?: string;
  average?: string;
  averageForeground?: string;
  height?: string;
  heightForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customThemeMode: CustomThemeMode;
  setCustomThemeMode: (mode: CustomThemeMode) => void;
  colors: ThemeColors;
  setColors: (colors: ThemeColors) => void;
  resetColors: () => void;
  applyColorScheme: (baseColor: string) => void;
  applyFullPreset: (preset: FullThemePreset) => void;
};

const defaultColors: ThemeColors = {};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  customThemeMode: "dark",
  setCustomThemeMode: () => null,
  colors: defaultColors,
  setColors: () => null,
  resetColors: () => null,
  applyColorScheme: () => null,
  applyFullPreset: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const colorVarMapping: Record<keyof ThemeColors, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  positive: "--positive",
  positiveForeground: "--positive-foreground",
  average: "--average",
  averageForeground: "--average-foreground",
  height: "--height",
  heightForeground: "--height-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
  chart1: "--chart-1",
  chart2: "--chart-2",
  chart3: "--chart-3",
  chart4: "--chart-4",
  chart5: "--chart-5",
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const [customThemeMode, setCustomThemeModeState] = useState<CustomThemeMode>(
    () => {
      const stored = localStorage.getItem("custom-theme-mode");
      return (stored as CustomThemeMode) || "dark";
    },
  );

  const [colors, setColorsState] = useState<ThemeColors>(() => {
    const stored = localStorage.getItem("theme-colors");
    return stored ? JSON.parse(stored) : defaultColors;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    // Для кастомной темы применяем customThemeMode
    if (theme === "custom") {
      root.classList.add(customThemeMode);

      // Восстанавливаем кастомные цвета из localStorage при переключении на custom
      const stored = localStorage.getItem("theme-colors");
      if (stored) {
        const savedColors = JSON.parse(stored);
        Object.entries(savedColors).forEach(([key, value]) => {
          if (value) {
            const varName = colorVarMapping[key as keyof ThemeColors];
            if (varName) {
              root.style.setProperty(varName, value as string);
            }
          }
        });
      }
    } else {
      // При переключении на стандартные темы - убираем кастомные CSS переменные
      root.classList.add(theme);
      Object.values(colorVarMapping).forEach((varName) => {
        root.style.removeProperty(varName);
      });
    }
  }, [theme, customThemeMode]);

  useEffect(() => {
    // Применяем все кастомные цвета только если тема custom
    if (theme === "custom") {
      const root = window.document.documentElement;

      Object.entries(colors).forEach(([key, value]) => {
        if (value) {
          const varName = colorVarMapping[key as keyof ThemeColors];
          if (varName) {
            root.style.setProperty(varName, value);
          }
        }
      });
    }
  }, [colors, theme]);

  const setColors = (newColors: ThemeColors) => {
    const updatedColors = { ...colors, ...newColors };
    setColorsState(updatedColors);
    localStorage.setItem("theme-colors", JSON.stringify(updatedColors));
  };

  const applyColorScheme = (baseColor: string) => {
    // Динамический импорт, чтобы избежать циклических зависимостей
    import("@shared/lib/color-utils").then(({ generateColorScheme }) => {
      const isDark =
        theme === "custom" ? customThemeMode === "dark" : theme === "dark";
      const scheme = generateColorScheme(baseColor, isDark);
      setColors(scheme);
    });
  };

  const resetColors = () => {
    setColorsState(defaultColors);
    localStorage.removeItem("theme-colors");
    localStorage.removeItem("applied-theme-preset");
    const root = window.document.documentElement;

    // Удаляем все кастомные CSS переменные
    Object.values(colorVarMapping).forEach((varName) => {
      root.style.removeProperty(varName);
    });
  };

  const setCustomThemeMode = (mode: CustomThemeMode) => {
    setCustomThemeModeState(mode);
    localStorage.setItem("custom-theme-mode", mode);

    // Проверяем, был ли применен полный пресет
    const appliedPresetId = localStorage.getItem("applied-theme-preset");

    if (appliedPresetId) {
      // Переприменяем пресет с новым режимом
      Promise.all([
        import("@shared/constants/theme-presets"),
        import("@shared/lib/color-utils"),
      ]).then(([{ FULL_THEME_PRESETS }, { hexToHSL }]) => {
        const preset = FULL_THEME_PRESETS.find((p) => p.id === appliedPresetId);
        if (preset) {
          const root = window.document.documentElement;
          const presetData = mode === "dark" ? preset.dark : preset.light;

          // Применяем цвета напрямую
          const updatedColors = { ...presetData.colors };
          setColorsState(updatedColors);
          localStorage.setItem("theme-colors", JSON.stringify(updatedColors));

          Object.entries(presetData.colors).forEach(([key, value]) => {
            if (value) {
              const varName = colorVarMapping[key as keyof ThemeColors];
              if (varName) {
                // Если это цвет графика и значение в HEX, конвертируем в HSL
                if (key.startsWith("chart") && value.startsWith("#")) {
                  const hsl = hexToHSL(value);
                  root.style.setProperty(
                    varName,
                    `${hsl.h} ${hsl.s}% ${hsl.l}%`,
                  );
                } else {
                  root.style.setProperty(varName, value);
                }
              }
            }
          });
        }
      });
    } else if (colors.primary) {
      // Если пресет не применен, пересоздаём цветовую схему из primary цвета
      import("@shared/lib/color-utils").then(({ generateColorScheme }) => {
        const scheme = generateColorScheme(colors.primary!, mode === "dark");
        setColors(scheme);
      });
    }
  };

  const applyFullPreset = async (preset: FullThemePreset) => {
    const root = window.document.documentElement;
    const presetData = customThemeMode === "dark" ? preset.dark : preset.light;

    // Импортируем функции конвертации цветов
    const { hexToHSL } = await import("@shared/lib/color-utils");

    // Сохраняем цвета в state
    const updatedColors = { ...presetData.colors };
    setColorsState(updatedColors);
    localStorage.setItem("theme-colors", JSON.stringify(updatedColors));

    // Применяем цвета напрямую к DOM
    Object.entries(presetData.colors).forEach(([key, value]) => {
      if (value) {
        const varName = colorVarMapping[key as keyof ThemeColors];
        if (varName) {
          // Если это цвет графика и значение в HEX, конвертируем в HSL
          if (key.startsWith("chart") && value.startsWith("#")) {
            const hsl = hexToHSL(value);
            root.style.setProperty(varName, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
          } else {
            root.style.setProperty(varName, value);
          }
        }
      }
    });

    // Применяем стили (radius, shadow, tracking)
    root.style.setProperty("--radius", presetData.radius);
    root.style.setProperty("--shadow-x", presetData.shadowX);
    root.style.setProperty("--shadow-y", presetData.shadowY);
    root.style.setProperty("--shadow-blur", presetData.shadowBlur);
    root.style.setProperty("--shadow-spread", presetData.shadowSpread);
    root.style.setProperty("--shadow-opacity", presetData.shadowOpacity);
    root.style.setProperty("--tracking-normal", presetData.trackingNormal);

    // Сохраняем информацию о примененном пресете
    localStorage.setItem("applied-theme-preset", preset.id);
  };

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    customThemeMode,
    setCustomThemeMode,
    colors,
    setColors,
    resetColors,
    applyColorScheme,
    applyFullPreset,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
