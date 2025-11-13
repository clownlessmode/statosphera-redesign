import { Header } from "@widgets/header";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Tabs } from "@shared/ui/tabs";
import { Filters } from "@widgets/unload/sheet";
import {
  PreparedFilterBlock,
  useUnloadFilterStore,
} from "@widgets/unload/sheet/model/filters-store";
import { useUnload } from "../api";
import { useEffect, useState } from "react";
import Spinner from "@shared/ui/spinner";
import DownloadUnload from "@features/unload/download/ui/download-unload";
import SaveUnload from "@features/unload/save-unload/ui/save-unload";
import { SelectedFilters } from "./selected-filters";
import { X } from "lucide-react";

export const Unload = () => {
  const isMobile = useIsMobile();
  const { getPreparedFilter, removePreparedFilter } = useUnloadFilterStore();
  const { getAudience, isAudienceLoading } = useUnload();
  const [audienceCount, setAudienceCount] = useState<number>(0);
  const allData = getPreparedFilter();

  useEffect(() => {
    getAudience({
      filter: {
        include: allData.include as PreparedFilterBlock[],
        exclude: allData.exclude as PreparedFilterBlock[],
      },
    }).then((data) => {
      setAudienceCount(data.count);
    });
  }, [allData.include, allData.exclude]);

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
          <Tabs className="col-span-3">
            <Filters />
          </Tabs>
          <div className="flex flex-col justify-between h-screen pt-4 pb-20">
            <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide">
              <div className="flex flex-row flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground text-center">
                  События:
                </span>
                {allData.include.map((item, index) => (
                  <div key={index} className="flex flex-row gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-sm px-2 py-1 rounded-3xl hover:*:[svg]:block *:[svg]:hidden"
                          onClick={() => removePreparedFilter("include", index)}
                        >
                          Условие {index + 1}
                          <X className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        sideOffset={0}
                        className="w-max h-fit p-2 text-left"
                        side="bottom"
                      >
                        <SelectedFilters item={item} />
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
              <div className="flex flex-row flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground text-center">
                  Кроме:
                </span>
                {allData.exclude.map((item, index) => (
                  <div key={index} className="flex flex-row gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-sm px-2 py-1 rounded-3xl"
                          onClick={() => removePreparedFilter("exclude", index)}
                        >
                          Условие {index + 1}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        sideOffset={0}
                        className="w-max h-fit p-2 text-left"
                        side="bottom"
                      >
                        <SelectedFilters item={item} />
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col bg-muted rounded-xl px-4 py-2">
                <span className="text-xl">Пользователей</span>
                <span className="text-base text-muted-foreground">
                  В аудитории
                </span>
                <span className="text-4xl *:[svg]:my-2 *:[svg]:size-6">
                  {isAudienceLoading ? <Spinner /> : audienceCount}
                </span>
              </div>
              <div className="flex gap-2">
                <DownloadUnload />
                <SaveUnload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
