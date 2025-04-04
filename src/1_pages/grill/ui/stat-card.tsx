import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import type { FC } from "react";
interface Props {
  title: string;
  description: string;
  number: number;
}
const StatCard: FC<Props> = ({ description, number, title }) => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between min-w-[200px]">
      <div className="flex flex-col">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="leading-none text-sm">
          {description}
        </CardContent>
      </div>
      <CardFooter className="text-3xl text-nowrap font-bold flex flex-row items-end text-left w-full">
        {number}
      </CardFooter>
    </Card>
  );
};

export default StatCard;
