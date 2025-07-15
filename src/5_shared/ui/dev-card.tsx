import { memo } from "react";
import ASCIIText from "./ASCIIText";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export const DevCard = memo(
  ({ title, className }: { title: string; className?: string }) => {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title} (В разработке)</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="min-h-[500px]">
            <ASCIIText text="DEV" enableWaves={false} asciiFontSize={8} />
          </div>
        </CardContent>
      </Card>
    );
  },
);

DevCard.displayName = "DevCard";
