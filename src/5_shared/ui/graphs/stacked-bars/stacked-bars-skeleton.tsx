const StackedBarChartSkeleton = () => {
  const barCount = 7;
  const segmentCount = 5;
  const segmentColors = [
    "bg-muted",
    "bg-muted-foreground/80",
    "bg-muted-foreground/60",
    "bg-muted-foreground/40",
    "bg-muted-foreground/20",
  ];

  return (
    <div className="w-full h-full pt-8 px-4 flex items-end justify-between gap-[20px] pb-3">
      {Array.from({ length: barCount }).map((_, barIndex) => (
        <div
          key={barIndex}
          className="flex flex-1 flex-col justify-end h-[85%] gap-[2px]"
        >
          {Array.from({ length: segmentCount }).map((_, segmentIndex) => {
            const height = `${10 + Math.random() * 20}%`;
            return (
              <div
                key={segmentIndex}
                className={`w-full animate-pulse rounded-md ${
                  segmentColors[segmentIndex % segmentColors.length]
                }`}
                style={{ height }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default StackedBarChartSkeleton;
