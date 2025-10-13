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
};

export const useEffectsSettings = () => {
  const [settings, setSettings] = useState<EffectsSettings>(() => {
    const saved = localStorage.getItem("effects-settings");
    return saved
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("effects-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<EffectsSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
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
