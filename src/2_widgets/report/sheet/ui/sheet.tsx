// SheetDemo.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Sheet as SheetMain,
  SheetContent,
  SheetHeader,
} from "@shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";

import Commerce from "./commerce/ui/commerce";
import { Check } from "./check";
import { useTabStore } from "../model/url-store";
import { useFormResetStore } from "../model/reset-store";
import { cn } from "@shared/lib/utils";
import { useIsMobile } from "@shared/hooks/use-mobile";

export default function ReportFiltersSheet() {
  const [searchParams, setSearchParams] = useSearchParams();

  const openParam = searchParams.get("open");
  const tabParam = searchParams.get("tab");

  const getOpenFromParam = (param: string | null): boolean => {
    return param !== "false";
  };

  const getTabFromParam = (param: string | null): "commerce" | "check" => {
    return param === "check" ? "check" : "commerce";
  };

  const [open, setOpen] = useState(getOpenFromParam(openParam));

  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setTab);

  // Sync 'open' from URL
  useEffect(() => {
    setOpen(getOpenFromParam(openParam));
  }, [openParam]);

  // Sync 'tab' from URL
  useEffect(() => {
    setTab(getTabFromParam(tabParam));
  }, [tabParam, setTab]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    searchParams.set("open", String(isOpen));
    setSearchParams(searchParams, { replace: true });
  };
  const { triggerReset } = useFormResetStore();
  const handleTabChange = (value: string) => {
    triggerReset();
    if (value === "commerce" || value === "check") {
      setTab(value);
      searchParams.set("tab", value);
      setSearchParams(searchParams, { replace: true });
    }
  };
  const isMobile = useIsMobile();
  return (
    <SheetMain open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        close={false}
        forceMount
        className={cn("scrol", isMobile && "w-full")}
      >
        <div>
          <Tabs value={tab} onValueChange={handleTabChange} className="gap-0">
            <SheetHeader className="p-0 border-b border-border shadow-sm">
              <TabsList
                className={cn(
                  "w-full rounded-none",
                  isMobile ? "h-full" : "py-2 px-4 h-fit",
                )}
              >
                <TabsTrigger value="commerce">Коммерческая</TabsTrigger>
                <TabsTrigger value="check">Чековая</TabsTrigger>
              </TabsList>
            </SheetHeader>
            <TabsContent value="commerce" className="md:pr-4 px-2">
              <Commerce />
            </TabsContent>
            <TabsContent value="check" className="md:pr-4 px-2">
              <Check />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </SheetMain>
  );
}
