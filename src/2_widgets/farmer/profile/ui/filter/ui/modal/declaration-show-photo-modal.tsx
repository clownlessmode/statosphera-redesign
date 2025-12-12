import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { FC, useState } from "react";
import { ProfileResponse } from "@entities/farmer/config/types";

const DeclarationShowPhotoModal: FC<{
  declaration: ProfileResponse["declarations"][0];
  children: React.ReactNode;
}> = ({ declaration, children }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-max h-max p-0!"
          disabled={!declaration.photoDeclaration}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="min-w-0 text-balance text-ellipsis overflow-ellipsis">
              {declaration.nameDeclaration}
            </CardTitle>
            <CardDescription>
              Дата окончания:
              <span className="text-sm text-muted-foreground">
                {declaration.dateEndDeclaration}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            {isLoading && (
              <span className="absolute inset-0 flex items-center justify-center text-center text-base font-medium text-muted-foreground">
                Загрузка фото...
              </span>
            )}
            <img
              src={declaration.photoDeclaration || ""}
              alt="declaration photo"
              loading="lazy"
              className="w-auto h-auto max-w-full max-h-[80vh] object-contain p-2"
              onLoad={() => setIsLoading(false)}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DeclarationShowPhotoModal;
