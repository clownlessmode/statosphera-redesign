import { Card } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { FC, useState } from "react";

const DeclarationShowPhotoModal: FC<{
  photoDeclaration: string | null;
  children: React.ReactNode;
}> = ({ photoDeclaration, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-max h-max p-0!"
          disabled={!photoDeclaration}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="">
        <Card
          style={{ backgroundImage: `url(${photoDeclaration})` }}
          className="size-full aspect-square bg-no-repeat bg-center bg-cover"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DeclarationShowPhotoModal;
