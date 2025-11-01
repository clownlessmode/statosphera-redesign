import { Card, CardContent } from "@shared/ui/card";
import { Input } from "@shared/ui/input";

import { Header } from "@widgets/header";

import { useMonitoringController } from "../api";
import { ProductCard } from "./product-card";
import { Skeleton } from "@shared/ui/skeleton";
import pluralize from "@shared/lib/pluralize";
import { useState, useEffect } from "react";
import { Box, Grid3X3, Layout, List, Store, Minus, Plus } from "lucide-react";
import { Button } from "@shared/ui/button";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";
import { useNavigate } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { cn } from "@shared/lib/utils";

export const Monitoring = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { products, isProductsLoading } =
    useMonitoringController(debouncedSearch);
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
  const allProducts = [...yarcheProducts, ...magnitProducts, ...metroProducts];

  const handleViewChange = (view: "all" | "by-shops") => {
    setView(view);
  };

  const handleRemoveProduct = (id: string | number) => {
    setRemovedProducts((prev) => new Set([...prev, id]));
  };

  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      const hasAccess = session.idUser === 181 || session.role === ROLES.ADMIN;
      if (!hasAccess) {
        navigate(ROUTES_PATH.FORBIDDEN, { replace: true });
      }
    }
  }, [session, navigate]);

  if (session && session.idUser !== 181 && session.role !== ROLES.ADMIN) {
    return null;
  }

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Мониторинг сетей" />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 gap-4 flex flex-col">
        <Card>
          <CardContent className="flex flex-row gap-2">
            <Input
              placeholder="Введите продукт, например: 'Молоко'"
              className="bg-background"
              value={search}
              onChange={handleSearch}
            />
          </CardContent>
        </Card>
        <div className="flex flex-row gap-2 justify-between items-center">
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
          <div className="flex flex-row gap-2">
            <Card className="!p-1 flex flex-row items-center gap-1">
              <Button
                onClick={() => handleViewChange("by-shops")}
                variant={view === "by-shops" ? "default" : "outline"}
              >
                <Store />
                По магазинам
              </Button>
              <Button
                onClick={() => handleViewChange("all")}
                variant={view === "all" ? "default" : "outline"}
              >
                <Box />
                Все вместе
              </Button>
            </Card>
            <Card className="!p-1 flex flex-row items-center gap-1">
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
              {displayMode === "grid" && (
                <div className="!p-1 flex flex-row items-center gap-1 ml-2">
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
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <NotSelectedFilters />
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
                            <th className="p-4 text-left">Изображение</th>
                            <th className="p-4 text-left">Название</th>
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
                            <th className="p-4 text-left">Изображение</th>
                            <th className="p-4 text-left">Название</th>
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
                            <th className="p-4 text-left">Изображение</th>
                            <th className="p-4 text-left">Название</th>
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
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-4 text-left">Изображение</th>
                      <th className="p-4 text-left">Название</th>
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
                        ? cn(`w-full grid gap-4`, {
                            "grid-cols-3": gridColumns === 3,
                            "grid-cols-4": gridColumns === 4,
                            "grid-cols-5": gridColumns === 5,
                            "grid-cols-6": gridColumns === 6,
                            "grid-cols-7": gridColumns === 7,
                            "grid-cols-8": gridColumns === 8,
                          })
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
                        ? cn(`w-full grid gap-4`, {
                            "grid-cols-3": gridColumns === 3,
                            "grid-cols-4": gridColumns === 4,
                            "grid-cols-5": gridColumns === 5,
                            "grid-cols-6": gridColumns === 6,
                            "grid-cols-7": gridColumns === 7,
                            "grid-cols-8": gridColumns === 8,
                          })
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
                        ? cn(`w-full grid gap-4`, {
                            "grid-cols-3": gridColumns === 3,
                            "grid-cols-4": gridColumns === 4,
                            "grid-cols-5": gridColumns === 5,
                            "grid-cols-6": gridColumns === 6,
                            "grid-cols-7": gridColumns === 7,
                            "grid-cols-8": gridColumns === 8,
                          })
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
            </>
          ) : (
            <div
              className={
                displayMode === "grid"
                  ? cn(`w-full grid gap-4`, {
                      "grid-cols-3": gridColumns === 3,
                      "grid-cols-4": gridColumns === 4,
                      "grid-cols-5": gridColumns === 5,
                      "grid-cols-6": gridColumns === 6,
                      "grid-cols-7": gridColumns === 7,
                      "grid-cols-8": gridColumns === 8,
                    })
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
            </div>
          )
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="w-[100px] h-[20px]"></Skeleton>
              <Skeleton className="w-[100px] h-[20px]"></Skeleton>
            </div>
            <div
              className={cn(`w-full grid gap-4`, {
                "grid-cols-3": gridColumns === 3,
                "grid-cols-4": gridColumns === 4,
                "grid-cols-5": gridColumns === 5,
                "grid-cols-6": gridColumns === 6,
                "grid-cols-7": gridColumns === 7,
                "grid-cols-8": gridColumns === 8,
              })}
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
