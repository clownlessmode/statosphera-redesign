export type Report = {
  mode: "COMMERCIAL" | "CHECK";
  values: string[];
  uniqueValues: any[];
  groups: string[];
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
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
