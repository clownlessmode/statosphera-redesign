// SheetDemo.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Sheet as SheetMain,
  SheetContent,
  SheetHeader,
} from "@shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import SummaryIn from "./ui/filters/ui/summary";
import { useFormResetStore } from "./model/reset-store";
import { useTabStore } from "./model/url-store";

export default function SummaryFiltersSheet() {
  const [searchParams, setSearchParams] = useSearchParams();

  const openParam = searchParams.get("open");
  //   const tabParam = searchParams.get("tab");

  const getOpenFromParam = (param: string | null): boolean => {
    return param !== "false";
  };

  //   const getTabFromParam = (
  //     param: string | null,
  //   ): "write-off" | "write-off-equip" => {
  //     return param === "write-off-equip" ? "write-off-equip" : "write-off";
  //   };

  const [open, setOpen] = useState(getOpenFromParam(openParam));

  //   const tab = useTabStore((state) => state.tab);
  //   const setTab = useTabStore((state) => state.setTab);

  // Sync 'open' from URL
  useEffect(() => {
    setOpen(getOpenFromParam(openParam));
  }, [openParam]);

  // Sync 'tab' from URL
  //   useEffect(() => {
  //     setTab(getTabFromParam(tabParam));
  //   }, [tabParam, setTab]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    searchParams.set("open", String(isOpen));
    setSearchParams(searchParams, { replace: true });
  };
  //   const { triggerReset } = useFormResetStore();
  //   const handleTabChange = (value: string) => {
  //     triggerReset();
  //     if (value === "write-off" || value === "write-off-equip") {
  //       setTab(value);
  //       searchParams.set("tab", value);
  //       setSearchParams(searchParams, { replace: true });
  //     }
  //   };

  return (
    <SheetMain open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="left" close={false} forceMount className="scrol">
        <div>
          <Tabs className="gap-0">
            <SheetHeader className="p-0 border-b border-border shadow-sm">
              <TabsList className="w-full rounded-none px-4 py-2 h-fit">
                <TabsTrigger value="write-off">Сводная</TabsTrigger>
              </TabsList>
            </SheetHeader>
            <TabsContent value="write-off" className="pr-4">
              <SummaryIn />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </SheetMain>
  );
}
