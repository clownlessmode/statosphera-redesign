import { useState, useCallback } from "react";
import { Test, TestQuestion, TestResult } from "../../config/types";
import { TESTS_MOCK } from "../tests-mock";

export const useTests = () => {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [questionId: number]: number[] | string[];
  }>({});
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);

  // Получить тест по ID урока
  const getTestByLessonId = useCallback((lessonId: number): Test | null => {
    return TESTS_MOCK.find((test) => test.lessonId === lessonId) || null;
  }, []);

  // Начать тест
  const startTest = useCallback(
    (lessonId: number) => {
      const test = getTestByLessonId(lessonId);
      if (test) {
        setCurrentTest(test);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setTestResults(null);
        setIsTestActive(true);
      }
    },
    [getTestByLessonId],
  );

  // Ответить на вопрос
  const answerQuestion = useCallback(
    (questionId: number, answer: number[] | string[]) => {
      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }));
    },
    [],
  );

  // Перейти к следующему вопросу
  const nextQuestion = useCallback(() => {
    if (
      currentTest &&
      currentQuestionIndex < currentTest.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentTest, currentQuestionIndex]);

  // Перейти к предыдущему вопросу
  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Завершить тест
  const finishTest = useCallback(() => {
    if (!currentTest) return;

    const answers = Object.entries(userAnswers)
      .map(([questionId, userAnswer]) => {
        const question = currentTest.questions.find(
          (q) => q.id === parseInt(questionId),
        );
        if (!question) return null;

        let isCorrect = false;

        if (
          question.type === "multiple-choice" ||
          question.type === "single-choice"
        ) {
          // Сравниваем массивы индексов
          const correctIndices = question.correctAnswers as number[];
          const userIndices = userAnswer as number[];
          isCorrect =
            JSON.stringify(correctIndices.sort()) ===
            JSON.stringify(userIndices.sort());
        } else if (question.type === "range-selector") {
          // Сравниваем числа
          const correctValue = question.correctAnswers[0] as number;
          const userValue = userAnswer[0] as number;
          isCorrect = correctValue === userValue;
        } else if (question.type === "order-cards") {
          // Сравниваем массивы строк
          const correctOrder = question.correctAnswers as string[];
          const userOrder = userAnswer as string[];
          isCorrect =
            JSON.stringify(correctOrder) === JSON.stringify(userOrder);
        } else if (question.type === "drag-drop") {
          // Для drag-drop извлекаем категории из ответов пользователя
          const correctCategories = question.correctAnswers as string[];
          const userCategories = (userAnswer as string[]).map(
            (answer) => answer.split(":")[0], // Извлекаем категорию до двоеточия
          );

          // Сортируем массивы для корректного сравнения
          const sortedCorrect = [...correctCategories].sort();
          const sortedUser = [...userCategories].sort();

          isCorrect =
            JSON.stringify(sortedCorrect) === JSON.stringify(sortedUser);
        }

        return {
          questionId: parseInt(questionId),
          userAnswer,
          isCorrect,
        };
      })
      .filter(Boolean) as {
      questionId: number;
      userAnswer: number[] | string[];
      isCorrect: boolean;
    }[];

    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const totalQuestions = currentTest.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = percentage >= currentTest.passingScore;

    const result: TestResult = {
      testId: currentTest.id,
      score: correctAnswers,
      totalQuestions,
      percentage,
      passed,
      completedAt: new Date(),
      answers,
    };

    setTestResults(result);
    setIsTestActive(false);

    return result;
  }, [currentTest, userAnswers]);

  // Сбросить тест
  const resetTest = useCallback(() => {
    setCurrentTest(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestResults(null);
    setIsTestActive(false);
  }, []);

  // Получить текущий вопрос
  const getCurrentQuestion = useCallback((): TestQuestion | null => {
    if (!currentTest) return null;
    return currentTest.questions[currentQuestionIndex] || null;
  }, [currentTest, currentQuestionIndex]);

  // Проверить, есть ли ответ на текущий вопрос
  const hasAnswerForCurrentQuestion = useCallback((): boolean => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    return userAnswers[currentQuestion.id] !== undefined;
  }, [getCurrentQuestion, userAnswers]);

  // Получить ответ на текущий вопрос
  const getCurrentAnswer = useCallback((): number[] | string[] | null => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;
    return userAnswers[currentQuestion.id] || null;
  }, [getCurrentQuestion, userAnswers]);

  return {
    // Состояние
    currentTest,
    currentQuestionIndex,
    userAnswers,
    testResults,
    isTestActive,

    // Методы
    getTestByLessonId,
    startTest,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishTest,
    resetTest,
    getCurrentQuestion,
    hasAnswerForCurrentQuestion,
    getCurrentAnswer,
  };
};
