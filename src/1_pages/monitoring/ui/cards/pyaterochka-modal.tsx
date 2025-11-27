import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";

import { Separator } from "@shared/ui/separator";
import { PyaterochkaProduct } from "../../config/types";
import { ExternalLink, Package } from "lucide-react";
import { Button } from "@shared/ui/button";
import { ImageGallery } from "./image-gallery";

interface PyaterochkaModalProps {
  product: PyaterochkaProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PyaterochkaModal = ({
  product,
  open,
  onOpenChange,
}: PyaterochkaModalProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) return null;

  // Получаем изображение из image_links
  const image =
    product.image_links?.normal?.[0] || product.image_links?.small?.[0] || "";

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
  const images = [
    ...(product.image_links?.normal || []),
    ...(product.image_links?.small || []),
  ].filter((img, index, self) => self.indexOf(img) === index); // Убираем дубликаты

  // Обрабатываем цены: regular - базовая цена, discount и cpd_promo_price - скидочные цены
  const regularPrice = parseFloat(product.prices?.regular || "0");
  const discountPrice = product.prices?.discount
    ? parseFloat(product.prices.discount)
    : null;
  const promoPrice = product.prices?.cpd_promo_price
    ? parseFloat(product.prices.cpd_promo_price)
    : null;

  // Текущая цена - минимальная из всех доступных цен
  const prices = [regularPrice, discountPrice, promoPrice].filter(
    (p): p is number => p !== null && p > 0,
  );
  const price = prices.length > 0 ? Math.min(...prices) : regularPrice;

  // Предыдущая цена - regularPrice, если есть скидка или промо меньше regularPrice
  const previousPrice =
    (discountPrice && discountPrice < regularPrice) ||
    (promoPrice && promoPrice < regularPrice)
      ? regularPrice
      : null;

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
              {product.category_name && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Категория
                  </div>
                  <div className="text-lg font-medium">
                    {product.category_name}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground mb-1">Цена</div>
                <div className="text-3xl font-bold text-primary">
                  {price.toLocaleString()} ₽
                </div>
                {previousPrice && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <span className="line-through">
                      {previousPrice.toFixed(2)} ₽
                    </span>
                  </div>
                )}
              </div>

              {product.property_clarification && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Характеристика
                  </div>
                  <div className="text-lg font-medium">
                    {product.property_clarification}
                  </div>
                </div>
              )}

              {product.uom && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Единица измерения
                  </div>
                  <div className="text-lg font-medium">{product.uom}</div>
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

              {product.plu && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">PLU</div>
                  <div className="text-base font-medium font-mono">
                    {product.plu}
                  </div>
                </div>
              )}

              {product.category_name && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Категория
                  </div>
                  <div className="text-base font-medium">
                    {product.category_name}
                  </div>
                </div>
              )}

              {product.property_clarification && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Характеристика
                  </div>
                  <div className="text-base font-medium">
                    {product.property_clarification}
                  </div>
                </div>
              )}

              {product.uom && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Единица измерения
                  </div>
                  <div className="text-base font-medium">{product.uom}</div>
                </div>
              )}

              {product.step && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Шаг</div>
                  <div className="text-base font-medium">{product.step}</div>
                </div>
              )}
            </div>
          </div>

          {/* Дополнительные изображения */}
          {images.length > 1 && (
            <>
              <Separator />
              <div>
                <div className="text-sm text-muted-foreground mb-3">
                  Дополнительные изображения ({images.length})
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
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
                  images={images}
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
