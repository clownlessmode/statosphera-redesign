import { Card } from "@shared/ui/card";
import Spinner from "@shared/ui/spinner";

export const SummarySkeleton = () => {
  return (
    <Card className="animate-pulse h-[450px] flex justify-center items-center ">
      <Spinner />
    </Card>
  );
};
