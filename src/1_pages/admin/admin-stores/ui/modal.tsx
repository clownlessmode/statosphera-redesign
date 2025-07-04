// import { Store } from "@pages/stores/model/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { useState } from "react";
import { Button } from "@shared/ui/button";
import { Edit2 } from "lucide-react";
import { FormEditStore } from "./form";

export const EditStore = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="group hover:bg-foreground/5 size-6"
        >
          <Edit2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <FormEditStore />
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
