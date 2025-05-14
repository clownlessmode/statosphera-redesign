const DonutChartSkeleton = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative ">
      <div className="absolute w-[70%] aspect-square rounded-full bg-muted-foreground animate-pulse" />
      <div className="absolute w-[40%] aspect-square rounded-full bg-muted z-10" />
    </div>
  );
};
export default DonutChartSkeleton;
