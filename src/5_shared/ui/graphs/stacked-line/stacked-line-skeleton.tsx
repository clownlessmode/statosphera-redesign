import { useMemo } from "react";
const generateSmoothPath = (points: number[]) => {
  const step = 100 / (points.length - 1);
  let d = `M 0,${100 - points[0]}`;
  for (let i = 1; i < points.length; i++) {
    const x = i * step;
    const prevY = 100 - points[i - 1];
    const currY = 100 - points[i];
    const midX = x - step / 2;
    d += ` C ${midX},${prevY} ${midX},${currY} ${x},${currY}`;
  }
  return d;
};

const generatePoints = () =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 30); // от 30% до 90%

const StackedLineSkeleton = () => {
  const line1 = useMemo(() => generatePoints(), []);
  const line2 = useMemo(() => generatePoints(), []);
  return (
    <div className="w-full h-[300px] relative animate-pulse">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full text-muted-foreground"
      >
        <path
          d={generateSmoothPath(line1)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d={generateSmoothPath(line2)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default StackedLineSkeleton;
