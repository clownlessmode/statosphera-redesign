import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";

import { Separator } from "@shared/ui/separator";
import { AzbukaVkusaProduct } from "../../config/types";
import { ExternalLink, Package } from "lucide-react";
import { Button } from "@shared/ui/button";
import { ImageGallery } from "./image-gallery";
import { formatWeightOrVolume } from "./utils";

interface AzbukaVkusaModalProps {
  product: AzbukaVkusaProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AzbukaVkusaModal = ({
  product,
  open,
  onOpenChange,
}: AzbukaVkusaModalProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) return null;

  // Получаем изображение из images массива - это массив строк (URL)
  let image = "";
  if (
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    const firstImage = product.images[0];
    // images может быть массивом строк или массивом объектов с url
    if (typeof firstImage === "string") {
      image = firstImage;
    } else if (
      firstImage &&
      typeof firstImage === "object" &&
      "url" in firstImage
    ) {
      image = firstImage.url || "";
    }
  }

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

  // Получаем все изображения - images может быть массивом строк или объектов
  const images =
    product.images?.map((img) =>
      typeof img === "string" ? img : img?.url || "",
    ) || [];

  // Формируем полный URL для товара (если относительный путь)
  const productUrl =
    product.url.startsWith("http") || product.url.startsWith("//")
      ? product.url
      : `https://av.ru${product.url}`;

  const price = product.price;
  const previousPrice = product.old_price || null;

  // Форматируем вес и объем
  const hasWeight = product.weight && product.weight.trim() !== "";
  const hasVolume = product.volume && product.volume.trim() !== "";
  const formattedWeight = hasWeight
    ? formatWeightOrVolume(product.weight, false, !hasVolume)
    : "";
  const formattedVolume = hasVolume
    ? formatWeightOrVolume(product.volume, true)
    : "";

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
              {image && (
                <img
                  src={image}
                  alt={product.name}
                  className="w-full md:w-[200px] aspect-square object-contain bg-white border border-border rounded-2xl p-4 cursor-pointer"
                  onClick={() => {
                    if (images.length > 0) {
                      setGalleryIndex(0);
                      setGalleryOpen(true);
                    }
                  }}
                />
              )}
              {images.length > 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setGalleryIndex(0);
                    setGalleryOpen(true);
                  }}
                  className="w-full"
                >
                  Показать все фото ({images.length})
                </Button>
              )}
              {productUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(productUrl, "_blank")}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть на сайте
                </Button>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {product.brand && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Бренд
                  </div>
                  <div className="text-lg font-medium">{product.brand}</div>
                </div>
              )}

              {product.category_slug && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Категория
                  </div>
                  <div className="text-lg font-medium">
                    {product.category_slug}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground mb-1">Цена</div>
                {price !== null && price !== undefined ? (
                  <>
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
                  </>
                ) : (
                  <div className="text-lg text-muted-foreground">
                    Цена не указана
                  </div>
                )}
              </div>

              {formattedWeight && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Вес</div>
                  <div className="text-lg font-medium">{formattedWeight}</div>
                </div>
              )}

              {formattedVolume && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Объем
                  </div>
                  <div className="text-lg font-medium">{formattedVolume}</div>
                </div>
              )}

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
                <div className="text-sm text-muted-foreground mb-1">
                  Наличие
                </div>
                <div
                  className={`text-lg font-medium ${
                    product.in_stock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.in_stock ? "В наличии" : "Нет в наличии"}
                </div>
              </div>
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
              {product.brand && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Бренд
                  </div>
                  <div className="text-base font-medium">{product.brand}</div>
                </div>
              )}

              {product.category_slug && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Категория
                  </div>
                  <div className="text-base font-medium">
                    {product.category_slug}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  ID товара
                </div>
                <div className="text-base font-medium font-mono">
                  {product.id}
                </div>
              </div>

              {product.barcode && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Штрихкод
                  </div>
                  <div className="text-base font-medium font-mono">
                    {product.barcode}
                  </div>
                </div>
              )}

              {formattedWeight && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Вес</div>
                  <div className="text-base font-medium">{formattedWeight}</div>
                </div>
              )}

              {formattedVolume && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Объем
                  </div>
                  <div className="text-base font-medium">{formattedVolume}</div>
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Наличие
                </div>
                <div
                  className={`text-base font-medium ${
                    product.in_stock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.in_stock ? "В наличии" : "Нет в наличии"}
                </div>
              </div>

              {product.is_new && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Новинка
                  </div>
                  <div className="text-base font-medium">Да</div>
                </div>
              )}

              {product.is_hit && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Хит</div>
                  <div className="text-base font-medium">Да</div>
                </div>
              )}

              {product.rating !== null && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Рейтинг
                  </div>
                  <div className="text-base font-medium">{product.rating}</div>
                </div>
              )}

              {product.reviews_count !== null && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Отзывов
                  </div>
                  <div className="text-base font-medium">
                    {product.reviews_count}
                  </div>
                </div>
              )}

              {product.discount_percent !== null && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Скидка
                  </div>
                  <div className="text-base font-medium text-red-600">
                    {product.discount_percent}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Даты */}
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Создан:</span>{" "}
              {formatDate(product.created_at)}
            </div>
            <div>
              <span className="font-medium">Обновлен:</span>{" "}
              {formatDate(product.updated_at)}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Галерея изображений */}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
          initialIndex={galleryIndex}
        />
      )}
    </Dialog>
  );
};
