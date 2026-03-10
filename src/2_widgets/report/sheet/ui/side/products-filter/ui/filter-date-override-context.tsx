import { createContext, useContext, type ReactNode } from "react";

/** Период для подстановки в payload только при загрузке опций фильтра. Не пишется в store. */
export type FilterDateOverride = { dateStart: string; dateEnd: string };

const FilterDateOverrideContext = createContext<FilterDateOverride | null>(
  null,
);

export function useFilterDateOverride(): FilterDateOverride | null {
  return useContext(FilterDateOverrideContext);
}

interface DateProviderProps {
  value: FilterDateOverride;
  children: ReactNode;
}

/** Использовать только на странице номенклатуры, чтобы опции фильтра грузились за весь период. В отчётах не использовать. */
export function FilterDateOverrideProvider({
  value,
  children,
}: DateProviderProps) {
  return (
    <FilterDateOverrideContext.Provider value={value}>
      {children}
    </FilterDateOverrideContext.Provider>
  );
}

/** Флаг \"это страница номенклатуры\", чтобы пробрасывать is_products в payload. Вне справочника всегда false. */
const IsProductsOverrideContext = createContext<boolean | null>(null);

export function useIsProductsOverride(): boolean | null {
  return useContext(IsProductsOverrideContext);
}

interface IsProductsProviderProps {
  value: boolean;
  children: ReactNode;
}

export function IsProductsOverrideProvider({
  value,
  children,
}: IsProductsProviderProps) {
  return (
    <IsProductsOverrideContext.Provider value={value}>
      {children}
    </IsProductsOverrideContext.Provider>
  );
}
