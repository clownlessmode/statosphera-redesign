import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffectsSettings } from "@shared/hooks/use-effects-settings";
import { hasEffectsAccess } from "@shared/constants/effects-users";

interface CursorHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  color: string;
}

interface CursorTrailProps {
  userId?: number;
}

// Только сердечки для ID 2734 (без черного и разбитых)
const heartsOnlyEmojis = [
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
  "💝",
  "💞",
  "💓",
  "💟",
  "❣️",
  "💌",
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

export const CursorTrail: React.FC<CursorTrailProps> = ({ userId }) => {
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { settings } = useEffectsSettings();
  console.log(mousePosition);
  // Если эффект отключен в настройках или у пользователя нет доступа, не рендерим компонент
  if (!settings.cursorTrailEnabled || !hasEffectsAccess(userId)) {
    return null;
  }

  // Выбираем набор эмодзи в зависимости от userId или используем настройки
  const emojiSet =
    userId === 2734 ? heartsOnlyEmojis : settings.cursorTrailEmojis;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Создаем новое сердечко каждые 100ms при движении мыши
      const newHeart: CursorHeart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
        color:
          romanticColors[Math.floor(Math.random() * romanticColors.length)],
      };

      setHearts((prev) => [
        ...prev.slice(-settings.cursorTrailMaxHearts),
        newHeart,
      ]); // Используем настройки для ограничения
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [emojiSet]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className={`absolute ${heart.color}`}
            style={{
              left: heart.x - 10,
              top: heart.y - 10,
              fontSize: `${settings.cursorTrailSize}px`,
            }}
            initial={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              scale: 0.3,
              rotate: 360,
              y: -50,
              x: (Math.random() - 0.5) * 100,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: settings.cursorTrailDuration,
              ease: "easeOut",
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
