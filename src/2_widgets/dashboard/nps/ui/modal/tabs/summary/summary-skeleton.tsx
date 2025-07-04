import { Card } from "@shared/ui/card";
import Spinner from "@shared/ui/spinner";

export const SummarySkeleton = () => {
  return (
    <Card className="animate-pulse h-full flex justify-center items-center ">
      <Spinner />
    </Card>
  );
};
