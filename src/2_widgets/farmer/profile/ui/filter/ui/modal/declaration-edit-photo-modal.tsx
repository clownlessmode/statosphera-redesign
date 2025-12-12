import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Check, ScanText, Upload, X } from "lucide-react";
import { FC, Fragment, Suspense, useEffect, useState } from "react";
import { useFarmer } from "@entities/farmer/api/controller";
import { toast } from "sonner";
import Spinner from "@shared/ui/spinner";
import { Input } from "@shared/ui/input";
import { ProfileResponse } from "@entities/farmer/config";
import { Label } from "@shared/ui/label";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@shared/ui/card";
import { Separator } from "@shared/ui/separator";
import { cn } from "@shared/lib/utils";

export const DeclarationEditPhotoModal: FC<{
  declarations: ProfileResponse["declarations"];
}> = ({ declarations }) => {
  const [open, setOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { uploadDeclarationPhoto } = useFarmer();

  useEffect(() => {
    if (declarations.some((declaration) => !declaration.photoDeclaration)) {
      setOpen(true);
    }
  }, [declarations]);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    { idDeclaration }: { idDeclaration: number },
  ) => {
    if (idDeclaration && event.target.files) {
      setLoadingId(idDeclaration);
      try {
        await uploadDeclarationPhoto({
          photo: event.target.files[0],
          idDeclaration: Number(idDeclaration),
        });
      } catch (error) {
        console.error(error);
        toast.error("Не удалось загрузить фотографию");
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ScanText /> <span className="max-md:hidden">Фото деклараций</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="md:min-w-[35vw]">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[200px] w-full">
              <Spinner />
            </div>
          }
        >
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Фотографии деклараций</CardTitle>
              <CardDescription className="flex flex-row gap-4 items-center justify-center py-2 max-xs:flex-col max-xss:gap-2">
                <div className="flex flex-row gap-1 items-center">
                  <Check className="size-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    - есть фотография
                  </span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <X className="size-4 text-red-500" />
                  <span className="text-sm text-muted-foreground">
                    - нет фотографии
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
              <Separator />
              {declarations.map((declaration) => (
                <Fragment key={declaration.idDeclarations}>
                  <div className="flex flex-row gap-4 items-center justify-between max-md:flex-col max-md:gap-2">
                    <div className="grid grid-cols-[1fr_max-content] gap-2 w-full px-2 items-center max-md:grid-cols-1 max-md:px-0">
                      <div className="flex flex-row gap-2 items-center min-w-0">
                        {declaration.photoDeclaration ? (
                          <Check className="size-4 text-green-500 shrink-0" />
                        ) : (
                          <X className="size-4 text-red-500 shrink-0" />
                        )}
                        <span className="text-base font-normal break-all max-md:text-sm">
                          {declaration.nameDeclaration}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground align-middle max-md:text-xs max-md:text-right">
                        до {declaration.dateEndDeclaration}
                      </span>
                    </div>
                    <Label
                      htmlFor={`upload-declaration-photo-${declaration.idDeclarations}`}
                      className={cn(
                        "flex items-center gap-2 py-1.5 px-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-background max-md:w-full max-md:justify-center max-md:text-xs",
                        loadingId === declaration.idDeclarations &&
                          "opacity-50 cursor-not-allowed",
                      )}
                    >
                      {loadingId === declaration.idDeclarations ? (
                        <Spinner className="size-4" />
                      ) : (
                        <>
                          <Upload className="size-4 max-md:size-3" />{" "}
                          {declaration.photoDeclaration
                            ? "Заменить"
                            : "Загрузить"}
                        </>
                      )}
                    </Label>
                    <Input
                      id={`upload-declaration-photo-${declaration.idDeclarations}`}
                      type="file"
                      accept="image/jpeg, image/png, image/webp"
                      className="hidden"
                      disabled={loadingId === declaration.idDeclarations}
                      onChange={(event) => {
                        if (
                          event.target.files?.[0]?.size &&
                          event.target.files?.[0]?.size > 5 * 1024 * 1024
                        ) {
                          toast.error("Файл слишком большой (максимум 5MB)");
                          event.target.value = "";
                          return;
                        }
                        if (
                          event.target.files?.[0]?.type &&
                          !["image/jpeg", "image/png", "image/webp"].includes(
                            event.target.files?.[0]?.type,
                          )
                        ) {
                          toast.error("Неверный формат файла");
                          event.target.value = "";
                          return;
                        }
                        if (
                          event.target.files &&
                          event.target.files.length > 0
                        ) {
                          handleUpload(event, {
                            idDeclaration: declaration.idDeclarations,
                          });
                          event.target.value = "";
                        }
                      }}
                    />
                  </div>
                  <Separator />
                </Fragment>
              ))}
              {declarations.length === 0 && (
                <span className="text-sm text-muted-foreground text-center py-4">
                  У вас нет деклараций
                </span>
              )}
            </CardContent>
          </Card>
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
