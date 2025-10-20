import { useState, useEffect } from "react";

// Глобальное состояние активности тура
let globalTourActive = false;
const listeners = new Set<() => void>();

export const setTourActive = (active: boolean) => {
  globalTourActive = active;
  listeners.forEach((listener) => listener());
};

/**
 * Хук для получения глобального состояния активности тура
 * Используется компонентами для адаптации к активному туру
 */
export const useTourState = () => {
  const [isActive, setIsActive] = useState(globalTourActive);

  useEffect(() => {
    const listener = () => setIsActive(globalTourActive);
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return isActive;
};
