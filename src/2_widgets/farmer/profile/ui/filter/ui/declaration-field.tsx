import { FC, useState } from "react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import DateInput from "@shared/ui/date-input"; // Проверь импорт
import { Label } from "@shared/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import { isValid, parse } from "date-fns";
import { FormField, FormMessage } from "@shared/ui/form";
import { Control } from "react-hook-form";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";

interface DeclarationsFieldProps {
  control: Control<any>;
}

export const DeclarationsField: FC<DeclarationsFieldProps> = ({ control }) => {
  const { updateFilters } = useFarmerProfileStore();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const validation =
    name.trim() &&
    date.length === 10 &&
    isValid(parse(date, "dd.MM.yyyy", new Date()));

  return (
    <FormField
      name="declarations"
      control={control}
      render={({ field }) => {
        const handleAdd = () => {
          const currentValues = field.value || [];

          if (validation) {
            const newItem = {
              nameDeclaration: name,
              dateEndDeclaration: date,
            };
            const newValues = [...currentValues, newItem];
            field.onChange(newValues);
            updateFilters("declarations", newValues as any);
            setName("");
            setDate("");
          } else {
            toast.error(
              "Заполните полностью название и дату окончания декларации",
            );
          }
        };

        const handleRemove = (index: number) => {
          const newValues = (field.value || []).filter(
            (_: any, i: number) => i !== index,
          );
          field.onChange(newValues);
          updateFilters("declarations", newValues as any);
        };

        return (
          <div className="grid grid-cols-[1fr_1fr_max-content] gap-2 items-start col-span-2">
            <span className="col-span-3 text-sm flex gap-0.5 leading-none font-medium select-none">
              Декларации
            </span>
            <div className="col-span-3 flex flex-col gap-2">
              {/* Поля ввода */}
              <div className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor="name-declaration"
                    className="text-xs text-muted-foreground"
                  >
                    Название
                  </Label>
                  <Input
                    id="name-declaration"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название декларации"
                    className="bg-background"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor="dateEnd-declaration"
                    className="text-xs text-muted-foreground"
                  >
                    Дата окончания
                  </Label>
                  <DateInput
                    id="dateEnd-declaration"
                    value={date}
                    onChange={(val) => setDate(val)}
                    placeholder="Введите дату"
                    className="bg-background"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAdd}
                  disabled={!validation}
                >
                  Сохранить
                </Button>
              </div>

              {/* Список */}
              <div className="flex flex-wrap gap-2">
                {(field.value || []).map((decl: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background gap-2 py-1.5 px-3 rounded-md text-sm border"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {decl.nameDeclaration}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        до {decl.dateEndDeclaration}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(index)}
                      className="size-4"
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </div>
          </div>
        );
      }}
    />
  );
};
