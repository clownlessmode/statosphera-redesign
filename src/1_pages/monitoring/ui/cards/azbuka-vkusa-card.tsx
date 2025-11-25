import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@shared/ui/card";
import { TrendingDown, X } from "lucide-react";
import { Button } from "@shared/ui/button";
import { ProductCardData } from "./types";
import { AzbukaVkusaProduct } from "../../config/types";
import { AzbukaVkusaModal } from "./azbuka-vkusa-modal";
import { formatWeightOrVolume } from "./utils";

interface AzbukaVkusaCardProps {
  data: ProductCardData;
  product: AzbukaVkusaProduct;
  variant?: "grid" | "list" | "table";
  onRemove?: (id: string | number) => void;
}

export const AzbukaVkusaCard = ({
  data,
  product,
  variant = "grid",
  onRemove,
}: AzbukaVkusaCardProps) => {
  const { image: dataImage, name, brand, previous_price, id } = data;
  // Используем оригинальную цену из product, так как она может быть null
  const price = product.price;
  // Берем изображение из data (уже обработано в product-card) или напрямую из product.images
  let image = dataImage || "";
  if (
    !image &&
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

  // Форматируем вес напрямую из product для правильного отображения единиц измерения
  const hasWeight = product.weight && product.weight.trim() !== "";
  const hasVolume = product.volume && product.volume.trim() !== "";
  let weight = "";
  if (hasWeight) {
    weight = formatWeightOrVolume(product.weight, false, !hasVolume);
  } else if (hasVolume) {
    weight = formatWeightOrVolume(product.volume, true);
  } else {
    weight = data.weight; // Используем из data если нет weight/volume
  }

  const [modalOpen, setModalOpen] = useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleCardClick = () => {
    setModalOpen(true);
  };

  if (variant === "table") {
    return (
      <>
        <tr
          className="border-b hover:bg-muted/50 group cursor-pointer"
          onClick={handleCardClick}
        >
          <td className="p-4 w-[92px]">
            {image && (
              <img
                src={image}
                alt={name}
                width={60}
                height={60}
                loading="lazy"
                decoding="async"
                className="w-[60px] h-[60px] object-contain bg-white border border-border rounded-lg"
              />
            )}
          </td>
          <td className="p-4 w-fit  pl-0">
            <div className="text-sm text-muted-foreground font-light">
              {brand}
            </div>
            <div className="font-medium">{name}</div>
          </td>
          <td className="p-4 w-fit">
            <div className="text-sm text-muted-foreground">{weight}</div>
          </td>
          <td className="p-4 w-fit">
            <div className="text-primary text-lg font-bold">
              {price !== null && price !== undefined
                ? `${price.toLocaleString()} ₽`
                : "Цена не указана"}
              {previous_price ? (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3" />
                  <span className="line-through">
                    {previous_price.toFixed(2)} ₽
                  </span>
                </div>
              ) : null}
            </div>
          </td>
          {onRemove && (
            <td className="p-4" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="destructive"
                size="icon"
                className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </td>
          )}
        </tr>
        <AzbukaVkusaModal
          product={product}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </>
    );
  }

  if (variant === "list") {
    return (
      <>
        <Card
          className="w-full relative group cursor-pointer"
          onClick={handleCardClick}
        >
          {onRemove && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(e);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <CardContent className="flex flex-row gap-4 p-4 py-0">
            {image && (
              <img
                src={image}
                alt={name}
                width={100}
                height={100}
                loading="lazy"
                decoding="async"
                className="w-[100px] h-[100px] flex-shrink-0 object-contain bg-white border border-border rounded-2xl"
              />
            )}
            <div className="flex-1 flex flex-col">
              <div>
                <CardDescription className="text-sm text-muted-foreground font-light">
                  {brand}
                </CardDescription>
                <div className="flex flex-row gap-2">
                  <CardTitle className="line-clamp-2">{name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-light">
                    {weight}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-row justify-between items-start mt-1">
                <CardTitle className="text-primary text-2xl font-bold">
                  {price !== null && price !== undefined
                    ? `${price.toLocaleString()} ₽`
                    : "Цена не указана"}
                  {previous_price ? (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3" />
                      <span className="line-through">
                        {previous_price.toFixed(2)} ₽
                      </span>
                    </div>
                  ) : null}
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
        <AzbukaVkusaModal
          product={product}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </>
    );
  }

  // Grid (по умолчанию)
  return (
    <>
      <Card
        className="col-span-1 w-full gap-2 relative group cursor-pointer"
        onClick={handleCardClick}
      >
        {onRemove && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardContent>
          {image && (
            <img
              src={image}
              alt={name}
              width={100}
              height={100}
              loading="lazy"
              decoding="async"
              className="w-full aspect-square object-contain bg-white border border-border rounded-2xl overflow-hidden"
            />
          )}
        </CardContent>
        <CardContent className="py-0">
          <CardDescription className="text-sm text-muted-foreground font-light">
            {brand}
          </CardDescription>
          <CardTitle className="line-clamp-2">{name}</CardTitle>
        </CardContent>
        <CardContent className="py-0 mt-auto flex flex-row justify-between items-center">
          <CardTitle className="text-primary text-2xl font-bold items-start">
            {price !== null && price !== undefined
              ? `${price.toLocaleString()} ₽`
              : "Цена не указана"}
            {previous_price ? (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3" />
                <span className="line-through">
                  {previous_price.toFixed(2)} ₽
                </span>
              </div>
            ) : null}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-light">
            {weight}
          </CardDescription>
        </CardContent>
      </Card>
      <AzbukaVkusaModal
        product={product}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};
