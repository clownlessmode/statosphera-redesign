import React, { useState } from "react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Textarea } from "@shared/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Plus } from "lucide-react";
import { CreateIdeaRequest } from "../types";

interface AddIdeaFormProps {
  onSubmit: (data: CreateIdeaRequest) => void;
  isLoading?: boolean;
  trigger?: React.ReactNode;
}

export const AddIdeaForm: React.FC<AddIdeaFormProps> = ({
  onSubmit,
  isLoading = false,
  trigger,
}) => {
  const [formData, setFormData] = useState<CreateIdeaRequest>({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<CreateIdeaRequest>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    const newErrors: Partial<CreateIdeaRequest> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Заголовок обязателен";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно";
    }
    if (formData.title.length > 100) {
      newErrors.title = "Заголовок не должен превышать 100 символов";
    }
    if (formData.description.length > 1000) {
      newErrors.description = "Описание не должно превышать 1000 символов";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);

    // Сброс формы и закрытие модального окна
    setFormData({
      title: "",
      description: "",
    });
    setIsOpen(false);
  };

  const handleInputChange = (field: keyof CreateIdeaRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
    });
    setErrors({});
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Предложить идею
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Предложить идею
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Заголовок идеи
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Краткое описание вашей идеи..."
              className={errors.title ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
            <p className="text-muted-foreground text-xs mt-1">
              {formData.title.length}/100 символов
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Подробное описание
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Опишите вашу идею подробно. Что именно вы хотите изменить или добавить? Как это поможет пользователям?"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <p className="text-muted-foreground text-xs mt-1">
              {formData.description.length}/1000 символов
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Отправка..." : "Предложить идею"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
