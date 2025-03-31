import { Button } from "@shared/ui/button";
import { Header } from "@widgets/header";
import { ClockIcon as ClockAlert } from "lucide-react";

import { useIsMobile } from "@shared/hooks/use-mobile";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { payments } from "./data";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@shared/ui/dialog";

const Stores = () => {
  const isMobile = useIsMobile();
  const data = payments;
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Справочник магазинов"
        actions={{
          right: (
            <Button variant="outline">
              <ClockAlert className="mr-2" />
              {!isMobile && "История изменений"}
            </Button>
          ),
        }}
      />
      <div className="rounded-3xl px-4 pt-4 gap-4 h-fit flex flex-col min-h-[calc(100vh-4rem)] w-full bg-background">
        <div className="overflow-x-auto w-full max-w-full ">
          <DataTable
            columns={columns}
            data={data}
            onRowClick={(row) => console.log("row clicked", row)}
            renderRowDialog={({ row, isOpen, onClose }) => (
              <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Детали магазина</DialogTitle>
                  </DialogHeader>
                  <pre>{JSON.stringify(row, null, 2)}</pre>
                </DialogContent>
              </Dialog>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Stores;
