import { useEffect } from "react";
import { useEffectsSettings } from "../hooks/use-effects-settings";

// Глобальный провайдер для border radius
export const BorderRadiusProvider = () => {
  const { settings } = useEffectsSettings();

  useEffect(() => {
    const borderRadius = settings.borderRadius ?? 12;

    // Применяем borderRadius к CSS переменной --radius (как в предустановленных темах)
    document.documentElement.style.setProperty(
      "--radius",
      `${borderRadius / 16}rem`,
    );

    // Также применяем к другим переменным радиуса
    document.documentElement.style.setProperty(
      "--radius-sm",
      `${(borderRadius - 4) / 16}rem`,
    );
    document.documentElement.style.setProperty(
      "--radius-md",
      `${(borderRadius - 2) / 16}rem`,
    );
    document.documentElement.style.setProperty(
      "--radius-lg",
      `${borderRadius / 16}rem`,
    );
    document.documentElement.style.setProperty(
      "--radius-xl",
      `${(borderRadius + 4) / 16}rem`,
    );

    // Принудительно обновляем все элементы с rounded-* классами
    const elements = document.querySelectorAll('[class*="rounded-"]');
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const classList = htmlElement.className;

      // Определяем размер радиуса на основе класса
      let radius = borderRadius;
      if (classList.includes("rounded-sm")) radius = borderRadius - 4;
      else if (classList.includes("rounded-md")) radius = borderRadius - 2;
      else if (classList.includes("rounded-lg")) radius = borderRadius;
      else if (classList.includes("rounded-xl")) radius = borderRadius + 4;
      else if (classList.includes("rounded-2xl")) radius = borderRadius + 8;
      else if (classList.includes("rounded-3xl")) radius = borderRadius + 12;
      else if (classList.includes("rounded-full")) radius = 9999;

      htmlElement.style.borderRadius = `${radius}px`;
    });

    console.log(
      "🎯 Border radius applied:",
      borderRadius,
      "to",
      elements.length,
      "elements",
    );
  }, [settings.borderRadius]);

  return null;
};
