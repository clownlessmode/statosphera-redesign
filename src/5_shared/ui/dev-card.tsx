import { memo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Spinner from "./spinner";

export const DevCard = memo(
  ({ title, className }: { title: string; className?: string }) => {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title} (В разработке)</CardTitle>
        </CardHeader>
        <CardContent className="relative min-h-[500px] justify-center items-center flex">
          <Spinner />
        </CardContent>
      </Card>
    );
  },
);

DevCard.displayName = "DevCard";
