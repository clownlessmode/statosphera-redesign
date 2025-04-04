export type Grill = {
  countProduct: number | null;
  countSales: number | null;
  ed: "ШТ" | "КГ";
  fullname: string;
  id: number;
  idProduct: number;
  remainder: number | null;
};

export interface GrillGraph {
  name: string;
  data: [number, number | null][];
}

export interface GrillGraphMock {
  graph: GrillGraph[];
  graphCheck: GrillGraph[];
}
