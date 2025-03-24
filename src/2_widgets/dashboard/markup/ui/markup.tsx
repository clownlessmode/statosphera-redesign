import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

const Markup = () => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
      <div className="flex flex-col">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Наценка</CardTitle>
          <Link to="/dashboard/margin" className="p-0">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent className="leading-none text-sm">
          Текущий месяц
        </CardContent>
      </div>
      <CardFooter className="text-xl font-bold items-end flex flex-col text-left w-full">
        <p className="w-full">53,3%</p>
        <p className="w-full text-xs text-muted-foreground">1 331 636₽</p>
      </CardFooter>
    </Card>
  );
};

export default Markup;
