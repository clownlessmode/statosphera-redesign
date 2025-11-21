import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import { Sparkles } from "lucide-react";

interface TarotCard {
  id: number;
  name: string;
  color: string;
  imageUrl: string;
  prediction: string;
  reversedPrediction: string;
}

// Обложка карты (рубашка)
const CARD_BACK_IMAGE = "/tarot/CardBacks.png";

// Маппинг Старших арканов Таро с изображениями и предсказаниями (только 22 карты)
const TAROT_CARDS: TarotCard[] = [
  {
    id: 0,
    name: "Дурак",
    color: "bg-yellow-400",
    imageUrl: "/tarot/00-TheFool.png",
    prediction:
      "Сегодня вас ждет новое начало. Не бойтесь рисковать и доверяйте своей интуиции. Возможности открываются перед вами!",
    reversedPrediction:
      "Осторожность не помешает. Не спешите с решениями, подумайте дважды. Возможно, стоит отложить важные шаги.",
  },
  {
    id: 1,
    name: "Маг",
    color: "bg-purple-400",
    imageUrl: "/tarot/01-TheMagician.png",
    prediction:
      "Вы обладаете всеми необходимыми инструментами для достижения цели. Действуйте уверенно и целенаправленно.",
    reversedPrediction:
      "Недостаток воли или ресурсов. Возможно, вы не готовы действовать. Пересмотрите свои планы и возможности.",
  },
  {
    id: 2,
    name: "Верховная Жрица",
    color: "bg-blue-400",
    imageUrl: "/tarot/02-TheHighPriestess.png",
    prediction:
      "Прислушайтесь к своему внутреннему голосу. Ответы находятся внутри вас. Доверьтесь интуиции.",
    reversedPrediction:
      "Игнорирование внутреннего голоса. Возможно, вы слишком полагаетесь на логику. Найдите баланс между разумом и чувствами.",
  },
  {
    id: 3,
    name: "Императрица",
    color: "bg-pink-400",
    imageUrl: "/tarot/03-TheEmpress.png",
    prediction:
      "Плодородный день для творчества и новых идей. Окружите себя красотой и гармонией. Время процветания!",
    reversedPrediction:
      "Застой в творчестве или отношениях. Возможно, вы слишком зависимы от материального. Найдите духовную гармонию.",
  },
  {
    id: 4,
    name: "Император",
    color: "bg-red-400",
    imageUrl: "/tarot/04-TheEmperor.png",
    prediction:
      "Проявите дисциплину и структурированность. Организуйте свои дела и действуйте с авторитетом.",
    reversedPrediction:
      "Жесткость и деспотизм. Возможно, вы слишком контролируете ситуацию. Проявите гибкость и понимание.",
  },
  {
    id: 5,
    name: "Иерофант",
    color: "bg-indigo-400",
    imageUrl: "/tarot/05-TheHierophant.png",
    prediction:
      "Ищите мудрость и знания. Возможно, вам нужен наставник или совет. Традиции и опыт помогут вам.",
    reversedPrediction:
      "Нонконформизм и отказ от традиций. Возможно, стоит найти свой путь, не опираясь на чужие советы.",
  },
  {
    id: 6,
    name: "Влюбленные",
    color: "bg-rose-400",
    imageUrl: "/tarot/06-TheLovers.png",
    prediction:
      "Важный выбор в отношениях или партнерстве. Следуйте сердцу, но не забывайте о разуме. Гармония ждет вас.",
    reversedPrediction:
      "Дисгармония и неверный выбор. Возможно, вы игнорируете предупреждения. Будьте честны с собой.",
  },
  {
    id: 7,
    name: "Колесница",
    color: "bg-orange-400",
    imageUrl: "/tarot/07-TheChariot.png",
    prediction:
      "Движение вперед и победа! Контролируйте свои эмоции и направляйте энергию в нужное русло. Успех близок!",
    reversedPrediction:
      "Отсутствие контроля и направления. Возможно, вы теряете контроль над ситуацией. Соберитесь и определите цель.",
  },
  {
    id: 8,
    name: "Сила",
    color: "bg-green-400",
    imageUrl: "/tarot/08-Strength.png",
    prediction:
      "Внутренняя сила и терпение помогут преодолеть любые препятствия. Мягкость и сострадание - ваши союзники.",
    reversedPrediction:
      "Слабость и отсутствие самоконтроля. Возможно, вы слишком агрессивны или, наоборот, слишком пассивны. Найдите баланс.",
  },
  {
    id: 9,
    name: "Отшельник",
    color: "bg-gray-400",
    imageUrl: "/tarot/09-TheHermit.png",
    prediction:
      "Время для самоанализа и поиска истины. Уединитесь и прислушайтесь к внутреннему голосу. Ответы придут.",
    reversedPrediction:
      "Изоляция и одиночество. Возможно, вы слишком закрыты от мира. Пора вернуться к общению и активности.",
  },
  {
    id: 10,
    name: "Колесо Фортуны",
    color: "bg-cyan-400",
    imageUrl: "/tarot/10-WheelOfFortune.png",
    prediction:
      "Перемены к лучшему! Судьба поворачивается в вашу пользу. Цикл завершается, начинается новый этап.",
    reversedPrediction:
      "Неудачный поворот судьбы. Возможно, перемены задерживаются. Наберитесь терпения и продолжайте движение.",
  },
  {
    id: 11,
    name: "Справедливость",
    color: "bg-emerald-400",
    imageUrl: "/tarot/11-Justice.png",
    prediction:
      "Принимайте решения с честностью и справедливостью. Каждое действие имеет последствия. Баланс восстановится.",
    reversedPrediction:
      "Несправедливость и дисбаланс. Возможно, вы нечестны с собой или другими. Время исправить ошибки.",
  },
  {
    id: 12,
    name: "Повешенный",
    color: "bg-teal-400",
    imageUrl: "/tarot/12-TheHangedMan.png",
    prediction:
      "Время паузы и переосмысления. Иногда нужно остановиться, чтобы увидеть ситуацию под новым углом.",
    reversedPrediction:
      "Бесполезные жертвы и застой. Возможно, вы застряли в ситуации. Пора действовать и двигаться вперед.",
  },
  {
    id: 13,
    name: "Смерть",
    color: "bg-slate-400",
    imageUrl: "/tarot/13-Death.png",
    prediction:
      "Завершение старого и начало нового. Не бойтесь перемен - они необходимы для роста и трансформации.",
    reversedPrediction:
      "Сопротивление переменам. Возможно, вы цепляетесь за прошлое. Отпустите старое, чтобы освободить место новому.",
  },
  {
    id: 14,
    name: "Умеренность",
    color: "bg-violet-400",
    imageUrl: "/tarot/14-Temperance.png",
    prediction:
      "Баланс и гармония во всех сферах жизни. Найдите золотую середину и объедините противоположности.",
    reversedPrediction:
      "Дисбаланс и крайности. Возможно, вы слишком импульсивны или, наоборот, слишком пассивны. Ищите равновесие.",
  },
  {
    id: 15,
    name: "Дьявол",
    color: "bg-black",
    imageUrl: "/tarot/15-TheDevil.png",
    prediction:
      "Остерегайтесь соблазнов и зависимостей. Освободитесь от ограничений, которые вы сами себе создали.",
    reversedPrediction:
      "Освобождение от оков. Возможно, вы наконец-то готовы разорвать цепи зависимости. Время для свободы!",
  },
  {
    id: 16,
    name: "Башня",
    color: "bg-amber-400",
    imageUrl: "/tarot/16-TheTower.png",
    prediction:
      "Неожиданные перемены разрушат старые структуры. Это болезненно, но необходимо для освобождения.",
    reversedPrediction:
      "Избежание разрушения. Возможно, перемены откладываются, но это лишь временная отсрочка. Готовьтесь к изменениям.",
  },
  {
    id: 17,
    name: "Звезда",
    color: "bg-sky-400",
    imageUrl: "/tarot/17-TheStar.png",
    prediction:
      "Надежда и вдохновение освещают ваш путь. Восстановление после трудностей. Следуйте за своей мечтой!",
    reversedPrediction:
      "Потеря надежды и разочарование. Возможно, вы слишком пессимистичны. Не теряйте веру в лучшее.",
  },
  {
    id: 18,
    name: "Луна",
    color: "bg-slate-300",
    imageUrl: "/tarot/18-TheMoon.png",
    prediction:
      "Не все так, как кажется. Доверьтесь интуиции, но будьте осторожны с иллюзиями. Страхи могут мешать.",
    reversedPrediction:
      "Преодоление страхов и иллюзий. Возможно, вы наконец видите правду. Доверьтесь своей интуиции.",
  },
  {
    id: 19,
    name: "Солнце",
    color: "bg-yellow-300",
    imageUrl: "/tarot/19-TheSun.png",
    prediction:
      "Радость, успех и оптимизм! Ясность и просветление. Все идет отлично, наслаждайтесь моментом!",
    reversedPrediction:
      "Временное затемнение радости. Возможно, небольшое облако на горизонте. Не теряйте оптимизм, это пройдет.",
  },
  {
    id: 20,
    name: "Суд",
    color: "bg-lime-400",
    imageUrl: "/tarot/20-Judgement.png",
    prediction:
      "Время для оценки прошлого и принятия важных решений. Прощение и освобождение от старых ошибок.",
    reversedPrediction:
      "Сомнения и самокритика. Возможно, вы слишком строги к себе. Простите себя и двигайтесь дальше.",
  },
  {
    id: 21,
    name: "Мир",
    color: "bg-fuchsia-400",
    imageUrl: "/tarot/21-TheWorld.png",
    prediction:
      "Завершение цикла и достижение цели! Полнота, гармония и успех. Новые возможности открываются перед вами!",
    reversedPrediction:
      "Незавершенность и задержки. Возможно, вы близки к цели, но что-то мешает. Завершите начатое.",
  },
];

const Tarot = () => {
  const [isBlurred, setIsBlurred] = useState(true);
  const [isSpreading, setIsSpreading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasReadToday, setHasReadToday] = useState(false);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    // Инициализируем позиции карт
    setCardPositions(TAROT_CARDS.map((_, i) => i));
  }, []);

  const shuffleCards = () => {
    setIsBlurred(false);
    setIsReversed(false);
    setSelectedCard(null);
    setIsFlipped(false);
    setHasReadToday(false);

    // Перемешиваем позиции карт один раз
    const shuffled = TAROT_CARDS.map((_, i) => i).sort(
      () => Math.random() - 0.5,
    );
    setCardPositions(shuffled);

    // Анимация перемешивания (уменьшено до 2 секунд)
    setTimeout(() => {
      setIsSpreading(true);

      // Анимация разъезжания карт (уменьшено до 1.5 секунд)
      setTimeout(() => {
        // Выбираем случайную карту
        const randomCard =
          TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
        setSelectedCard(randomCard);

        // Случайно определяем, будет ли карта перевернутой (50/50)
        const reversed = Math.random() < 0.5;
        setIsReversed(reversed);

        // Переворачиваем карту (уменьшено до 0.5 секунды)
        setTimeout(() => {
          setIsFlipped(true);
          setIsSpreading(false);
          setHasReadToday(true);
        }, 500);
      }, 1500);
    }, 2000);
  };

  const getCardPosition = (cardId: number, originalIndex: number) => {
    if (!isSpreading && !selectedCard) {
      // Начальное состояние - все карты в центре, слегка смещены для эффекта колоды
      const shuffledIndex = cardPositions[originalIndex] || originalIndex;
      const offset = (shuffledIndex - originalIndex) * 1;
      return {
        transform: `translate(${offset}px, ${offset}px) rotate(${offset * 2}deg)`,
        zIndex: shuffledIndex,
      };
    }

    if (selectedCard && selectedCard.id === cardId) {
      // Выбранная карта остается в центре и увеличивается, сохраняя пропорции
      // Если карта перевернута, поворачиваем её на 180 градусов
      const rotation = isReversed ? 180 : 0;
      return {
        transform: `translate(0, 0) scale(2.2) rotate(${rotation}deg)`,
        zIndex: 1000,
      };
    }

    // Остальные карты разъезжаются
    const angle = (originalIndex / TAROT_CARDS.length) * 360;
    const radius = 400;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return {
      transform: `translate(${x}px, ${y}px) scale(0.3) rotate(${angle}deg)`,
      opacity: 0.2,
      zIndex: 1,
    };
  };

  return (
    <Card className="w-full h-[400px] flex flex-col relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center max-md:text-sm">
          Гадание на картах Таро
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center relative">
        {/* Кнопка без блюра */}
        {isBlurred && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <Button
              onClick={shuffleCards}
              disabled={hasReadToday}
              className="text-lg px-8 py-6"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Нагадать на сегодня
            </Button>
          </div>
        )}

        {/* Контейнер с картами */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {TAROT_CARDS.map((card, index) => {
            const isSelected = selectedCard?.id === card.id;
            const shouldShow = !selectedCard || isSelected;
            const position = getCardPosition(card.id, index);

            return (
              <div
                key={card.id}
                className={cn(
                  "absolute transition-all duration-[2000ms] ease-in-out cursor-pointer group",
                  !shouldShow && "opacity-0 pointer-events-none",
                )}
                style={{
                  ...position,
                  transformOrigin: "center center",
                  left: "50%",
                  top: "50%",
                  width: "96px",
                  height: "128px",
                  marginLeft: "-48px",
                  marginTop: "-64px",
                  willChange: "transform, opacity",
                }}
                onClick={() => {
                  if (isSpreading && !selectedCard) {
                    setSelectedCard(card);
                    // Случайно определяем, будет ли карта перевернутой (50/50)
                    const reversed = Math.random() < 0.5;
                    setIsReversed(reversed);
                    // Отмечаем, что уже гадали в этой сессии
                    setTimeout(() => {
                      setIsFlipped(true);
                      setIsSpreading(false);
                      setHasReadToday(true);
                    }, 1000);
                  }
                }}
              >
                {/* Лицевая сторона карты (обложка) */}
                <div
                  className={cn(
                    "absolute inset-0 w-full h-full transition-transform duration-[2000ms]",
                    isFlipped && isSelected
                      ? "[transform:rotateY(180deg)]"
                      : "[transform:rotateY(0deg)]",
                  )}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={CARD_BACK_IMAGE}
                    alt="Обложка карты"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Обратная сторона карты (с изображением) */}
                <div
                  className={cn(
                    "absolute inset-0 w-full h-full transition-transform duration-[2000ms]",
                    isFlipped && isSelected
                      ? "[transform:rotateY(0deg)]"
                      : "[transform:rotateY(180deg)]",
                  )}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Предсказание на карте (появляется при hover) */}
                {hasReadToday && isSelected && isFlipped && (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2000] pointer-events-none overflow-visible">
                    <div
                      className="relative w-[95%] h-[95%] p-2.5 flex flex-col items-center justify-center text-center overflow-visible"
                      style={{
                        backgroundImage: `url('https://img.freepik.com/free-photo/white-paper-texture_1194-2301.jpg?semt=ais_hybrid&w=740&q=80')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "rgba(250, 245, 235, 0.95)",
                        boxShadow: `
                          inset 0 0 20px rgba(0, 0, 0, 0.1),
                          0 2px 8px rgba(0, 0, 0, 0.2),
                          inset 0 1px 0 rgba(255, 255, 255, 0.5)
                        `,
                        border: "1px solid rgba(139, 120, 100, 0.3)",
                        borderRadius: "4px",
                        transform: "rotate(-2deg)",
                      }}
                    >
                      <div
                        className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-visible"
                        style={{
                          transform: isReversed ? "rotate(-180deg)" : "none",
                        }}
                      >
                        <div
                          className="text-[10px] font-bold mb-1 px-1"
                          style={{
                            color: "#5c4a3a",
                            fontFamily: '"Times New Roman", serif',
                            textShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
                            letterSpacing: "0.5px",
                            lineHeight: "1.2",
                          }}
                        >
                          {card.name}
                          {isReversed && (
                            <span
                              className="block mt-0.5 opacity-80"
                              style={{
                                fontSize: "6px",
                                fontFamily: '"Times New Roman", serif',
                              }}
                            >
                              (Перевернутая)
                            </span>
                          )}
                        </div>
                        <div
                          className="text-[7px] leading-tight px-1.5 flex-1 flex items-center justify-center"
                          style={{
                            color: "#4a3a2a",
                            fontFamily: '"Times New Roman", serif',
                            textShadow: "0 0.5px 0.5px rgba(0, 0, 0, 0.1)",
                            letterSpacing: "0.2px",
                            lineHeight: "1.25",
                            textAlign: "balance" as any,
                          }}
                        >
                          {isReversed
                            ? card.reversedPrediction
                            : card.prediction}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tarot;
