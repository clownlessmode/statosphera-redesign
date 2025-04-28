// src/hooks/useDefaultValues.ts
import { useMemo } from "react";
import { GetIndicatorsResponse } from "./api/types";
import { useSalesDynamicsIndicatorsController } from "./api/controller";
import { FormValues } from "./types";

function extractActiveColumnNames(data?: GetIndicatorsResponse): string[] {
  if (!data?.salesDynamics) return [];
  return data.salesDynamics
    .flat() // Group[][]
    .flatMap((group) =>
      group.columns.filter((col) => col.active).map((col) => col.name)
    );
}
export function useDefaultValues(): {
  defaultValues: FormValues;
  isLoading: boolean;
} {
  const { indicators, isIndicatorsLoading } =
    useSalesDynamicsIndicatorsController();

  const defaultValues: FormValues = useMemo(() => {
    return {
      indicators_and_groups: extractActiveColumnNames(indicators),
    };
  }, [indicators]);

  return {
    defaultValues,
    isLoading: isIndicatorsLoading,
  };
}
