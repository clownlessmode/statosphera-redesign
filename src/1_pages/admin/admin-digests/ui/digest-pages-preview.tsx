import { useState } from "react";
import { Button } from "@shared/ui/button";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface DigestPagesPreviewProps {
  files: File[];
}

export const DigestPagesPreview = ({ files }: DigestPagesPreviewProps) => {
  const [width, setWidth] = useState<number>(100);

  const increaseWidth = () => {
    setWidth((prev) => Math.min(prev + 10, 100));
  };

  const decreaseWidth = () => {
    setWidth((prev) => Math.max(prev - 10, 10));
  };

  if (files.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Загрузите страницы дайджеста для предпросмотра
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="text-lg font-semibold">Предпросмотр страниц</h3>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={increaseWidth}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={decreaseWidth}>
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence>
          {files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <motion.img
                key={`${file.name}-${index}`}
                src={imageUrl}
                alt={`Страница ${index + 1}`}
                loading={index < 3 ? "eager" : "lazy"}
                animate={{ width: `${width}%` }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: index * 0.05,
                }}
                className="rounded-lg shadow-sm"
                onLoad={() => {
                  // Очищаем URL после загрузки для освобождения памяти
                  setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="text-sm text-muted-foreground text-center flex-shrink-0">
        Загружено страниц: {files.length}
      </div>
    </div>
  );
};
