import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

const TarotSkeleton = () => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-center max-md:text-sm">
          <Skeleton className="w-[200px] h-[20px] mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <Skeleton className="w-[300px] h-[200px] rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default TarotSkeleton;
