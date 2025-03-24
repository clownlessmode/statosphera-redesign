import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

const Margin = () => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
      <div className="flex flex-col">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Маржа</CardTitle>
          <Link to="/dashboard/margin" className="p-0">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent className="leading-none text-sm">
          Текущий месяц
        </CardContent>
      </div>
      <CardFooter className="text-3xl font-bold items-start flex flex-col text-left w-full">
        34,8%
      </CardFooter>
    </Card>
  );
};

export default Margin;
