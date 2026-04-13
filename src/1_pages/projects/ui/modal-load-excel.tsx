"use client";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Upload } from "lucide-react";
import { InputUploadFile } from "./input-upload-file";
import { useState } from "react";
import { useCreateForExcel } from "../api/controller";

export const ModalLoadExcel = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadKey, setUploadKey] = useState(0);
  const expectedColumns = [
    "№ Проекта",
    "Название проекта",
    "Ответственный",
    "Команда",
    "Заказчик",
    "Проджект-менеджер",
    "Дата начала",
    "Дата окончания",
    "Приоритет",
    "Этапы проекта",
  ];
  const { mutate: createForExcel, isPending } = useCreateForExcel();
  const handleSubmit = () => {
    if (!file) return;
    createForExcel(
      { file },
      {
        onSuccess: () => {
          setFile(null);
          setUploadKey((k) => k + 1);
          setOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="size-4" />
          Загрузить Excel файл с проектами
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Загрузить Excel файл с проектами</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <InputUploadFile
            key={uploadKey}
            accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            primaryText="Перетащите сюда или выберите"
            secondaryText="Поддерживаются форматы .xlsx"
            ariaLabel="Выберите Excel файл"
            onFileChange={setFile}
          />

          <div className="space-y-2">
            <p className="text-sm font-medium">Ожидаются колонки:</p>
            <ul className="flex flex-wrap gap-2 border border-border rounded-md p-3 list-none m-0">
              {expectedColumns.map((column) => (
                <li
                  key={column}
                  className="text-sm font-mono bg-muted rounded-md px-2 py-1"
                >
                  {column}
                </li>
              ))}
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            type="button"
            disabled={!file || isPending}
            onClick={handleSubmit}
          >
            Загрузить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
