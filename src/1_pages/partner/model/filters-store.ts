import { endOfMonth, format, startOfMonth } from "date-fns";
import { create } from "zustand";
import { useWriteOffFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import {
  PARTNER_VALUES,
  type PartnerFilter,
  PartnerGraphGranularity,
  PartnerGraphMetric,
  PartnerMetric,
  PartnerSort,
  PartnerTableGroup,
  TablePartnerRequest,
} from "../api/types";
import {
  parseNumericFilterIds,
  parseStringFilterIds,
} from "../lib/parse-filter-ids";

const today = new Date();

const defaultFilterDate = {
  dateStart: format(startOfMonth(today), "yyyy-MM-dd"),
  dateEnd: format(endOfMonth(today), "yyyy-MM-dd"),
};

export const DEFAULT_PARTNER_VALUES: PartnerMetric[] = [
  PARTNER_VALUES.ORDERED_COUNT,
  PARTNER_VALUES.SHIPPED_COUNT,
  PARTNER_VALUES.SHIPMENT_PERCENT,
];

export const DEFAULT_PARTNER_GROUPS: PartnerTableGroup[] = [];

export type AppliedPartnerReport = {
  values: PartnerMetric[];
  group: PartnerTableGroup[];
  filter: PartnerFilter;
};

const buildFilterFromWriteOff = (): PartnerFilter => {
  const wo = useWriteOffFiltersStore.getState();
  const { filters, filterDate } = wo;

  const dateStart =
    filterDate.dateStart?.slice(0, 10) || defaultFilterDate.dateStart;
  const dateEnd = filterDate.dateEnd?.slice(0, 10) || defaultFilterDate.dateEnd;

  return {
    filterDate: { dateStart, dateEnd },
    idProduct: parseStringFilterIds(filters.product.idProduct),
    idStore: parseNumericFilterIds(filters.store.idStore),
    typeProducts: parseNumericFilterIds(filters.product.typeProducts),
    groups: parseNumericFilterIds(filters.product.idGroupMain),
    subgroups: parseNumericFilterIds(filters.product.subGroups),
    subsubgroups: parseNumericFilterIds(filters.product.subSubGroups),
    groupsFranchise: parseNumericFilterIds(filters.product.groupFranchise),
    directionProducts: parseNumericFilterIds(filters.product.directionProducts),
  };
};

export type PartnerFiltersState = {
  values: PartnerMetric[];
  group: PartnerTableGroup[];
  sort: PartnerSort;
  graphGranularity: PartnerGraphGranularity;
  graphValue: PartnerGraphMetric;
  dataVersion: number;
  submitRequestId: number;
  appliedReport: AppliedPartnerReport | null;
  requestSubmit: () => void;
  setValues: (values: PartnerMetric[]) => void;
  setGroup: (group: PartnerTableGroup[]) => void;
  setSort: (sort: PartnerSort) => void;
  setGraphGranularity: (g: PartnerGraphGranularity) => void;
  setGraphValue: (v: PartnerGraphMetric) => void;
  bumpDataVersion: () => void;
  resetFilters: () => void;
  buildFilter: () => PartnerFilter;
  buildTableRequest: (
    pagination: { limit: number; offset: number },
    nextSort?: PartnerSort,
  ) => TablePartnerRequest;
};

export const usePartnerFiltersStore = create<PartnerFiltersState>(
  (set, get) => ({
    values: DEFAULT_PARTNER_VALUES,
    group: DEFAULT_PARTNER_GROUPS,
    sort: { sort: "desc", colId: PARTNER_VALUES.ORDERED_COUNT },
    graphGranularity: "month",
    graphValue: PARTNER_VALUES.NOT_SHIPPED_PROFIT,
    dataVersion: 0,
    submitRequestId: 0,
    appliedReport: null,
    requestSubmit: () => {
      const { values, group } = get();
      set({
        submitRequestId: get().submitRequestId + 1,
        appliedReport: {
          values: [...values],
          group: [...group],
          filter: buildFilterFromWriteOff(),
        },
      });
    },
    setValues: (values) => set({ values }),
    setGroup: (group) => set({ group }),
    setSort: (sort) => set({ sort }),
    setGraphGranularity: (graphGranularity) => set({ graphGranularity }),
    setGraphValue: (graphValue) => set({ graphValue }),
    bumpDataVersion: () => set((s) => ({ dataVersion: s.dataVersion + 1 })),
    resetFilters: () =>
      set({
        values: DEFAULT_PARTNER_VALUES,
        group: DEFAULT_PARTNER_GROUPS,
        sort: { sort: "desc", colId: PARTNER_VALUES.ORDERED_COUNT },
        appliedReport: null,
      }),
    buildFilter: () => {
      const applied = get().appliedReport;
      if (applied) return applied.filter;
      return buildFilterFromWriteOff();
    },
    buildTableRequest: (pagination, nextSort) => {
      const { sort, appliedReport } = get();
      if (!appliedReport) {
        return {
          values: [],
          filter: buildFilterFromWriteOff(),
          group: [],
          pagination,
          sort: nextSort ?? sort,
        };
      }
      return {
        values: appliedReport.values,
        filter: appliedReport.filter,
        group: appliedReport.group,
        pagination,
        sort: nextSort ?? sort,
      };
    },
  }),
);
