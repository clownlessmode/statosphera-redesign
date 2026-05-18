import { useState } from "react";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { Link2, NotepadText, QrCode } from "lucide-react";
import { PROJECT_SURVEY_QR_SRC, PROJECT_SURVEY_URL } from "../config/survey";

export const FormSelectDropdown = () => {
  const [qrOpen, setQrOpen] = useState(false);

  const openSurveyLink = () => {
    window.open(PROJECT_SURVEY_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <NotepadText className="size-4" />
            Подать проектную заявку
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[240px]">
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onSelect={openSurveyLink}
          >
            <Link2 className="size-5 shrink-0" />
            <span>Перейти к опросу по ссылке</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onSelect={() => setQrOpen(true)}
          >
            <QrCode className="size-5 shrink-0" />
            <span>Перейти к опросу по qr-коду</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Опрос по QR-коду</DialogTitle>
          </DialogHeader>
          <DialogBody className="flex flex-col items-center gap-4 py-2">
            <img
              src={PROJECT_SURVEY_QR_SRC}
              alt="QR-код для перехода к опросу"
              className="max-h-72 w-auto rounded-lg border bg-white object-contain p-2"
            />
            <p className="text-center text-sm text-muted-foreground">
              Отсканируйте код камерой телефона или откройте опрос по ссылке.
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={openSurveyLink}
            >
              <Link2 className="size-4" />
              Открыть опрос в браузере
            </Button>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
};
