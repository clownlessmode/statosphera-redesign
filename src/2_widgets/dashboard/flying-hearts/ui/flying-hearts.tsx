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

export const FlyingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = (): Heart => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 40, // размер от 30 до 50px
      emoji: romanticEmojis[Math.floor(Math.random() * romanticEmojis.length)],
      color: romanticColors[Math.floor(Math.random() * romanticColors.length)],
    });

    // Создаем начальные сердечки
    const initialHearts = Array.from({ length: 8 }, createHeart);
    setHearts(initialHearts);

    // Создаем новые сердечки каждые 800ms
    const interval = setInterval(() => {
      setHearts((prev) => [...prev.slice(-7), createHeart()]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

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
        .heart-float {
          animation: floatUp 4s linear forwards;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-bounce"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: "3s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            }}
          >
            <div
              className={`${heart.color} opacity-80 heart-float`}
              style={{
                fontSize: `${heart.size}px`,
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
