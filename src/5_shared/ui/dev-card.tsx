import { memo } from "react";

import { Card, CardContent } from "./card";
import Spinner from "./spinner";
import { cn } from "@shared/lib/utils";

export const DevCard = memo(({ className }: { className?: string }) => {
  return (
    <Card className={cn(className, "h-[400px]")}>
      <CardContent className="relative h-[400px] justify-center items-center flex opacity-10">
        <Spinner />
      </CardContent>
    </Card>
  );
});

DevCard.displayName = "DevCard";
