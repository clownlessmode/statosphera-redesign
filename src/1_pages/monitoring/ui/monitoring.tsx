import { Card, CardContent } from "@shared/ui/card";
import { Input } from "@shared/ui/input";

import { Header } from "@widgets/header";

import { useMonitoringController } from "../api";
import { ProductCard } from "./product-card";
import { Skeleton } from "@shared/ui/skeleton";
import pluralize from "@shared/lib/pluralize";
import { useState, useEffect } from "react";
import {
  Box,
  Grid3X3,
  Layout,
  List,
  Store,
  Minus,
  Plus,
  Save,
} from "lucide-react";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import { useIsMobile } from "@shared/hooks";
import NotSelectedFiltersNY from "@shared/assets/capibara/not-selected-filters-new-year";

export const Monitoring = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [limit, setLimit] = useState<number | undefined>(10);
  const {
    products,
    isProductsLoading,
    downloadReport,
    isDownloadReportLoading,
  } = useMonitoringController(debouncedSearch, limit);
  console.log(debouncedSearch);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms задержка

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [view, setView] = useState<"all" | "by-shops">("by-shops");
  const [displayMode, setDisplayMode] = useState<"grid" | "list" | "table">(
    "grid",
  );
  const [gridColumns, setGridColumns] = useState(5);
  const [removedProducts, setRemovedProducts] = useState<Set<string | number>>(
    new Set(),
  );

  // Сбрасываем удаленные товары при новом поиске
  useEffect(() => {
    setRemovedProducts(new Set());
  }, [debouncedSearch]);

  const yarcheProducts =
    products
      ?.filter((shop) => shop.shop === "Ярче")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];
  const magnitProducts =
    products
      ?.filter((shop) => shop.shop === "Магнит")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];

  const metroProducts =
    products
      ?.filter((shop) => shop.shop === "Метро")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];
  const lentaProducts =
    products
      ?.filter((shop) => shop.shop === "Лента")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];
  const pyaterochkaProducts =
    products
      ?.filter((shop) => shop.shop === "Пятёрочка")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];
  const zhiznmartProducts =
    products
      ?.filter((shop) => shop.shop === "Жизньмарт")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];
  const azbukaVkusaProducts =
    products
      ?.filter((shop) => shop.shop === "Азбука вкуса")
      .flatMap((shop) => shop.data)
      .filter((product) => !removedProducts.has(product.id)) || [];
  const allProducts = [
    ...yarcheProducts,
    ...magnitProducts,
    ...metroProducts,
    ...lentaProducts,
    ...pyaterochkaProducts,
    ...zhiznmartProducts,
    ...azbukaVkusaProducts,
  ];

  const handleViewChange = (view: "all" | "by-shops") => {
    setView(view);
  };

  const handleRemoveProduct = (id: string | number) => {
    setRemovedProducts((prev) => new Set([...prev, id]));
  };

  const handleDownloadReport = async () => {
    try {
      // 1) Получаем Blob
      const blob = await downloadReport({
        yarche: yarcheProducts.map((product) => product.id.toString()),
        magnit: magnitProducts.map((product) => product.id.toString()),
        metro: metroProducts.map((product) => product.id.toString()),
        lenta: lentaProducts.map((product) => product.id.toString()),
        pyaterochka: pyaterochkaProducts.map((product) =>
          product.id.toString(),
        ),
        jiznmart: zhiznmartProducts.map((product) => product.id.toString()),
        azbuka_vkusa: azbukaVkusaProducts.map((product) =>
          product.id.toString(),
        ),
      });

      // 2) Выбираем имя файла (можно статично или из headers)
      const filename =
        "Мониторинг сетей на " +
        new Date().toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
        }) +
        ".xlsx";

      // 3) Создаём временный URL из Blob
      const url = window.URL.createObjectURL(blob as any);

      // 4) Генерируем <a> и эмулируем клик
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // 5) Убираем за собой
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const isMobile = useIsMobile();
  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header
        title="Мониторинг сетей"
        actions={{
          right: (
            <div className="flex flex-row gap-2">
              {allProducts.length > 0 && (
                <Button
                  loading={isDownloadReportLoading}
                  onClick={() => handleDownloadReport()}
                >
                  Скачать отчет <Save />
                </Button>
              )}
            </div>
          ),
        }}
      />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 gap-4 flex flex-col">
        <Card>
          <CardContent className="flex flex-col md:flex-row gap-2">
            <Input
              placeholder={
                !isMobile
                  ? "Введите продукт, например: 'Молоко'"
                  : "Введите продукт"
              }
              className="bg-background flex-1"
              value={search}
              onChange={handleSearch}
            />
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Показать:
              </span>
              <Card className="!p-1 flex flex-row items-center gap-1">
                <Button
                  onClick={() => setLimit(10)}
                  variant={limit === 10 ? "default" : "outline"}
                  size="sm"
                >
                  10
                </Button>
                <Button
                  onClick={() => setLimit(20)}
                  variant={limit === 20 ? "default" : "outline"}
                  size="sm"
                >
                  20
                </Button>
                <Button
                  onClick={() => setLimit(50)}
                  variant={limit === 50 ? "default" : "outline"}
                  size="sm"
                >
                  50
                </Button>
                <Button
                  onClick={() => setLimit(100)}
                  variant={limit === 100 ? "default" : "outline"}
                  size="sm"
                >
                  100
                </Button>
                <Button
                  onClick={() => setLimit(undefined)}
                  variant={limit === undefined ? "default" : "outline"}
                  size="sm"
                >
                  Без лимита
                </Button>
              </Card>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          {products && products.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              Найдено{" "}
              <span className="text-foreground">{allProducts?.length}</span>{" "}
              {
                pluralize(allProducts?.length, [
                  "продукт",
                  "продукта",
                  "продуктов",
                ]).split(" ")[1]
              }{" "}
              из{" "}
              <span className="text-foreground">{products?.length || 0}</span>{" "}
              {
                pluralize(products?.length || 0, [
                  "магазинa",
                  "магазинов",
                  "магазинов",
                ]).split(" ")[1]
              }
            </p>
          ) : (
            <div className="not-sr-only"></div>
          )}
          <div className="flex flex-col md:flex-row gap-2 md:w-fit w-full">
            <Card className="!p-1 flex flex-row items-center gap-1 md:w-fit w-full">
              <Button
                className="md:w-fit w-full"
                onClick={() => handleViewChange("by-shops")}
                variant={view === "by-shops" ? "default" : "outline"}
              >
                <Store />
                По магазинам
              </Button>
              <Button
                className="md:w-fit w-full"
                onClick={() => handleViewChange("all")}
                variant={view === "all" ? "default" : "outline"}
              >
                <Box />
                Все вместе
              </Button>
            </Card>
            <Card className="!p-1 flex flex-col md:flex-row items-center gap-1 w-fit md:static fixed z-10 right-4 bottom-4 ">
              <Button
                onClick={() => setDisplayMode("grid")}
                variant={displayMode === "grid" ? "default" : "outline"}
              >
                <Grid3X3 />
              </Button>
              <Button
                onClick={() => setDisplayMode("list")}
                variant={displayMode === "list" ? "default" : "outline"}
              >
                <List />
              </Button>
              <Button
                onClick={() => setDisplayMode("table")}
                variant={displayMode === "table" ? "default" : "outline"}
              >
                <Layout />
              </Button>
              {displayMode === "grid" && !isMobile && (
                <div className="!p-1 flex items-center gap-1 md:ml-2 flex-col md:flex-row justify-center">
                  <Button
                    onClick={() =>
                      setGridColumns((prev) => Math.max(3, prev - 1))
                    }
                    variant="outline"
                    size="icon"
                    disabled={gridColumns <= 3}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-2 text-sm font-medium min-w-[2rem] text-center">
                    {gridColumns}
                  </span>
                  <Button
                    onClick={() =>
                      setGridColumns((prev) => Math.min(8, prev + 1))
                    }
                    variant="outline"
                    size="icon"
                    disabled={gridColumns >= 8}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
        {!isProductsLoading ? (
          !debouncedSearch || debouncedSearch.trim() === "" ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <NotSelectedFiltersNY />
              <div className="text-muted-foreground space-y-2 mt-4">
                <p className="text-lg font-medium">
                  Введите запрос для получения результатов
                </p>
                <p className="text-sm">Например: "Молоко", "Хлеб", "Яйца"</p>
              </div>
            </div>
          ) : allProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="text-muted-foreground space-y-2">
                <p className="text-lg font-medium">Продукты не найдены</p>
                <p className="text-sm">Попробуйте изменить запрос поиска</p>
              </div>
            </div>
          ) : displayMode === "table" ? (
            view === "by-shops" ? (
              <div className="w-full flex flex-col gap-6">
                {yarcheProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Ярче</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {yarcheProducts?.length}{" "}
                        {
                          pluralize(yarcheProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>
                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {yarcheProducts?.map((product) => (
                            <ProductCard
                              key={`yarche-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {magnitProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Магнит</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {magnitProducts?.length}{" "}
                        {
                          pluralize(magnitProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>

                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {magnitProducts?.map((product) => (
                            <ProductCard
                              key={`magnit-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {metroProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Метро</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {metroProducts?.length}{" "}
                        {
                          pluralize(metroProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>

                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {metroProducts?.map((product) => (
                            <ProductCard
                              key={`metro-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {lentaProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Лента</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {lentaProducts?.length}{" "}
                        {
                          pluralize(lentaProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>
                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {lentaProducts?.map((product) => (
                            <ProductCard
                              key={`lenta-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {pyaterochkaProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Пятёрочка</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {pyaterochkaProducts?.length}{" "}
                        {
                          pluralize(pyaterochkaProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>
                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pyaterochkaProducts?.map((product) => (
                            <ProductCard
                              key={`pyaterochka-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {zhiznmartProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Жизньмарт</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {zhiznmartProducts?.length}{" "}
                        {
                          pluralize(zhiznmartProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>
                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {zhiznmartProducts?.map((product) => (
                            <ProductCard
                              key={`zhiznmart-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {azbukaVkusaProducts.length > 0 && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-2xl font-bold">Азбука вкуса</h1>
                      <p className="text-sm text-muted-foreground">
                        Найдено {azbukaVkusaProducts?.length}{" "}
                        {
                          pluralize(azbukaVkusaProducts?.length, [
                            "продукт",
                            "продукта",
                            "продуктов",
                          ]).split(" ")[1]
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-4 text-left sr-only w-fit">
                              Изображение
                            </th>
                            <th className="p-4 text-left pl-0">Название</th>
                            <th className="p-4 text-left">Вес</th>
                            <th className="p-4 text-left">Цена</th>
                            <th className="p-4 text-left w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {azbukaVkusaProducts?.map((product) => (
                            <ProductCard
                              key={`azbukaVkusa-${product.id}`}
                              product={product}
                              variant="table"
                              onRemove={handleRemoveProduct}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-4 text-left sr-only w-fit">
                        Изображение
                      </th>
                      <th className="p-4 text-left pl-0">Название</th>

                      <th className="p-4 text-left">Вес</th>
                      <th className="p-4 text-left">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yarcheProducts?.map((product) => (
                      <ProductCard
                        key={`yarche-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                    {magnitProducts?.map((product) => (
                      <ProductCard
                        key={`magnit-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                    {metroProducts?.map((product) => (
                      <ProductCard
                        key={`metro-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                    {lentaProducts?.map((product) => (
                      <ProductCard
                        key={`lenta-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                    {pyaterochkaProducts?.map((product) => (
                      <ProductCard
                        key={`pyaterochka-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                    {zhiznmartProducts?.map((product) => (
                      <ProductCard
                        key={`zhiznmart-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                    {azbukaVkusaProducts?.map((product) => (
                      <ProductCard
                        key={`azbukaVkusa-${product.id}`}
                        product={product}
                        variant="table"
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : view === "by-shops" ? (
            <>
              {yarcheProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Ярче</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {yarcheProducts?.length}{" "}
                      {
                        pluralize(yarcheProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {yarcheProducts?.map((product) => (
                      <ProductCard
                        key={`yarche-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
              {magnitProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Магнит</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {magnitProducts?.length}{" "}
                      {
                        pluralize(magnitProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {magnitProducts?.map((product) => (
                      <ProductCard
                        key={`magnit-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
              {metroProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Метро</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {metroProducts?.length}{" "}
                      {
                        pluralize(metroProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {metroProducts?.map((product) => (
                      <ProductCard
                        key={`metro-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
              {lentaProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Лента</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {lentaProducts?.length}{" "}
                      {
                        pluralize(lentaProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {lentaProducts?.map((product) => (
                      <ProductCard
                        key={`lenta-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
              {pyaterochkaProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Пятерочка</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {pyaterochkaProducts?.length}{" "}
                      {
                        pluralize(pyaterochkaProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {pyaterochkaProducts?.map((product) => (
                      <ProductCard
                        key={`pyaterochka-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
              {zhiznmartProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Жизньмарт</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {zhiznmartProducts?.length}{" "}
                      {
                        pluralize(zhiznmartProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {zhiznmartProducts?.map((product) => (
                      <ProductCard
                        key={`zhiznmart-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
              {azbukaVkusaProducts.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-2xl font-bold">Азбука вкуса</h1>
                    <p className="text-sm text-muted-foreground">
                      Найдено {azbukaVkusaProducts?.length}{" "}
                      {
                        pluralize(azbukaVkusaProducts?.length, [
                          "продукт",
                          "продукта",
                          "продуктов",
                        ]).split(" ")[1]
                      }
                    </p>
                  </div>
                  <div
                    className={
                      displayMode === "grid"
                        ? !isMobile
                          ? cn(`w-full grid gap-4`, {
                              "grid-cols-3": gridColumns === 3,
                              "grid-cols-4": gridColumns === 4,
                              "grid-cols-5": gridColumns === 5,
                              "grid-cols-6": gridColumns === 6,
                              "grid-cols-7": gridColumns === 7,
                              "grid-cols-8": gridColumns === 8,
                            })
                          : cn("grid-cols-1 gap-2 *:mb-4")
                        : "w-full flex flex-col gap-2"
                    }
                  >
                    {azbukaVkusaProducts?.map((product) => (
                      <ProductCard
                        key={`azbukaVkusa-${product.id}`}
                        product={product}
                        variant={displayMode}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className={
                displayMode === "grid"
                  ? !isMobile
                    ? cn(`w-full grid gap-4`, {
                        "grid-cols-3": gridColumns === 3,
                        "grid-cols-4": gridColumns === 4,
                        "grid-cols-5": gridColumns === 5,
                        "grid-cols-6": gridColumns === 6,
                        "grid-cols-7": gridColumns === 7,
                        "grid-cols-8": gridColumns === 8,
                      })
                    : cn("grid-cols-1 gap-2 *:mb-4")
                  : "w-full flex flex-col gap-2"
              }
            >
              {yarcheProducts?.map((product) => (
                <ProductCard
                  key={`yarche-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
              {magnitProducts?.map((product) => (
                <ProductCard
                  key={`magnit-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
              {metroProducts?.map((product) => (
                <ProductCard
                  key={`metro-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
              {lentaProducts?.map((product) => (
                <ProductCard
                  key={`lenta-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
              {pyaterochkaProducts?.map((product) => (
                <ProductCard
                  key={`pyaterochka-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
              {zhiznmartProducts?.map((product) => (
                <ProductCard
                  key={`zhiznmart-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
              {azbukaVkusaProducts?.map((product) => (
                <ProductCard
                  key={`azbukaVkusa-${product.id}`}
                  product={product}
                  variant={displayMode}
                  onRemove={handleRemoveProduct}
                />
              ))}
            </div>
          )
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="w-[100px] h-[20px]"></Skeleton>
              <Skeleton className="w-[100px] h-[20px]"></Skeleton>
            </div>
            <div
              className={
                displayMode === "grid"
                  ? !isMobile
                    ? cn(`w-full grid gap-4`, {
                        "grid-cols-3": gridColumns === 3,
                        "grid-cols-4": gridColumns === 4,
                        "grid-cols-5": gridColumns === 5,
                        "grid-cols-6": gridColumns === 6,
                        "grid-cols-7": gridColumns === 7,
                        "grid-cols-8": gridColumns === 8,
                      })
                    : cn("grid-cols-1 gap-2 *:mb-4")
                  : "w-full flex flex-col gap-2"
              }
            >
              {[...Array(16)].map((_, index) => (
                <Skeleton key={index} className="w-full h-[200px]" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
