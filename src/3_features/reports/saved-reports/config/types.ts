export type Report = {
  mode: "COMMERCIAL" | "CHECK";
  indicators: string[];
  uniqueValues: any[];
  groupingColumns: string[];
  filterModel: any[];
  selectedIndicatorForGraph: string;
};

export type SavedReport = {
  idReport: number;
  nameReport: string;
  report: Report & {
    filters: any;
  };
  dateAdd: string;
};
