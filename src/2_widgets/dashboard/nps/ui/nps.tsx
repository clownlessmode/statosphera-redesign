import { Card } from "@shared/ui/card";
import { motion } from "motion/react";

import { NpsSkeleton } from "./nps-skeleton";
import { useNpsController } from "../api";

export const Nps = () => {
  const { summaryNps, isSummaryNpsLoading, isSummaryNpsError } =
    useNpsController();

  if (isSummaryNpsLoading || isSummaryNpsError) {
    return <NpsSkeleton />;
  }

  return (
    <Card className="w-full items-center justify-center">
      <div className="relative inline-block">
        <motion.h1
          className="text-9xl  font-extrabold text-primary leading-none relative z-10"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {summaryNps}
        </motion.h1>

        {/* Фоновые частицы */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            animate={{
              x: [Math.random() * 200 - 100, Math.random() * 400 - 200],
              y: [Math.random() * 100 - 50, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Общий NPS</h2>
    </Card>
  );
};
