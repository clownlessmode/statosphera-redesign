import { useState, useEffect, useCallback } from "react";
import { Button } from "@shared/ui/button";
import { Save, Check, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@shared/ui/dialog";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import {
  PreparedFilterBlock,
  useUnloadFilterStore,
} from "@widgets/unload/sheet/model/filters-store";
import { useSaveUnloadController } from "../api/controller";
import { SaveUnloadRequest } from "../api/service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@shared/lib/utils";

export default function SaveUnload() {
  const [isOpen, setIsOpen] = useState(false);
  const [unloadName, setUnloadName] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [nameStatus, setNameStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  const { getPreparedFilter } = useUnloadFilterStore();
  const allData = getPreparedFilter();
  const { checkUnique, saveUnload, isSaving } = useSaveUnloadController();
  const queryClient = useQueryClient();

  // Проверяем, есть ли данные аудитории для сохранения
  const hasUnloadData =
    allData.include.length > 0 || allData.exclude.length > 0;

  // Debounced проверка уникальности имени
  const checkNameUniqueness = useCallback(
    async (name: string) => {
      if (!name.trim()) {
        setNameStatus("idle");
        return;
      }

      setNameStatus("checking");

      try {
        const result = await checkUnique({ unloadName: name.trim() });
        setNameStatus(result.available ? "unavailable" : "available");
      } catch (error) {
        console.error("Ошибка при проверке уникальности:", error);
        setNameStatus("idle");
      }
    },
    [checkUnique],
  );

  // Debounce эффект для проверки имени
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkNameUniqueness(unloadName);
    }, 500); // 500ms задержка

    return () => clearTimeout(timeoutId);
  }, [unloadName, checkNameUniqueness]);

  const handleSaveUnload = async () => {
    if (!unloadName.trim()) {
      toast.error("Введите название аудитории");
      return;
    }

    if (!hasUnloadData) {
      toast.error("Нет данных аудитории для сохранения");
      return;
    }

    if (nameStatus === "unavailable") {
      toast.error("Аудитория с таким названием уже существует");
      return;
    }

    try {
      setIsValidating(true);

      // Получаем текущие данные из store
      const currentData = getPreparedFilter();

      // Формируем запрос для сохранения
      const saveRequest: SaveUnloadRequest = {
        filter: {
          include: currentData.include as PreparedFilterBlock[],
          exclude: currentData.exclude as PreparedFilterBlock[],
        },
        nameAudience: unloadName.trim(),
      };

      await saveUnload(saveRequest);

      toast.success("Аудитория успешно сохранена");
      setUnloadName("");
      setNameStatus("idle");
      setIsOpen(false);

      // Инвалидируем кэш сохраненных аудиторий
      queryClient.invalidateQueries({ queryKey: ["saved-unload"] });
    } catch (error) {
      console.error("Ошибка при сохранении аудитории:", error);
      toast.error("Ошибка при сохранении аудитории");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUnloadName("");
    setNameStatus("idle");
  };

  const isLoading = isSaving || isValidating;
  const canSave = unloadName.trim() && nameStatus === "available" && !isLoading;

  // Определяем иконку для статуса проверки имени
  const getNameStatusIcon = () => {
    switch (nameStatus) {
      case "checking":
        return (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        );
      case "available":
        return <Check className="w-4 h-4 text-green-500" />;
      case "unavailable":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Определяем текст статуса
  const getStatusText = () => {
    switch (nameStatus) {
      case "checking":
        return "Проверка...";
      case "unavailable":
        return "Название уже используется";
      default:
        return "";
    }
  };

  if (!hasUnloadData) {
    return (
      <Button variant="outline" disabled>
        <Save className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Save className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Сохранить аудиторию
          </DialogTitle>
          <DialogDescription>
            Введите название для аудитории. Вы сможете быстро применить его
            позже из списка сохраненных аудиторий.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unload-name">Название аудитории</Label>
            <div className="flex gap-2 items-start">
              <div className="relative flex-1">
                <Input
                  id="unload-name"
                  value={unloadName}
                  onChange={(e) => setUnloadName(e.target.value)}
                  placeholder="Введите название аудитории"
                  disabled={isLoading}
                  maxLength={100}
                  className={cn(
                    "pr-8", // Padding только для иконки статуса
                    nameStatus === "unavailable" &&
                      "border-red-500 focus:border-red-500",
                    nameStatus === "available" &&
                      "border-green-500 focus:border-green-500",
                  )}
                />
                {/* Иконка статуса */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {getNameStatusIcon()}
                </div>
              </div>
            </div>
            {getStatusText() && (
              <p
                className={cn(
                  "text-sm",
                  nameStatus === "checking" && "text-muted-foreground",
                  nameStatus === "available" && "text-green-600",
                  nameStatus === "unavailable" && "text-red-600",
                )}
              >
                {getStatusText()}
              </p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button onClick={handleSaveUnload} disabled={!canSave}>
              {isLoading ? "Сохранение..." : "Сохранить"}
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
