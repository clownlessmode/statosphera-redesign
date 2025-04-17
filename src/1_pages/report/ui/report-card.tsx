import { cn } from "@shared/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import { ArrowBigDownDash, Circle, ExternalLink } from "lucide-react";
import { Link } from "react-router";

type ReportCardProps = {
  title: string;
  value: string;
  subtitle: string;
  subvalue: string;
  isNegative?: boolean;
};

export const ReportCard = ({
  title,
  value,
  subtitle,
  subvalue,
  isNegative = false,
}: ReportCardProps) => {
  return (
    <>
      <Card className="w-full h-full gap-1 flex flex-col justify-between min-w-[210px]">
        <div className="flex flex-col">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <Link to="/dashboard/margin" className="p-0">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="leading-none text-sm flex items-center gap-1">
            <p className=" text-xl font-bold">{value}</p>
            <Circle
              className={cn(
                "size-2",
                isNegative ? "text-destructive" : "text-positive"
              )}
              fill="currentColor"
            />
          </CardContent>
        </div>
        <CardFooter className=" items-end flex flex-col text-left w-full">
          <p className="w-full">{subtitle}</p>
          <p className="w-full text-muted-foreground font-bold">{subvalue}</p>
        </CardFooter>
      </Card>
    </>
  );
};
