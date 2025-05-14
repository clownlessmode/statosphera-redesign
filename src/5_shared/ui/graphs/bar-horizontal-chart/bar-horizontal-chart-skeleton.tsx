const BarHorizontalChartSkeleton = ({
  count = 10,
  sort = "asc",
}: {
  count?: number;
  sort?: "asc" | "desc";
}) => {
  const widths = Array.from({ length: count }).map((_, i) => ({
    width: 40 + i * (50 / count) + Math.random(),
    index: i,
  }));

  const sortedWidths =
    sort === "desc"
      ? widths.sort((a, b) => b.width - a.width)
      : widths.sort((a, b) => a.width - b.width);

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-4">
      {sortedWidths.map(({ width, index }) => (
        <div
          key={index}
          className="w-full h-[20px] rounded-full bg-muted-foreground animate-pulse"
          style={{
            width: `${width}%`,
          }}
        />
      ))}
    </div>
  );
};

export default BarHorizontalChartSkeleton;
