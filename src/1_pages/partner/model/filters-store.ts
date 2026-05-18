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

const toNumIds = (ids: string[]): number[] =>
  ids.map((id) => Number(id)).filter((n) => !Number.isNaN(n));

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

export const DEFAULT_PARTNER_GROUPS: PartnerTableGroup[] = [
  "directionProducts",
  "group",
  "product",
];

export type PartnerFiltersState = {
  values: PartnerMetric[];
  group: PartnerTableGroup[];
  filter: PartnerFilter;
  sort: PartnerSort;
  graphGranularity: PartnerGraphGranularity;
  graphValue: PartnerGraphMetric;
  dataVersion: number;
  submitRequestId: number;
  requestSubmit: () => void;
  setFilter: (patch: Partial<PartnerFilter>) => void;
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

const emptyArraysFilter = (): Omit<PartnerFilter, "filterDate"> => ({
  idProduct: [],
  idStore: [],
  innProducer: [],
  groups: [],
  subgroups: [],
  subsubgroups: [],
  groupsFranchise: [],
  directionProducts: [],
});

export const usePartnerFiltersStore = create<PartnerFiltersState>(
  (set, get) => ({
    values: DEFAULT_PARTNER_VALUES,
    group: DEFAULT_PARTNER_GROUPS,
    filter: {
      ...emptyArraysFilter(),
      filterDate: defaultFilterDate,
    },
    sort: { sort: "desc", colId: PARTNER_VALUES.ORDERED_COUNT },
    graphGranularity: "month",
    graphValue: PARTNER_VALUES.NOT_SHIPPED_PROFIT,
    dataVersion: 0,
    submitRequestId: 0,
    requestSubmit: () =>
      set((s) => ({ submitRequestId: s.submitRequestId + 1 })),
    setFilter: (patch) => set((s) => ({ filter: { ...s.filter, ...patch } })),
    setValues: (values) => set({ values }),
    setGroup: (group) => set({ group }),
    setSort: (sort) => set({ sort }),
    setGraphGranularity: (graphGranularity) => set({ graphGranularity }),
    setGraphValue: (graphValue) => set({ graphValue }),
    bumpDataVersion: () => set((s) => ({ dataVersion: s.dataVersion + 1 })),
    resetFilters: () =>
      set({
        filter: { ...emptyArraysFilter(), filterDate: defaultFilterDate },
        values: DEFAULT_PARTNER_VALUES,
        group: DEFAULT_PARTNER_GROUPS,
        sort: { sort: "desc", colId: PARTNER_VALUES.ORDERED_COUNT },
      }),
    buildFilter: () => {
      const { filter } = get();
      const wo = useWriteOffFiltersStore.getState();
      const { filters, filterDate } = wo;

      const dateStart =
        filterDate.dateStart?.slice(0, 10) || filter.filterDate.dateStart;
      const dateEnd =
        filterDate.dateEnd?.slice(0, 10) || filter.filterDate.dateEnd;

      return {
        filterDate: { dateStart, dateEnd },
        idProduct: filters.product.idProduct ?? [],
        idStore: toNumIds(filters.store.idStore ?? []),
        innProducer: filter.innProducer ?? [],
        groups: toNumIds(filters.product.idGroupMain ?? []),
        subgroups: toNumIds(filters.product.subGroups ?? []),
        subsubgroups: toNumIds(filters.product.subSubGroups ?? []),
        groupsFranchise: toNumIds(filters.product.groupFranchise ?? []),
        directionProducts: toNumIds(filters.product.directionProducts ?? []),
      };
    },
    buildTableRequest: (pagination, nextSort) => {
      const { values, group, sort, buildFilter } = get();
      return {
        values,
        filter: buildFilter(),
        group,
        pagination,
        sort: nextSort ?? sort,
      };
    },
  }),
);
