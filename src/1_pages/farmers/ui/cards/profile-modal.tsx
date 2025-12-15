import { ProfileResponse } from "@entities/farmer";
import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Eye } from "lucide-react";
import { Suspense, useState } from "react";
import Spinner from "@shared/ui/spinner";
import { lazy } from "react";

const FarmerProfileCard = lazy(
  () => import("@widgets/farmer/profile/ui/filter/ui/farmer-profile"),
);

export const ProfileModal = ({ farmer }: { farmer: ProfileResponse }) => {
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
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[200px] w-full">
              <Spinner />
            </div>
          }
        >
          <FarmerProfileCard profile={farmer} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
