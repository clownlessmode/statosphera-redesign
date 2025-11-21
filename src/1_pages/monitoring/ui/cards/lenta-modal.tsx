import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Badge } from "@shared/ui/badge";
import { Separator } from "@shared/ui/separator";
import { LentaProduct, LentaImage } from "../../config/types";
import { ExternalLink, Package, Star, Tag } from "lucide-react";
import { Button } from "@shared/ui/button";
import { ImageGallery } from "./image-gallery";

interface LentaModalProps {
  product: LentaProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LentaModal = ({
  product,
  open,
  onOpenChange,
}: LentaModalProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) return null;

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

  // Обрабатываем images
  let images: LentaImage[] = [];
  if (Array.isArray(product.images)) {
    images = product.images;
  } else if (typeof product.images === "string") {
    try {
      const parsed = JSON.parse(product.images);
      if (Array.isArray(parsed)) {
        images = parsed;
      }
    } catch {
      // Игнорируем ошибку парсинга
    }
  }

  const mainImage =
    images.length > 0 ? images[0].preview || images[0].medium : "";

  // Обрабатываем badges
  let badges: any = null;
  if (typeof product.badges === "string") {
    try {
      badges = JSON.parse(product.badges);
    } catch {
      // Игнорируем ошибку парсинга
    }
  } else {
    badges = product.badges;
  }

  // Обрабатываем features
  let features: any = null;
  if (typeof product.features === "string") {
    try {
      features = JSON.parse(product.features);
    } catch {
      // Игнорируем ошибку парсинга
    }
  } else {
    features = product.features;
  }

  // Обрабатываем dimensions
  let dimensions: any = null;
  if (typeof product.dimensions === "string") {
    try {
      dimensions = JSON.parse(product.dimensions);
    } catch {
      // Игнорируем ошибку парсинга
    }
  } else {
    dimensions = product.dimensions;
  }

  // Обрабатываем rating
  let rating: any = null;
  if (typeof product.rating === "string") {
    try {
      rating = JSON.parse(product.rating);
    } catch {
      // Игнорируем ошибку парсинга
    }
  } else {
    rating = product.rating;
  }

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
              {mainImage && (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full md:w-[200px] aspect-square object-contain bg-white border border-border rounded-2xl p-4"
                />
              )}
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
                  {product.price.toLocaleString()} ₽
                </div>
                {product.price_regular &&
                  product.price_regular > product.price && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <span className="line-through">
                        {product.price_regular.toFixed(2)} ₽
                      </span>
                    </div>
                  )}
              </div>

              {/* Рейтинг */}
              {rating && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Рейтинг
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {rating.rate.toFixed(1)}
                    </span>
                    {rating.votes && (
                      <span className="text-sm text-muted-foreground">
                        ({rating.votes} отзывов)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Количество */}
              {product.count !== undefined && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    В наличии
                  </div>
                  <div className="text-lg font-medium">{product.count} шт.</div>
                </div>
              )}

              {/* Флаги */}
              <div className="flex flex-wrap gap-2">
                {product.is_loyalty_card_price && (
                  <Badge variant="default" className="bg-blue-500">
                    Цена по карте лояльности
                  </Badge>
                )}
                {product.is_promoaction_price && (
                  <Badge variant="default" className="bg-orange-500">
                    Акция
                  </Badge>
                )}
                {features?.isFavorite && (
                  <Badge variant="outline">Избранное</Badge>
                )}
                {features?.isAdult && <Badge variant="outline">18+</Badge>}
                {features?.isAlcohol && (
                  <Badge variant="outline">Алкоголь</Badge>
                )}
                {features?.isTobacco && <Badge variant="outline">Табак</Badge>}
              </div>

              {/* Бейджи скидок */}
              {badges?.discount && badges.discount.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {badges.discount.map((badge: any, idx: number) => (
                    <Badge
                      key={idx}
                      style={{
                        backgroundColor: badge.backgroundColor || "#ef4544",
                      }}
                      className="text-white"
                    >
                      {badge.title}
                    </Badge>
                  ))}
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

              {product.category_id && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    ID категории
                  </div>
                  <div className="text-base font-medium font-mono">
                    {product.category_id}
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

              {dimensions && (
                <>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Ширина (см)
                    </div>
                    <div className="text-base font-medium">
                      {dimensions.width}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Высота (см)
                    </div>
                    <div className="text-base font-medium">
                      {dimensions.height}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Длина (см)
                    </div>
                    <div className="text-base font-medium">
                      {dimensions.length}
                    </div>
                  </div>
                </>
              )}

              {product.count !== undefined && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Количество
                  </div>
                  <div className="text-base font-medium">
                    {product.count} шт.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Цены */}
          <Separator />
          <div>
            <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Информация о ценах
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Текущая цена
                </div>
                <div className="text-base font-medium">
                  {product.price.toLocaleString()} ₽
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Обычная цена
                </div>
                <div className="text-base font-medium">
                  {product.price_regular.toLocaleString()} ₽
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Себестоимость
                </div>
                <div className="text-base font-medium">
                  {product.cost.toLocaleString()} ₽
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Обычная себестоимость
                </div>
                <div className="text-base font-medium">
                  {product.cost_regular.toLocaleString()} ₽
                </div>
              </div>
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
                      src={img.preview || img.medium || img.icon}
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
                  images={images.map(
                    (img) => img.large || img.medium || img.preview || img.icon,
                  )}
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
