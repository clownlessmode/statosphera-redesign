import { useState, useEffect } from "react";

export interface EffectsSettings {
  // Переключатели эффектов
  flyingHeartsEnabled: boolean;
  cursorTrailEnabled: boolean;
  personalMessagesEnabled: boolean;

  // Настройки FlyingHearts
  flyingHeartsEmojis: string[];
  flyingHeartsSize: {
    min: number;
    max: number;
  };
  flyingHeartsSpeed: number;
  flyingHeartsFrequency: number; // интервал между появлениями в секундах

  // Настройки CursorTrail
  cursorTrailEmojis: string[];
  cursorTrailSize: number;
  cursorTrailDuration: number; // длительность анимации в секундах
  cursorTrailMaxHearts: number; // максимальное количество сердечек

  // Настройки персональных сообщений
  personalMessagesStyle: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    fontSize: string;
  };

  // Настройки скругления углов
  borderRadius?: number;
}

const DEFAULT_SETTINGS: EffectsSettings = {
  flyingHeartsEnabled: true,
  cursorTrailEnabled: true,
  personalMessagesEnabled: true,

  flyingHeartsEmojis: [
    "💖",
    "💕",
    "💗",
    "💝",
    "💘",
    "💞",
    "💓",
    "💟",
    "💌",
    "💋",
  ],
  flyingHeartsSize: { min: 30, max: 50 },
  flyingHeartsSpeed: 1,
  flyingHeartsFrequency: 2,

  cursorTrailEmojis: [
    "💖",
    "💕",
    "💗",
    "💝",
    "💘",
    "💞",
    "💓",
    "💟",
    "💌",
    "💋",
  ],
  cursorTrailSize: 20,
  cursorTrailDuration: 2,
  cursorTrailMaxHearts: 15,

  personalMessagesStyle: {
    backgroundColor: "#fce7f3", // bg-pink-300
    borderColor: "#be185d", // border-pink-700
    textColor: "#be185d", // text-pink-700
    fontSize: "text-lg",
  },

  borderRadius: 12,
};

export const useEffectsSettings = () => {
  const [settings, setSettings] = useState<EffectsSettings>(() => {
    const saved = localStorage.getItem("effects-settings");
    if (saved) {
      const parsedSettings = JSON.parse(saved);

      // Миграция: если borderRadius - объект, конвертируем в число
      if (
        parsedSettings.borderRadius &&
        typeof parsedSettings.borderRadius === "object"
      ) {
        parsedSettings.borderRadius = parsedSettings.borderRadius.card || 12;
      }

      return { ...DEFAULT_SETTINGS, ...parsedSettings };
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("effects-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<EffectsSettings>) => {
    console.log("🎯 updateSettings called with:", updates);
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      console.log("🎯 New settings:", newSettings);
      return newSettings;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};
