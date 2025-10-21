import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Badge } from "@shared/ui/badge";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface SalesDynamicsTestProps {
  onComplete: () => void;
  onRetry: () => void;
}

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const testQuestions: TestQuestion[] = [
  {
    id: "1",
    question: "Какой фильтр позволяет выбрать период для анализа продаж?",
    options: [
      "Фильтр по магазинам",
      "Фильтр по дням",
      "Фильтр LFL",
      "Фильтр группировки по датам",
    ],
    correctAnswer: 1,
    explanation:
      "Фильтр по дням позволяет выбрать конкретный период для анализа продаж.",
  },
  {
    id: "2",
    question: "Что означает LFL (Like-for-Like) фильтр?",
    options: [
      "Сравнение с аналогичным периодом прошлого года",
      "Фильтрация по каналам продаж",
      "Группировка по регионам",
      "Анализ только новых магазинов",
    ],
    correctAnswer: 0,
    explanation:
      "LFL фильтр позволяет сравнивать данные с аналогичным периодом прошлого года, исключая влияние новых магазинов.",
  },
  {
    id: "3",
    question: "Как можно выбрать несколько магазинов для детального анализа?",
    options: [
      "Только через фильтр магазинов",
      "Зажав Shift и кликая по строкам таблицы",
      "Зажав Ctrl и кликая по строкам таблицы",
      "Только по одному магазину за раз",
    ],
    correctAnswer: 2,
    explanation:
      "Для выбора нескольких магазинов нужно зажать Ctrl и кликать по строкам таблицы.",
  },
  {
    id: "4",
    question: "Что происходит с графиками при выборе магазинов в таблице?",
    options: [
      "Графики не изменяются",
      "Графики показывают данные только по выбранным магазинам",
      "Графики исчезают",
      "Графики показывают данные по всем магазинам",
    ],
    correctAnswer: 1,
    explanation:
      "При выборе магазинов в таблице графики автоматически обновляются и показывают данные только по выбранным магазинам.",
  },
  {
    id: "5",
    question:
      "Какой элемент позволяет настроить дополнительные показатели для отображения в таблице?",
    options: [
      "Поиск по магазинам",
      "Кнопка 'Добавить показатели'",
      "Фильтр по регионам",
      "Кнопка скачивания",
    ],
    correctAnswer: 1,
    explanation:
      "Кнопка 'Добавить показатели' позволяет настроить дополнительные метрики для отображения в таблице.",
  },
  {
    id: "6",
    question: "Что показывает пунктирная линия на графиках?",
    options: [
      "Прогноз на будущее",
      "Данные за выбранный период",
      "Данные за аналогичный период прошлого года",
      "Средние значения",
    ],
    correctAnswer: 2,
    explanation:
      "Пунктирная линия на графиках показывает данные за аналогичный период прошлого года для сравнения.",
  },
  {
    id: "7",
    question: "Как можно экспортировать данные для дальнейшего анализа?",
    options: [
      "Только через копирование таблицы",
      "Через кнопку 'Скачать данные'",
      "Только через печать",
      "Данные нельзя экспортировать",
    ],
    correctAnswer: 1,
    explanation:
      "Кнопка 'Скачать данные' позволяет экспортировать данные в Excel с учетом текущих фильтров.",
  },
  {
    id: "8",
    question: "Что позволяет фильтр группировки по датам?",
    options: [
      "Выбор периода анализа",
      "Настройка детализации данных: по дням, неделям или месяцам",
      "Фильтрацию по каналам",
      "Выбор магазинов",
    ],
    correctAnswer: 1,
    explanation:
      "Фильтр группировки по датам позволяет настроить детализацию данных: по дням, неделям или месяцам.",
  },
];

export const SalesDynamicsTest: React.FC<SalesDynamicsTestProps> = ({
  onComplete,
  onRetry,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    testQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80)
      return "Отлично! Вы отлично освоили модуль 'Динамика продаж'!";
    if (percentage >= 60)
      return "Хорошо! Вы хорошо понимаете основные функции модуля.";
    return "Попробуйте еще раз! Рекомендуем пройти тур заново.";
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsCompleted(false);
    onRetry();
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Тест завершен!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Поздравляем! Вы успешно прошли тест по модулю "Динамика продаж".
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={handleRetry} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Пройти еще раз
            </Button>
            <Button onClick={handleComplete}>Завершить</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const total = testQuestions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Результаты теста</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div
              className={`text-4xl font-bold ${getScoreColor(score, total)}`}
            >
              {score}/{total}
            </div>
            <div className="text-2xl font-semibold mt-2">{percentage}%</div>
            <p className="text-muted-foreground mt-2">
              {getScoreMessage(score, total)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Детальные результаты:</h3>
            {testQuestions.map((question, index) => {
              const isCorrect =
                selectedAnswers[index] === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ваш ответ:{" "}
                        {question.options[selectedAnswers[index]] ||
                          "Не выбран"}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Правильный ответ:{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2">
            <Button onClick={handleRetry} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Пройти еще раз
            </Button>
            <Button onClick={handleComplete}>Завершить</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = testQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Тест: Динамика продаж</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} из {testQuestions.length}
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / testQuestions.length) * 100}%`,
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Назад
          </Button>
          <Button onClick={handleNextQuestion} disabled={!isAnswered}>
            {currentQuestion === testQuestions.length - 1
              ? "Завершить тест"
              : "Далее"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
