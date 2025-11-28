import { FarmersResponse } from "@pages/farmers/config";
import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import FarmerProfileCard from "@widgets/farmer/profile/ui/filter/ui/farmer-profile";
import { Eye } from "lucide-react";
import { useState } from "react";

export const ProfileModal = ({ farmer }: { farmer: FarmersResponse }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye />
          <span className="max-md:hidden">Посмотреть</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="min-w-[80vw] max-h-[80vh] overflow-y-auto scrollbar-hide max-md:max-h-[calc(100vh-256px)]"
      >
        <FarmerProfileCard profile={farmer} />
      </DialogContent>
    </Dialog>
  );
};
