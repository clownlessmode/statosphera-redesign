const RadarChartSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-[70%] aspect-square rounded-full bg-muted-foreground animate-pulse" />
    <div className="w-[40%] aspect-square rounded-full bg-muted z-10" />
  </div>
);
export default RadarChartSkeleton;
