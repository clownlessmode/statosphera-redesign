import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Pencil } from "lucide-react";
import { FC, Suspense, useState } from "react";
import { useContactsStore } from "@widgets/farmer/profile/model/profile-store";
import { useFarmer } from "@entities/farmer/api/controller";
import { toast } from "sonner";
import { FarmersResponse } from "@pages/farmers/config";
import Spinner from "@shared/ui/spinner";
import { lazy } from "react";

const ContactsEdit = lazy(
  () => import("@widgets/farmer/profile/ui/filter/ui/contacts-edit"),
);

export const ContactsEditModal: FC<{ farmer: FarmersResponse }> = ({
  farmer,
}) => {
  const [open, setOpen] = useState(false);
  const contacts = useContactsStore((state) => state.contacts);
  const { updateKmContacts } = useFarmer();

  const handleSave = async () => {
    if (contacts && farmer.idUser) {
      try {
        await updateKmContacts({ contacts, idUser: Number(farmer.idUser) });
        toast.success("Контакты успешно обновлены");
        setOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Не удалось обновить контакты");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[200px] w-full">
              <Spinner />
            </div>
          }
        >
          <ContactsEdit contacts={farmer.kmContacts} />
          <Button onClick={handleSave}>Сохранить</Button>
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
