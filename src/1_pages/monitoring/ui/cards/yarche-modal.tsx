import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { Badge } from "@shared/ui/badge";
import { Separator } from "@shared/ui/separator";
import { YarcheProduct, YarcheCategory } from "../../config/types";
import { formatImageUrl } from "./utils";
import {
  TrendingDown,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Star,
  Tag,
  ShoppingCart,
  Clock,
  Building2,
  Package,
  Globe,
  Award,
} from "lucide-react";
import { Button } from "@shared/ui/button";

interface YarcheModalProps {
  product: YarcheProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const YarcheModal = ({
  product,
  open,
  onOpenChange,
}: YarcheModalProps) => {
  if (!product) return null;

  const image = formatImageUrl(product.image);

  // Нормализуем categories
  let categories: YarcheCategory[] = [];
  if (Array.isArray(product.categories)) {
    if (product.categories.length > 0) {
      const firstItem = product.categories[0];
      if (typeof firstItem === "object" && "name" in firstItem) {
        categories = product.categories as YarcheCategory[];
      }
    }
  } else if (typeof product.categories === "string") {
    if (product.categories.startsWith("[")) {
      try {
        const parsed = JSON.parse(product.categories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === "object" && "name" in parsed[0]) {
            categories = parsed as YarcheCategory[];
          }
        }
      } catch {
        // Игнорируем ошибку парсинга
      }
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
              <div>
                <div className="text-sm text-muted-foreground mb-1">Бренд</div>
                <div className="text-lg font-medium">
                  {product.brand || "Бренд не указан"}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Код товара
                </div>
                <div className="text-lg font-medium font-mono">
                  {product.code}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Цена</div>
                <div className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString()} ₽
                </div>
                {product.previous_price && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <TrendingDown className="h-4 w-4" />
                    <span className="line-through">
                      {product.previous_price.toFixed(2)} ₽
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Наличие
                </div>
                <div className="flex items-center gap-2">
                  {product.is_available ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-green-500 font-medium">
                        В наличии
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-red-500 font-medium">
                        Нет в наличии
                      </span>
                      {product.unavailable_reason && (
                        <span className="text-xs text-muted-foreground">
                          ({product.unavailable_reason})
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Рейтинг */}
              {(product.rating || product.number_of_ratings) && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Рейтинг
                  </div>
                  <div className="flex items-center gap-2">
                    {product.rating && (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {product.rating.toFixed(1)}
                        </span>
                      </>
                    )}
                    {product.number_of_ratings && (
                      <span className="text-sm text-muted-foreground">
                        ({product.number_of_ratings} отзывов)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Флаги */}
              <div className="flex flex-wrap gap-2">
                {product.is_new && (
                  <Badge variant="default" className="bg-green-500">
                    Новинка
                  </Badge>
                )}
                {product.is_hit && (
                  <Badge variant="default" className="bg-orange-500">
                    Хит продаж
                  </Badge>
                )}
                {product.is_favorite && (
                  <Badge variant="outline">Избранное</Badge>
                )}
                {product.is_adult && <Badge variant="outline">18+</Badge>}
                {product.is_veterinary_control && (
                  <Badge variant="outline">Ветконтроль</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Описание */}
          {product.description && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Описание</div>
              <div className="text-base whitespace-pre-wrap">
                {product.description}
              </div>
            </div>
          )}

          <Separator />

          {/* Информация о количестве и цене */}
          {product.quant && (
            <>
              <div>
                <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Информация о количестве
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Единица измерения
                    </div>
                    <div className="text-base font-medium">
                      {product.quant.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Минимальное количество
                    </div>
                    <div className="text-base font-medium">
                      {product.quant.minAmount}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Максимальное количество
                    </div>
                    <div className="text-base font-medium">
                      {product.quant.maxAmount}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Цена за единицу
                    </div>
                    <div className="text-base font-medium">
                      {product.quant.pricePerUnit.toLocaleString()} ₽
                    </div>
                  </div>
                  {product.quant.previousPricePerUnit && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Предыдущая цена за единицу
                      </div>
                      <div className="text-base font-medium line-through text-muted-foreground">
                        {product.quant.previousPricePerUnit.toLocaleString()} ₽
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Информация о продавце */}
          {product.agreement && (
            <>
              <div>
                <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Информация о продавце
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.agreement.seller?.name && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Продавец
                      </div>
                      <div className="text-base font-medium">
                        {product.agreement.seller.name}
                      </div>
                    </div>
                  )}
                  {product.agreement.minimalOrderSum && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Минимальная сумма заказа
                      </div>
                      <div className="text-base font-medium">
                        {product.agreement.minimalOrderSum.toLocaleString()} ₽
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

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
                    Производитель / Бренд
                  </div>
                  <div className="text-base font-medium">{product.brand}</div>
                </div>
              )}

              {product.weight_unit && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Единица веса
                  </div>
                  <div className="text-base font-medium">
                    {product.weight_unit}
                  </div>
                </div>
              )}

              {product.volume_unit && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Единица объема
                  </div>
                  <div className="text-base font-medium">
                    {product.volume_unit}
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

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Артикул
                </div>
                <div className="text-base font-medium font-mono">
                  {product.code}
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительные свойства */}
          {product.property_values &&
            Object.keys(product.property_values).length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Дополнительные свойства
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.property_values.manufacturer && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Производитель
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.manufacturer}
                        </div>
                      </div>
                    )}
                    {product.property_values.country_of_manufacture && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Страна производства
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.country_of_manufacture}
                        </div>
                      </div>
                    )}
                    {product.property_values.article_number && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Артикул производителя
                        </div>
                        <div className="text-base font-medium font-mono">
                          {product.property_values.article_number}
                        </div>
                      </div>
                    )}
                    {product.property_values.composition && (
                      <div className="md:col-span-2">
                        <div className="text-sm text-muted-foreground mb-1">
                          Состав
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.composition}
                        </div>
                      </div>
                    )}
                    {product.property_values.shelf_life && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Срок годности
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.shelf_life}
                        </div>
                      </div>
                    )}
                    {product.property_values.at_pack && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Упаковка
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.at_pack}
                        </div>
                      </div>
                    )}
                    {product.property_values.fat_content && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Жирность (%)
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.fat_content}
                        </div>
                      </div>
                    )}
                    {product.property_values.protein_content && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Белки (г)
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.protein_content}
                        </div>
                      </div>
                    )}
                    {product.property_values.carbohydrate_content && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Углеводы (г)
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.carbohydrate_content}
                        </div>
                      </div>
                    )}
                    {product.property_values.energy_value && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Энергетическая ценность (ккал)
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.energy_value}
                        </div>
                      </div>
                    )}
                    {product.property_values.obrabotka_molochnogo_producta && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Обработка
                        </div>
                        <div className="text-base font-medium">
                          {
                            product.property_values
                              .obrabotka_molochnogo_producta
                          }
                        </div>
                      </div>
                    )}
                    {product.property_values.own_trade_mark && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Собственная торговая марка
                        </div>
                        <div className="text-base font-medium">
                          {product.property_values.own_trade_mark === "да"
                            ? "Да"
                            : product.property_values.own_trade_mark}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

          {/* Время доставки */}
          {(product.min_delivery_time || product.max_delivery_time) && (
            <>
              <Separator />
              <div>
                <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Время доставки
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.min_delivery_time && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Минимальное время
                      </div>
                      <div className="text-base font-medium">
                        {product.min_delivery_time}
                      </div>
                    </div>
                  )}
                  {product.max_delivery_time && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Максимальное время
                      </div>
                      <div className="text-base font-medium">
                        {product.max_delivery_time}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Категории */}
          {categories.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground mb-3">
                Категории ({categories.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-sm py-1 px-3"
                  >
                    {category.name}
                    {category.code && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({category.code})
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Дополнительные изображения */}
          {product.images && product.images.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground mb-3">
                Дополнительные изображения ({product.images.length})
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {product.images.map((imageId, idx) => {
                  const imageNumber = String(imageId);
                  const firstTwo = imageNumber.slice(0, 2);
                  const rest = imageNumber.slice(2);
                  const imageUrl = `https://api.yarcheplus.ru/thumbnail/768x768/${firstTwo}/${rest}/${imageNumber}.webp`;
                  return (
                    <img
                      key={idx}
                      src={imageUrl}
                      alt={`${product.name} - изображение ${idx + 1}`}
                      className="w-full aspect-square object-contain bg-white border border-border rounded-lg p-2"
                    />
                  );
                })}
              </div>
            </div>
          )}

          <Separator />

          {/* Пищевая ценность на порцию */}
          {(product.energy_value_per_serving !== null ||
            product.protein_content_per_serving !== null ||
            product.fat_content_per_serving !== null ||
            product.carbohydrate_content_per_serving !== null) && (
            <>
              <div>
                <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Пищевая ценность на порцию
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.energy_value_per_serving !== null && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Энергетическая ценность
                      </div>
                      <div className="text-base font-medium">
                        {product.energy_value_per_serving} ккал
                      </div>
                    </div>
                  )}
                  {product.protein_content_per_serving !== null && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Белки
                      </div>
                      <div className="text-base font-medium">
                        {product.protein_content_per_serving} г
                      </div>
                    </div>
                  )}
                  {product.fat_content_per_serving !== null && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Жиры
                      </div>
                      <div className="text-base font-medium">
                        {product.fat_content_per_serving} г
                      </div>
                    </div>
                  )}
                  {product.carbohydrate_content_per_serving !== null && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Углеводы
                      </div>
                      <div className="text-base font-medium">
                        {product.carbohydrate_content_per_serving} г
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Мета-теги */}
          {product.meta_tags && (
            <>
              <div>
                <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  SEO информация
                </div>
                <div className="flex flex-col gap-3">
                  {product.meta_tags.title && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        SEO заголовок
                      </div>
                      <div className="text-sm font-medium">
                        {product.meta_tags.title}
                      </div>
                    </div>
                  )}
                  {product.meta_tags.description && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        SEO описание
                      </div>
                      <div className="text-sm font-medium">
                        {product.meta_tags.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

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
