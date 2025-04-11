import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Sheet as SheetMain,
  SheetContent,
  SheetHeader,
} from "@shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";

import Commerce from "./commerce/ui/commerce";
import Check from "./check/check";

export default function SheetDemo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const openParam = searchParams.get("open");

  const getOpenFromParam = (param: string | null): boolean => {
    if (param === "false") return false;
    return true;
  };

  const [open, setOpen] = useState(getOpenFromParam(openParam));

  useEffect(() => {
    const shouldBeOpen = getOpenFromParam(openParam);
    setOpen(shouldBeOpen);
  }, [openParam]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    searchParams.set("open", String(isOpen));
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <SheetMain open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="left" close={false} className="sadas">
        <div>
          <Tabs defaultValue="commerce" className="gap-0">
            <SheetHeader className="p-0 border-b border-border shadow-sm">
              <TabsList className="w-full rounded-none px-4 py-2 h-fit">
                <TabsTrigger value="commerce">Коммерческая</TabsTrigger>
                <TabsTrigger value="check">Чековая</TabsTrigger>
              </TabsList>
            </SheetHeader>
            <TabsContent value="commerce" className="pr-4">
              <Commerce />
            </TabsContent>
            <TabsContent value="check">
              <Check />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </SheetMain>
  );
}
