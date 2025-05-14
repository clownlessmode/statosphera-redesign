import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";

const WeeklyRevenueSkeleton = () => {
  const controlsArray = Array.from({ length: 7 }, () => useAnimation());

  useEffect(() => {
    controlsArray.forEach((controls) => {
      const loop = async () => {
        while (true) {
          const newHeight = Math.floor(Math.random() * 90) + 10; // 10–100%
          await controls.start({
            height: `${newHeight}%`,
            transition: { duration: 1.2, ease: "easeInOut" },
          });
        }
      };
      loop();
    });
  }, []);

  return (
    <div className="flex h-full min-h-[300px] items-end justify-between gap-[2%] w-full">
      {controlsArray.map((controls, i) => (
        <motion.div
          key={i}
          className="w-full rounded-[10px] bg-muted-foreground animate-pulse"
          initial={{ height: "50%" }}
          animate={controls}
        />
      ))}
    </div>
  );
};

export default WeeklyRevenueSkeleton;
