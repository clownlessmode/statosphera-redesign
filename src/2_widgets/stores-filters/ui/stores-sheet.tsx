import { useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Sheet as SheetMain,
  SheetContent,
  SheetHeader,
} from "@shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { useStoresSheetStore } from "../model/stores-sheet-store";
import { useStoresFiltersStore } from "../model/stores-filters-store";
import { storesFilterTabs } from "../model/tabs";
import {
  ViewTabs,
  ViewTabsContent,
  ViewTabsGroup,
  ViewTabsGroupContent,
  ViewTabsLabel,
  ViewTabsList,
  ViewTabsTrigger,
} from "@shared/ui/view-tabs";
import { Separator } from "@shared/ui/separator";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { SubmitButton } from "./submit-button";

const StoresFiltersInner = () => {
  const { resetAllFilters } = useStoresFiltersStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const handleCloseChange = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("filters");
    setSearchParams(newParams);
  };

  return (
    <>
      {!isMobile && (
        <ViewTabsList className="flex flex-col bg-background text-inherit rounded-none px-4 gap-4 border-none md:border-r md:border-border pt-4 h-full">
          <ViewTabsGroup>
            <ViewTabsLabel>Фильтры</ViewTabsLabel>
            <ViewTabsGroupContent className="grid grid-cols-1 md:flex flex-col">
              {storesFilterTabs.map((item, index) => (
                <ViewTabsTrigger
                  value={item.title}
                  icon={item.icon}
                  key={`filter-trigger-${index}`}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <SubmitButton />
        </ViewTabsList>
      )}
      <div className="flex flex-col py-4 gap-4 md:max-w-xl md:max-h-screen md:pb-96 md:overflow-auto md:gap-8 max-md:px-4 max-md:w-full max-md:pb-18">
        {isMobile ? (
          <div className="fixed bottom-0 left-0 flex flex-row w-full h-10 mb-4 px-4 z-50 gap-2">
            <Button className="w-1/4 h-full" onClick={handleCloseChange}>
              Закрыть
            </Button>
            <SubmitButton className="w-2/4 h-full" />
            <Button className="w-1/4 h-full" onClick={resetAllFilters}>
              <Eraser className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Button onClick={resetAllFilters}>
              Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
            </Button>
            <Separator />
          </>
        )}

        {storesFilterTabs.map((item, index) => (
          <ViewTabsContent value={item.title} key={`filter-content-${index}`}>
            {item.component && <item.component />}
          </ViewTabsContent>
        ))}
      </div>
    </>
  );
};

export default function StoresFiltersSheet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, setIsOpen } = useStoresSheetStore();

  const openParam = searchParams.get("filters");

  const getOpenFromParam = (param: string | null): boolean => {
    return param === "true";
  };

  // Sync 'open' from URL
  useEffect(() => {
    setIsOpen(getOpenFromParam(openParam));
  }, [openParam, setIsOpen]);

  const handleOpenChange = (newIsOpen: boolean) => {
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      searchParams.set("filters", "true");
    } else {
      searchParams.delete("filters");
    }
    setSearchParams(searchParams, { replace: true });
  };

  const defaultValue =
    storesFilterTabs.length > 0 ? storesFilterTabs[0].title : "";

  return (
    <SheetMain open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        close={false}
        forceMount
        className="scrol max-md:w-full"
        aria-describedby={undefined}
      >
        <div>
          <Tabs defaultValue="filters" className="gap-0">
            <SheetHeader className="p-0 border-b border-border shadow-sm">
              <TabsList className="w-full rounded-none h-full md:py-2 md:px-4 md:h-fit">
                <TabsTrigger value="filters">Фильтры магазинов</TabsTrigger>
              </TabsList>
            </SheetHeader>
            <TabsContent value="filters" className="md:pr-4 md:px-2">
              <ViewTabs
                defaultValue={defaultValue}
                className="flex md:flex-row gap-4 h-screen flex-col"
              >
                <StoresFiltersInner />
              </ViewTabs>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </SheetMain>
  );
}
