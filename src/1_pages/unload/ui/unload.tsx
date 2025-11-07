import { Header } from "@widgets/header";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Tabs } from "@shared/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Filters } from "@widgets/unload/sheet";
import { Star } from "lucide-react";

interface Filters {
  data: {
    period: string;
    rfmList: number[];
    sex: string[];
    age: string[];
  };
}

export const Unload = () => {
  const isMobile = useIsMobile();
  console.log("Unload");
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Лояльность`}
        actions={{
          left: !isMobile && (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Link to={ROUTES_PATH.LOYALTY}>
                <Button
                  variant="outline"
                  className="border-b-0! rounded-b-none! opacity-50"
                >
                  Лояльность
                </Button>
              </Link>
              <Link to={ROUTES_PATH.RFM}>
                <Button
                  variant="outline"
                  className="border-b-0! rounded-b-none! opacity-50"
                >
                  RFM
                </Button>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0! rounded-b-none! opacity-50"
                    >
                      ABC
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0! rounded-b-none! opacity-50"
                    >
                      Retention
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
              <Button variant="outline" className="border-b-0! rounded-b-none!">
                Выгрузка
              </Button>
            </div>
          ),
          right: !isMobile && (
            <Button variant="outline">
              <Star className="size-4" />
              Сохраненная аудитория
            </Button>
          ),
        }}
      />
      <div className="rounded-3xl pr-4 gap-2 flex flex-col w-full bg-background h-[calc(100vh-64px)] overflow-hidden">
        <div className="hidden max-md:flex flex-row gap-1">
          <Link to={ROUTES_PATH.LOYALTY} className="w-1/2">
            <Button
              variant="outline"
              className="border-0 border-b-1 border-r-1 rounded-none! rounded-tl-3xl! h-10 px-1 w-full opacity-50"
            >
              Лояльность
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-0 rounded-none! rounded-tr-3xl! w-1/2 h-10"
          >
            RFM
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Tabs defaultValue="include" className="col-span-3">
            <TabsContent value="include">
              <Filters />
            </TabsContent>
            <TabsContent value="exclude">
              <Filters />
            </TabsContent>
          </Tabs>
          <div className="flex flex-col justify-between h-screen pt-4 pb-20">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">События</span>
                <div className="flex flex-row flex-wrap"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Кроме</span>
                <div className="flex flex-row flex-wrap"></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col bg-muted rounded-xl px-4 py-2">
                <span className="text-xl">Пользователей</span>
                <span className="text-base text-muted-foreground">
                  В аудитории
                </span>
                <span className="text-4xl">0</span>
              </div>
              <div className="flex gap-2">
                <Button className="w-full">Выгрузить</Button>
                <Button className="w-max">
                  <Star />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
