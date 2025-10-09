import React, { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  emoji: string;
  color: string;
}

interface FlyingHeartsProps {
  userId?: number;
}

const romanticEmojis = [
  "❤️",
  "💕",
  "💖",
  "💗",
  "💘",
  "💙",
  "💚",
  "💛",
  "🧡",
  "💜",
  "🌹",
  "🌺",
  "🌸",
  "🌻",
  "🌷",
  "🌼",
  "🌿",
  "🍀",
  "🌱",
  "🌾",
  "✨",
  "⭐",
  "🌟",
  "💫",
  "🌙",
  "☀️",
  "🌈",
  "🦋",
  "🐝",
  "🕊️",
  "💐",
  "🎀",
  "🎁",
  "🎂",
  "🍓",
  "🍒",
  "🍑",
  "🥰",
  "😍",
  "🥺",
  "💋",
  "👑",
  "🦄",
  "🎈",
  "🎊",
  "🎉",
  "💎",
  "🔮",
  "🌺",
  "🌻",
];

// Только цветы для ID 2734
const flowerEmojis = [
  "🌹", // красная роза
  "🌹", // ещё раз, чтобы чаще попадалась
  "🥀", // увядающая роза (тоже красивая)
  "🌺", // гибискус
  "🌸", // сакура
  "🌸", // ещё раз
  "🌻", // подсолнух
  "🌷", // тюльпан
  "🌷", // ещё раз
  "🌼", // ромашка
  "💐", // букет
  "💐", // ещё раз
  "🏵️", // розетка
  "🌿", // веточка
  "🍀", // клевер
  "🌱", // росток
  "🪷", // лотос
  "🌾", // колосья (оставлю немного для разнообразия)
];

const romanticColors = [
  "text-pink-300",
  "text-pink-400",
  "text-pink-500",
  "text-pink-600",
  "text-red-300",
  "text-red-400",
  "text-red-500",
  "text-purple-300",
  "text-purple-400",
  "text-purple-500",
  "text-yellow-300",
  "text-yellow-400",
  "text-yellow-500",
  "text-green-300",
  "text-green-400",
  "text-green-500",
  "text-blue-300",
  "text-blue-400",
  "text-blue-500",
  "text-orange-300",
  "text-orange-400",
  "text-orange-500",
];

export const FlyingHearts: React.FC<FlyingHeartsProps> = ({ userId }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  // Выбираем набор эмодзи в зависимости от userId
  const emojiSet = userId === 2734 ? flowerEmojis : romanticEmojis;
  const isOneTime = userId === 2734; // Для 2734 - одноразовая анимация

  useEffect(() => {
    const createHeart = (): Heart => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      // Для 2734 цветы падают сверху вниз, для остальных - снизу вверх
      y: isOneTime ? -50 : window.innerHeight + 50,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 40, // размер от 30 до 50px
      emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
      color: romanticColors[Math.floor(Math.random() * romanticColors.length)],
    });

    if (isOneTime) {
      // Для одноразовой анимации создаем цветы волнами
      const initialHearts = Array.from({ length: 15 }, createHeart);
      setHearts(initialHearts);

      // Добавляем ещё цветы через небольшие промежутки
      const timeout1 = setTimeout(() => {
        setHearts((prev) => [
          ...prev,
          ...Array.from({ length: 10 }, createHeart),
        ]);
      }, 300);

      const timeout2 = setTimeout(() => {
        setHearts((prev) => [
          ...prev,
          ...Array.from({ length: 10 }, createHeart),
        ]);
      }, 600);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    } else {
      // Для постоянной анимации (ID 181)
      const initialHearts = Array.from({ length: 8 }, createHeart);
      setHearts(initialHearts);

      const interval = setInterval(() => {
        setHearts((prev) => [...prev.slice(-7), createHeart()]);
      }, 800);

      return () => clearInterval(interval);
    }
  }, [emojiSet, isOneTime]);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fallDown {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .heart-float {
          animation: floatUp 4s linear forwards;
        }
        .flower-fall {
          animation: fallDown 4s linear forwards;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className={isOneTime ? "absolute" : "absolute animate-bounce"}
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: isOneTime ? undefined : "3s",
              animationIterationCount: isOneTime ? undefined : "infinite",
              animationTimingFunction: isOneTime ? undefined : "ease-in-out",
            }}
          >
            <div
              className={`${heart.color} opacity-80 ${isOneTime ? "flower-fall" : "heart-float"}`}
              style={{
                fontSize: `${heart.size}px`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              {heart.emoji}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
