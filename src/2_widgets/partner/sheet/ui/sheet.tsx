import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Sheet, SheetContent, SheetHeader } from "@shared/ui/sheet";
import { PartnerFiltersPanel } from "./filters/partner-filters-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";

type PartnerFiltersSheetProps = {
  onSubmit: () => void | Promise<void>;
};

export default function PartnerFiltersSheet({
  onSubmit,
}: PartnerFiltersSheetProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const openParam = searchParams.get("open");
  const [open, setOpen] = useState(openParam !== "false");

  useEffect(() => {
    setOpen(openParam !== "false");
  }, [openParam]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    const p = new URLSearchParams(searchParams);
    p.set("open", String(isOpen));
    setSearchParams(p, { replace: true });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        close={false}
        forceMount
        className="scrol max-md:w-full"
        aria-describedby={undefined}
      >
        <Tabs>
          <SheetHeader className="p-0 border-b border-border shadow-sm">
            <TabsList className="w-full rounded-none h-full md:py-2 md:px-4 md:h-fit">
              <TabsTrigger value="partners">Партнеры</TabsTrigger>
            </TabsList>
          </SheetHeader>
          <TabsContent value="partners" className="md:pr-4">
            <PartnerFiltersPanel onSubmit={onSubmit} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
