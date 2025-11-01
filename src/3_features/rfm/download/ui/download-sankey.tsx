import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Download } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { useNameSegments } from "@widgets/rfm/ui/filter/model/hook";
import { useDownloadMigrationsController } from "@features/rfm/download/model/api/controller";
import { DownloadMigrationsRequest } from "@features/rfm/download/model/api/types";

interface Segements {
  rfmCodeM6: number | null;
  rfmCodeM3: number | null;
  rfmCodeM0: number | null;
  sex: string[];
  age: string[];
}

const periodToStateKey: Record<string, keyof Segements> = {
  "M-6": "rfmCodeM6",
  "M-3": "rfmCodeM3",
  M0: "rfmCodeM0",
};

const DownloadSankey: FC = () => {
  const mainData = useFiltersStore((state) => state.filters);
  const { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading } =
    useNameSegments();
  const { downloadMigrations } = useDownloadMigrationsController();
  const [open, setOpen] = useState(false);
  const [periods, setPeriods] = useState<string[]>([]);
  const [segments, setSegments] = useState<Segements>({
    rfmCodeM6: null,
    rfmCodeM3: null,
    rfmCodeM0: null,
    sex: [],
    age: [],
  });

  useEffect(() => {
    if (mainData.sankey && mainData.agePeriods && mainData.sex) {
      setPeriods(mainData.sankey.split("->").map((i) => i.trim()));
      setSegments((prev) => ({
        ...prev,
        age: mainData.agePeriods,
        sex: mainData.sex,
      }));
    }
  }, [mainData]);

  const isDisabled = useCallback(() => {
    if (periods.length === 0) {
      return true;
    }
    const isAnySegmentNotSelected = periods.some((period) => {
      const key = periodToStateKey[period];
      if (!key) return true;
      const value = segments[key];
      return value === null || value === undefined;
    });

    return isAnySegmentNotSelected;
  }, [segments]);

  const handleSegmentChange = (period: string, value: string) => {
    const key = periodToStateKey[period];
    if (key) {
      setSegments((prev) => ({
        ...prev,
        [key]: Number(value),
      }));
    }
  };

  const handleDownload = async () => {
    setOpen(false);
    const filteredObj = Object.fromEntries(
      Object.entries(segments).filter(([, value]) => value !== null),
    ) as DownloadMigrationsRequest;
    await downloadMigrations(filteredObj);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute top-5 right-5 z-10">
          Выгрузить <Download />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="min-w-max">
        <Card className="w-full max-md:overflow-y-auto scrollbar-hide">
          <CardHeader>
            <CardTitle>Фильтры</CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>
                Выберите сегменты для скачивания
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`grid grid-cols-${periods.length} gap-4 w-full justify-items-center`}
            >
              {periods.length !== 0 &&
                periods.map((period) => {
                  const stateKey = periodToStateKey[period];
                  const currentValue = segments[stateKey];
                  return (
                    <div key={period} className="grid gap-1">
                      <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive text-foreground">
                        {period}:
                      </label>
                      <Select
                        value={currentValue ? String(currentValue) : ""}
                        disabled={isNameSegmentLoading}
                        onOpenChange={(open) => handleOpenNameSegment(open)}
                        onValueChange={(value) =>
                          handleSegmentChange(period, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="111" />
                        </SelectTrigger>
                        <SelectContent>
                          {nameSegmentOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={String(opt.value)}
                            >
                              {opt.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
        <Button disabled={isDisabled()} onClick={handleDownload}>
          Скачать
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadSankey;
