import { Badge } from "@shared/ui/badge";
import { Card, CardContent } from "@shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Pizza, Salad, ShoppingCart } from "lucide-react";
import { FC } from "react";

interface Props {
  id: string;
  cover: string;
  title: string;
  productCode: string;
  subGroup: string;
  pp: boolean;
  isIm: boolean;
  article: string;
}
const ProductCard: FC<Props> = ({
  cover,
  title,
  productCode,
  subGroup,
  pp,
  isIm,
  article,
}) => {
  const isValidCover = cover && cover.endsWith(".webp");
  const imagePath = isValidCover ? cover : "/product/cover.png";

  return (
    <Card className="h-full flex justify-center">
      <CardContent>
        <div className="flex flex-row gap-6 items-center transition-all duration-300 cursor-pointer">
          <Card
            style={{
              backgroundImage: `url(${imagePath})`,
            }}
            className="size-[130px] md:size-[150px] aspect-square bg-accent bg-no-repeat bg-center bg-cover"
          />

          <div className="flex flex-col gap-2 justify-between py-4  overflow-hidden">
            <div className="flex items-center flex-row gap-4 flex-wrap">
              <Badge className="bg-primary/5 text-primary text-[14px] hover:bg-primary/5 shadow-none">
                <span className="truncate block max-w-[200px]">{subGroup}</span>
              </Badge>
              <div className="flex items-center gap-2 shrink-0">
                {pp ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <Salad className="text-green-600 w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Продукт относится к ПП</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                      <Pizza className="text-red-500 w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Продукт не относится к ПП</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {isIm && (
                  <Tooltip>
                    <TooltipTrigger>
                      <ShoppingCart className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Продукт относится к ИМ</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[8px] overflow-hidden">
              <h3 className="text-[22px] font-semibold tracking-tight leading-tight line-clamp-3">
                {title}
              </h3>
              <h5 className="text-md font-semibold tracking-tight leading-none truncate">
                {article}
              </h5>
            </div>

            <div className="flex flex-col md:flex-row md:items-center items-start gap-1.5 md:gap-6 text-muted-foreground text-sm font-medium leading-tight">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="shrink-0">Код:</span>
                <span className="truncate">{productCode}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
