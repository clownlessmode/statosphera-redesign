import { Header } from "@widgets/header";
import { useNavigate } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Tabs } from "@shared/ui/tabs";
import { Filters } from "@widgets/unload/sheet";
import {
  useUnloadFilterStore,
  PreparedFilterBlock,
} from "@widgets/unload/sheet/model/filters-store";
import { useUnload } from "../api";
import { useEffect, useState } from "react";
import Spinner from "@shared/ui/spinner";
import DownloadUnload from "@features/unload/download/ui/download-unload";
import SaveUnload from "@features/unload/save-unload/ui/save-unload";
import { SelectedFilters } from "./selected-filters";
import { Filter } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import InfoModal from "./info-modal";
import { toast } from "sonner";

export const Unload = () => {
  const isMobile = useIsMobile();
  const { getPreparedFilter, removePreparedFilter } = useUnloadFilterStore();
  const { getAudience, isAudienceLoading } = useUnload();
  const [audienceCount, setAudienceCount] = useState<number>(0);
  const allData = getPreparedFilter();
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "loyalty":
        navigate(ROUTES_PATH.LOYALTY);
        break;
      case "rfm":
        navigate(ROUTES_PATH.RFM);
        break;
      case "unload":
        navigate(ROUTES_PATH.UNLOAD);
        break;
    }
  };

  const getAudienceCount = async () => {
    try {
      const response = await getAudience({
        filter: {
          include: allData.include as PreparedFilterBlock[],
          exclude: allData.exclude as PreparedFilterBlock[],
        },
      });

      setAudienceCount(response.count);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос был отменен.");
      } else {
        console.error("Ошибка при получении аудитории:", error);
        toast.error("Ошибка при получении аудитории");
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
    getAudienceCount();
  }, [isMobile, allData.include, allData.exclude]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Лояльность`}
        actions={{
          left: !isMobile && (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Button
                variant="outline"
                className="border-b-0! rounded-b-none! opacity-50"
                onClick={() => navigate(ROUTES_PATH.LOYALTY)}
              >
                Дашборд
              </Button>
              <Button
                variant="outline"
                className="border-b-0! rounded-b-none! opacity-50"
                onClick={() => navigate(ROUTES_PATH.RFM)}
              >
                RFM
              </Button>
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
          right: <InfoModal />,
        }}
      />
      <div className="rounded-3xl md:pr-4 max-md:px-4 gap-2 flex flex-col relative w-full bg-background max-h-[calc(100vh-124px)] overflow-hidden">
        <div className="md:hidden pt-4">
          <Select defaultValue="unload" onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loyalty">Дашборд</SelectItem>
              <SelectItem value="rfm">RFM</SelectItem>
              <SelectItem value="unload">Выгрузка</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-4 md:sticky md:inset-0 max-md:flex max-md:flex-col max-md:gap-2 max-md:pb-4 max-md:h-screen max-md:overflow-y-auto scrollbar-hide">
          {isMobile ? (
            showFilters && (
              <Tabs className="col-span-3 max-md:col-span-1">
                <Filters
                  isLoading={isAudienceLoading}
                  setShowFilters={setShowFilters}
                />
              </Tabs>
            )
          ) : (
            <Tabs className="col-span-3 max-md:col-span-1">
              <Filters isLoading={isAudienceLoading} />
            </Tabs>
          )}
          {!showFilters && (
            <div className="flex flex-col justify-between h-full md:h-screen md:pt-4 md:pb-34">
              <div className="flex flex-col gap-4 md:overflow-y-auto scrollbar-hide">
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
                            className="text-sm px-2 py-1 rounded-3xl hover:line-through max-md:h-8 max-md:text-xs"
                            onClick={() =>
                              removePreparedFilter("include", index)
                            }
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
                            className="text-sm px-2 py-1 rounded-3xl hover:line-through max-md:h-8 max-md:text-xs"
                            onClick={() =>
                              removePreparedFilter("exclude", index)
                            }
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
              <div className="flex flex-col gap-4 max-md:pt-4">
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
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden"
                  >
                    <Filter />
                  </Button>
                  <DownloadUnload />
                  <SaveUnload />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
