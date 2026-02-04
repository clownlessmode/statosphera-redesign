import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";
import { getCroppedImg } from "@shared/lib/canvas-utils";

interface CropAvatarDialogProps {
  open: boolean;
  imageSrc: string | null;
  imageName: string;
  onClose: () => void;
  onSave: (file: File) => void;
}

export function CropAvatarDialog({
  open,
  imageSrc,
  imageName,
  onClose,
  onSave,
}: CropAvatarDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (open && imageSrc) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedArea(null);
    }
  }, [open, imageSrc]);

  const handleSave = async () => {
    if (!imageSrc || !croppedArea) return;
    const croppedFile = await getCroppedImg(imageSrc, croppedArea, imageName);
    onSave(croppedFile);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Кадрирование</DialogTitle>
        </DialogHeader>
        <div className="relative h-72 w-full overflow-hidden rounded-lg bg-muted">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              objectFit="contain"
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPixels) => setCroppedArea(areaPixels)}
            />
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Отменить
          </Button>
          <Button type="button" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
