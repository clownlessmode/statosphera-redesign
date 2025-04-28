// Описание одной колонки
export interface Column {
  name: string;
  active: boolean;
}

// Описание одной группы
export interface Group {
  name: string;
  order: number;
  columns: Column[];
}

// Тип для массива групп (двумерный массив, как в JSON)
export type SalesDynamics = Group[][];

// Корневой объект
export interface GetIndicatorsResponse {
  salesDynamics: SalesDynamics;
}

export interface UpdateIndicatorsRequest {
  groups: Group[];
}
