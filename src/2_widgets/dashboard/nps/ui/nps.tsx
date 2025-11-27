import { Card } from "@shared/ui/card";
import { motion } from "motion/react";
import { NpsSkeleton } from "./nps-skeleton";
import { useNpsController } from "../api";
import { Modal } from "./modal/modal";
import { cn } from "@shared/lib/utils";
import { ArrowBigDownDash } from "lucide-react";
import { useGraphColors } from "@shared/hooks/use-graph-colors";

export const Nps = ({ tv }: { tv?: boolean }) => {
  const { summaryNps, isSummaryNpsLoading, isSummaryNpsError } =
    useNpsController();
  const { series } = useGraphColors();

  if (isSummaryNpsLoading || isSummaryNpsError) {
    return <NpsSkeleton />;
  }

  return (
    <div
      className={cn("w-full h-[400px] grid grid-rows-2 gap-2", tv && "h-full")}
    >
      <Modal>
        <Card
          className={cn(
            "w-full items-center justify-center px-8 gap-2 h-full",
            tv && "border-0",
          )}
          data-testid="nps-widget"
        >
          <div className="relative inline-block">
            <motion.h1
              className="text-8xl xs:text-7xl font-extrabold leading-none relative z-10"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{
                color: series[0],
              }}
            >
              {summaryNps}
            </motion.h1>

            {/* Фоновые частицы - оптимизация: уменьшаем количество */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  backgroundColor: series[0],
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
                  duration: 4 + Math.random() * 2, // Увеличиваем длительность анимации
                  repeat: Infinity,
                  delay: i * 1, // Увеличиваем задержку между частицами
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
          <h2 className="text-xl font-bold">Общий NPS</h2>
        </Card>
      </Modal>
      <Card
        className={cn(
          "w-full items-center justify-center px-8 gap-2 h-full",
          tv && "border-0",
        )}
        data-testid="nps-widget"
      >
        <div className="relative inline-block">
          <motion.h1
            className="text-8xl xs:text-7xl font-extrabold leading-none relative z-10"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              color: series[1],
            }}
          >
            51.78
          </motion.h1>

          {/* Фоновые частицы - оптимизация: уменьшаем количество */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                backgroundColor: series[1],
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
                duration: 4 + Math.random() * 2, // Увеличиваем длительность анимации
                repeat: Infinity,
                delay: i * 1, // Увеличиваем задержку между частицами
                ease: "easeOut",
              }}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Общий eNPS</h2>
          <h2 className="text-base flex items-center gap-0.5 text-card-foreground/40">
            (5.72п.п.)
            <ArrowBigDownDash
              className={cn("w-4 h-4 text-destructive/50")}
              fill="currentColor"
            />
          </h2>
        </div>
      </Card>
    </div>
  );
};
