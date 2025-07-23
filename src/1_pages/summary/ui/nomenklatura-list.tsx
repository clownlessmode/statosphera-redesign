import { useSummaryStore } from "../model";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useState, useMemo, useCallback } from "react";
import { Check, Funnel } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useSearchParams } from "react-router";
import { useTabStore } from "@widgets/summary/sheet/model/url-store";

interface NomenklaturaListProps {
  onSelectedProductChange?: (selectedProduct: number | null) => void;
}

export const NomenklaturaList = ({
  onSelectedProductChange,
}: NomenklaturaListProps) => {
  const { nomenklatura } = useSummaryStore();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Функция для получения отображаемого названия продукта
  const getDisplayName = useCallback((item: any) => {
    return item.productName || `Продукт ${item.idProduct || "без ID"}`;
  }, []);

  // Фильтрация номенклатуры по поиску
  const filteredNomenklatura = useMemo(() => {
    if (!nomenklatura || nomenklatura.length === 0) return [];

    const term = searchTerm.trim().toLowerCase();
    if (!term) return nomenklatura;

    const tokens = term.split(/\s+/).filter((t) => t.length > 1);
    return nomenklatura.filter((item: any) => {
      // Получаем название продукта для поиска
      const productName = getDisplayName(item).toLowerCase();

      // Если нет токенов (короткий поиск), ищем точное вхождение
      if (tokens.length === 0) {
        return productName.includes(term);
      }

      // Проверяем, что все токены присутствуют
      const fullMatch = tokens.every((token) => productName.includes(token));
      if (fullMatch) return true;

      // Нечеткий поиск
      let idx = 0;
      for (let i = 0; i < term.length; i++) {
        const char = term[i];
        idx = productName.indexOf(char, idx);
        if (idx === -1) return false;
        idx++;
      }
      return true;
    });
  }, [nomenklatura, searchTerm, getDisplayName]);

  if (!nomenklatura || nomenklatura.length === 0) {
    return <div>Номенклатура по таким фильтрам отсутствует</div>;
  }

  const handleProductClick = async (productId: number) => {
    const newSelectedProduct = selectedProduct === productId ? null : productId;

    setSelectedProduct(newSelectedProduct);
    onSelectedProductChange?.(newSelectedProduct);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const { setTargetViewValue } = useTabStore();

  const handleOpenSheet = () => {
    setTargetViewValue("summary");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("open", "true");
    setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <Card className="max-w-[550px] h-full flex flex-col gap-3!">
      <CardHeader className="flex-shrink-0 flex flex-col gap-4">
        <div className="flex flex-row w-full justify-between  items-center">
          <CardTitle>Номенклатура</CardTitle>
          <Button size={"sm"} className="" onClick={handleOpenSheet}>
            Изменить фильтры <Funnel />
          </Button>
        </div>
        <Input
          placeholder="Поиск по номенклатуре"
          className="w-full bg-background h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>

      <CardContent className="p-3 flex-1 overflow-y-auto min-h-0">
        <div className="space-y-2">
          {filteredNomenklatura.length > 0 ? (
            filteredNomenklatura.map((item) => (
              <div
                key={item.idProduct}
                className={`bg-background flex justify-between items-center px-3 py-2 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                  selectedProduct === item.idProduct
                    ? "border-white/50 bg-muted"
                    : "border-border"
                }`}
                onClick={() => handleProductClick(item.idProduct)}
              >
                <span className="text-xs">{item.productName}</span>
                {selectedProduct === item.idProduct && (
                  <Check className="w-4 h-4" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Продукты не найдены
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
