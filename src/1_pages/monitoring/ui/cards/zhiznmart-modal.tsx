import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";

import { Separator } from "@shared/ui/separator";
import { ZhiznmartProduct } from "../../config/types";
import { ExternalLink, Package } from "lucide-react";
import { Button } from "@shared/ui/button";
import { ImageGallery } from "./image-gallery";

interface ZhiznmartModalProps {
  product: ZhiznmartProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ZhiznmartModal = ({
  product,
  open,
  onOpenChange,
}: ZhiznmartModalProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) return null;

  const image = product.photo || product.photos?.[0] || "";

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // Получаем все изображения
  const images = [product.photo, ...(product.photos || [])].filter(
    (img): img is string => !!img && img !== product.photo,
  );

  // Убираем дубликаты
  const uniqueImages = [product.photo, ...images].filter(
    (img, index, self) => img && self.indexOf(img) === index,
  );

  const price = product.price;
  const previousPrice = product.price_before_discount || null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>Полная информация о товаре</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {/* Изображение и основные данные */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex flex-col gap-4">
              <img
                src={image}
                alt={product.name}
                className="w-full md:w-[200px] aspect-square object-contain bg-white border border-border rounded-2xl p-4"
              />
              {product.url && (
                <Button
                  variant="outline"
                  onClick={() => window.open(product.url, "_blank")}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть на сайте
                </Button>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {product.description && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Описание
                  </div>
                  <div className="text-lg font-medium">
                    {product.description}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground mb-1">Цена</div>
                <div className="text-3xl font-bold text-primary">
                  {price.toLocaleString()} ₽
                </div>
                {product.min_price !== price && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Минимальная цена: {product.min_price.toLocaleString()} ₽
                  </div>
                )}
                {previousPrice && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <span className="line-through">
                      {previousPrice.toFixed(2)} ₽
                    </span>
                  </div>
                )}
              </div>

              {product.info?.weight && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Вес</div>
                  <div className="text-lg font-medium">
                    {product.info.weight}
                  </div>
                </div>
              )}

              {product.contractor && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Поставщик
                  </div>
                  <div className="text-lg font-medium">
                    {product.contractor}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Характеристики */}
          <div>
            <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Характеристики
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  ID товара
                </div>
                <div className="text-base font-medium font-mono">
                  {product.id}
                </div>
              </div>

              {product.info?.weight && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Вес</div>
                  <div className="text-base font-medium">
                    {product.info.weight}
                  </div>
                </div>
              )}

              {product.info?.weight_value && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Вес (г)
                  </div>
                  <div className="text-base font-medium">
                    {product.info.weight_value} г
                  </div>
                </div>
              )}

              {product.rating > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Рейтинг
                  </div>
                  <div className="text-base font-medium">{product.rating}</div>
                </div>
              )}

              {product.avg_score && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Средняя оценка
                  </div>
                  <div className="text-base font-medium">
                    {product.avg_score}
                  </div>
                </div>
              )}

              {product.scores_count && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Количество оценок
                  </div>
                  <div className="text-base font-medium">
                    {product.scores_count}
                  </div>
                </div>
              )}

              {product.is_countable !== undefined && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Тип товара
                  </div>
                  <div className="text-base font-medium">
                    {product.is_countable ? "Штучный" : "Весовой"}
                  </div>
                </div>
              )}

              {product.max_quantity > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Максимальное количество
                  </div>
                  <div className="text-base font-medium">
                    {product.max_quantity}
                  </div>
                </div>
              )}
            </div>
          </div>

          {product.consist && (
            <>
              <Separator />
              <div>
                <div className="text-sm text-muted-foreground mb-2 font-medium">
                  Состав
                </div>
                <div className="text-base">{product.consist}</div>
              </div>
            </>
          )}

          {/* Дополнительные изображения */}
          {uniqueImages.length > 1 && (
            <>
              <Separator />
              <div>
                <div className="text-sm text-muted-foreground mb-3">
                  Дополнительные изображения ({uniqueImages.length})
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {uniqueImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} - изображение ${idx + 1}`}
                      className="w-full aspect-square object-contain bg-white border border-border rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setGalleryIndex(idx);
                        setGalleryOpen(true);
                      }}
                    />
                  ))}
                </div>
                <ImageGallery
                  images={uniqueImages}
                  initialIndex={galleryIndex}
                  open={galleryOpen}
                  onOpenChange={setGalleryOpen}
                />
              </div>
            </>
          )}

          <Separator />

          {/* Даты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground mb-1">Создан</div>
              <div className="font-medium">
                {formatDate(product.created_at)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Обновлен</div>
              <div className="font-medium">
                {formatDate(product.updated_at)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
