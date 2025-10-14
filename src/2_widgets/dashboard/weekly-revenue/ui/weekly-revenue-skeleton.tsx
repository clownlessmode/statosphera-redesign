import { cn } from "@shared/lib/utils";
import { motion } from "framer-motion";

const WeeklyRevenueSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <div
      className={cn(
        "flex h-full items-end justify-between gap-[2%] w-full",
        !tv && "min-h-[300px]",
      )}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-full rounded-[10px] bg-muted-foreground"
          animate={{
            height: ["40%", "60%", "40%"],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default WeeklyRevenueSkeleton;
