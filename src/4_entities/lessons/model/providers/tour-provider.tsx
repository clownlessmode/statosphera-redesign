import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { TourProvider as ReactourTourProvider, useTour } from "@reactour/tour";
import { useNavigate } from "react-router";
import { useLessonsStore } from "../hooks/use-lessons-store";
import { setTourActive } from "../hooks/use-tour-state";

interface TourContextType {
  startTour: (lessonId: number, steps: any[]) => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  isActive: boolean;
}

const TourContext = createContext<TourContextType | null>(null);

export const useTourProvider = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTourProvider must be used within TourProvider");
  }
  return context;
};

interface TourProviderProps {
  children: React.ReactNode;
}

// Внутренний компонент для управления туром
const TourController: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lessonId, setLessonId] = useState<number | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [tourStarted, setTourStarted] = useState(false);
  const [tourWasOpened, setTourWasOpened] = useState(false);
  const lastStateRef = useRef<string>("");

  const { completeTour, updateProgress, getLessonProgress } = useLessonsStore();
  const navigate = useNavigate();

  const {
    isOpen,
    currentStep,
    setCurrentStep,
    setIsOpen,
    setSteps: setTourSteps,
  } = useTour();

  // Проверяем, что setTourSteps существует
  if (!setTourSteps) {
    return <>{children}</>;
  }

  // Постоянное логирование состояния тура каждые 10мс (только при изменениях)
  useEffect(() => {
    const interval = setInterval(() => {
      const stateForComparison = {
        isOpen,
        lessonId,
        tourStarted,
        currentStep,
        stepsLength: steps.length,
        currentPath: window.location.pathname,
        currentSearch: window.location.search,
      };

      const currentState = JSON.stringify(stateForComparison);

      if (currentState !== lastStateRef.current) {
        lastStateRef.current = currentState;
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isOpen, lessonId, tourStarted, currentStep, steps.length]);

  const startTour = useCallback(
    (newLessonId: number, newSteps: any[]) => {
      setLessonId(newLessonId);
      setSteps(newSteps);
      setTourStarted(true);

      // Получаем сохраненный прогресс
      const progress = getLessonProgress(newLessonId);
      const savedStepIndex = progress?.tourStepIndex ?? 0;

      // Проверяем, существует ли элемент сохраненного шага
      let startStepIndex = savedStepIndex;
      if (savedStepIndex > 0 && savedStepIndex < newSteps.length) {
        const targetSelector = newSteps[savedStepIndex].selector;
        const element = document.querySelector(targetSelector);

        if (!element) {
          startStepIndex = 0;
        }
      }

      setCurrentStep(startStepIndex);
      setTourSteps(newSteps);

      // Запускаем тур с небольшой задержкой
      setTimeout(() => {
        setIsOpen(true);
        setTourActive(true);
      }, 500);
    },
    [getLessonProgress, setCurrentStep, setTourSteps, setIsOpen],
  );

  const stopTour = useCallback(() => {
    setIsOpen(false);
    setTourActive(false);
    setCurrentStep(0);
    setLessonId(null);
    setSteps([]);
    setTourStarted(false);
    setTourWasOpened(false);
  }, [setIsOpen, setCurrentStep]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);

      // Сохраняем прогресс
      const progress = Math.round(((newStep + 1) / steps.length) * 100);
      if (lessonId) {
        updateProgress(lessonId, {
          tourStepIndex: newStep,
          progress: progress,
        });
      }
    }
  }, [currentStep, steps.length, lessonId, updateProgress, setCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      // Сохраняем прогресс
      const progress = Math.round(((newStep + 1) / steps.length) * 100);
      if (lessonId) {
        updateProgress(lessonId, {
          tourStepIndex: newStep,
          progress: progress,
        });
      }
    }
  }, [currentStep, steps.length, lessonId, updateProgress, setCurrentStep]);

  // Устанавливаем глобальные функции для компонентов
  useEffect(() => {
    globalTourFunctions = {
      lessonId,
      currentStep,
      steps,
      completeTour,
      updateProgress,
      setIsOpen,
      setTourActive,
      navigate,
    };
  }, [
    lessonId,
    currentStep,
    steps,
    completeTour,
    updateProgress,
    setIsOpen,
    navigate,
  ]);

  // Отслеживаем когда тур открывается
  useEffect(() => {
    if (isOpen && !tourWasOpened) {
      setTourWasOpened(true);
    }
  }, [isOpen, tourWasOpened]);

  // Обработка завершения тура (только для автоматического закрытия)
  useEffect(() => {
    // Тур закрыт автоматически только если он был открыт и потом закрыт
    if (!isOpen && lessonId && tourWasOpened) {
      // Тур закрыт автоматически (например, при ошибке)
      const progress = Math.round(((currentStep + 1) / steps.length) * 100);
      updateProgress(lessonId, {
        tourStepIndex: currentStep,
        progress: progress,
      });

      setTourActive(false);
      setTourStarted(false);
      setTourWasOpened(false);

      setTimeout(() => {
        navigate("/lessons");
      }, 100);
    }
  }, [
    isOpen,
    currentStep,
    steps.length,
    lessonId,
    updateProgress,
    navigate,
    tourWasOpened,
  ]);

  const contextValue: TourContextType = {
    startTour,
    stopTour,
    nextStep,
    prevStep,
    isActive: isOpen,
  };

  return (
    <TourContext.Provider value={contextValue}>{children}</TourContext.Provider>
  );
};

// Глобальное состояние для функций тура
let globalTourFunctions: {
  lessonId: number | null;
  currentStep: number;
  steps: any[];
  completeTour: (id: number) => void;
  updateProgress: (id: number, data: any) => void;
  setIsOpen: (open: boolean) => void;
  setTourActive: (active: boolean) => void;
  navigate: (path: string) => void;
} | null = null;

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  return (
    <ReactourTourProvider
      steps={[]}
      afterOpen={() => {
        // Блокируем скролл при открытии тура
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }}
      beforeClose={() => {
        // Восстанавливаем скролл при закрытии тура
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";
      }}
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: "8px",
          fontSize: "14px",
          padding: "16px",
          backgroundColor: "var(--background)",
          border: "1px solid var(--border)",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          color: "var(--foreground)",
          maxWidth: "320px",
        }),
        maskArea: (base) => ({
          ...base,
          rx: 8,
        }),
        badge: (base) => ({
          ...base,
          display: "none", // Скрываем точки
        }),
        controls: (base) => ({
          ...base,
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }),
        close: (base) => ({
          ...base,
          color: "var(--muted-foreground)",
          fontSize: "14px",
          backgroundColor: "transparent",
          border: "none",
          padding: "8px",
          borderRadius: "4px",
          margin: "4px",
        }),
        navigation: (base) => ({
          ...base,
          display: "flex",
          gap: "8px",
        }),
        arrow: (base) => ({
          ...base,
          display: "none", // Скрываем стрелки
        }),
      }}
      components={{
        Badge: () => null, // Полностью убираем badge
        Close: () => (
          <button
            onClick={() => {
              if (globalTourFunctions) {
                const {
                  lessonId,
                  currentStep,
                  steps,
                  updateProgress,
                  setIsOpen,
                  setTourActive,
                  navigate,
                } = globalTourFunctions;

                // Сохраняем прогресс перед закрытием
                if (lessonId) {
                  const progress = Math.round(
                    ((currentStep + 1) / steps.length) * 100,
                  );
                  updateProgress(lessonId, {
                    tourStepIndex: currentStep,
                    progress: progress,
                  });
                }

                // Закрываем тур
                setIsOpen(false);
                setTourActive(false);

                // Переходим на страницу уроков
                setTimeout(() => {
                  navigate("/lessons");
                }, 100);
              }
            }}
            style={{
              color: "var(--muted-foreground)",
              fontSize: "14px",
              backgroundColor: "transparent",
              border: "none",
              padding: "8px",
              borderRadius: "4px",
              margin: "4px",
              cursor: "pointer",
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
          >
            ✕
          </button>
        ),
        Navigation: (props: any) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {props.currentStep > 0 && (
                <button
                  onClick={() => {
                    if (props.setCurrentStep) {
                      props.setCurrentStep(props.currentStep - 1);
                    }
                  }}
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--primary)",
                    border: "1px solid var(--border)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Назад
                </button>
              )}
              {!props.steps[props.currentStep]?.hideNextButton && (
                <button
                  onClick={() => {
                    if (props.currentStep === props.steps.length - 1) {
                      // Завершаем тур
                      if (globalTourFunctions) {
                        const {
                          lessonId,
                          completeTour,
                          updateProgress,
                          setIsOpen,
                          setTourActive,
                          navigate,
                        } = globalTourFunctions;

                        if (lessonId) {
                          completeTour(lessonId);
                          updateProgress(lessonId, {
                            tourStepIndex: undefined,
                            progress: 100,
                          });
                        }

                        setIsOpen(false);
                        setTourActive(false);

                        // Переходим на страницу уроков
                        setTimeout(() => {
                          navigate("/lessons");
                        }, 100);
                      }
                    } else {
                      // Переходим к следующему шагу
                      if (props.setCurrentStep) {
                        props.setCurrentStep(props.currentStep + 1);
                      }
                    }
                  }}
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "500",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {props.currentStep === props.steps.length - 1
                    ? "Завершить"
                    : "Далее"}
                </button>
              )}
            </div>
          );
        },
      }}
    >
      <TourController>{children}</TourController>
    </ReactourTourProvider>
  );
};
