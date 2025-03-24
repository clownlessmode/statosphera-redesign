import { ArrowBigDownDash, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
const WriteOffHouseholds = () => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
      <div className="flex flex-col">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Списания (ХОЗ-ы)</CardTitle>
          <Link to="/dashboard/margin" className="p-0">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent className="leading-none text-sm flex items-center gap-1">
          <p className=" text-xl font-bold">5 133₽ (0.2%)</p>
          <ArrowBigDownDash
            className="w-4 h-4 text-positive"
            fill="currentColor"
          />
        </CardContent>
      </div>
      <CardFooter className=" items-end flex flex-col text-left w-full">
        <p className="w-full">Изменения к прошлому году</p>
        <p className="w-full text-muted-foreground font-bold">
          -24 352₽ (-82.9%)
        </p>
      </CardFooter>
    </Card>
  );
};

export default WriteOffHouseholds;
