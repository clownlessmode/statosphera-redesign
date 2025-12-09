import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { ContactsEdit } from "@widgets/farmer/profile/ui/filter/ui/contacts-edit";
import { Pencil } from "lucide-react";
import { FC, useState } from "react";
import { useContactsStore } from "@widgets/farmer/profile/model/profile-store";
import { useFarmer } from "@entities/farmer/api/controller";
import { toast } from "sonner";
import { FarmersResponse } from "@pages/farmers/config";

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
        <ContactsEdit contacts={farmer.kmContacts} />
        <Button onClick={handleSave}>Сохранить</Button>
      </DialogContent>
    </Dialog>
  );
};
