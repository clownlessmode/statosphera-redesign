import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "@shared/ui/button";
import { Cog, Eraser } from "lucide-react";
import { usePartnerController } from "../api/controller";
import type {
  GraphPartnerPoint,
  GraphPartnerRequest,
  PartnerGraphGranularity,
  PartnerTableRow,
} from "../api/types";
import { usePartnerFiltersStore } from "../model/filters-store";
import {
  buildRowFocus,
  explainRowFocusUnavailable,
  formatRowFocusLabel,
  isValidRowFocus,
} from "../lib/row-focus";
import { PartnerGraph } from "./graph";
import { PartnerGraphGranularityDropdown } from "./graph-granularity-dropdown";
import { TablePartner } from "./table";
import { PartnerFiltersChips } from "./partner-filters-chips";
import { usePartnerUrlStore } from "@widgets/partner/sheet/model/url-store";
import { useWriteOffFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { useIsMobile } from "@shared/hooks/use-mobile";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import Spinner from "@shared/ui/spinner";
import { ValueGraphDropdown } from "./value-graph-dropdown";

type AllPartnersProps = {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
};

export const AllPartners = ({
  isFiltersOpen,
  setIsFiltersOpen,
}: AllPartnersProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const { setTargetViewValue } = usePartnerUrlStore();
  const { resetAllFilters } = useWriteOffFiltersStore();

  const {
    getTable,
    getTableTotal,
    getGraph,
    isTableLoading,
    isTableTotalLoading,
    isGraphLoading,
  } = usePartnerController();

  const appliedReport = usePartnerFiltersStore((s) => s.appliedReport);
  const tableGroups = appliedReport?.group ?? [];

  const {
    graphGranularity,
    graphValue,
    dataVersion,
    setGraphGranularity,
    setGraphValue,
    bumpDataVersion,
    resetFilters,
    buildTableRequest,
    submitRequestId,
  } = usePartnerFiltersStore();

  const [totalData, setTotalData] = useState<PartnerTableRow[]>([]);
  const [graphData, setGraphData] = useState<GraphPartnerPoint[] | undefined>();
  const [rowFocus, setRowFocus] = useState<GraphPartnerRequest["rowFocus"]>();
  const [rowFocusLabel, setRowFocusLabel] = useState<string>();
  const [rowFocusHint, setRowFocusHint] = useState<string>();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadGraph = useCallback(
    async (params?: {
      focus?: GraphPartnerRequest["rowFocus"];
      granularity?: PartnerGraphGranularity;
      metric?: GraphPartnerRequest["value"];
    }) => {
      const store = usePartnerFiltersStore.getState();
      const request: GraphPartnerRequest = {
        filter: store.buildFilter(),
        group: params?.granularity ?? store.graphGranularity,
        value: params?.metric ?? store.graphValue,
      };

      const focus = params?.focus;
      if (isValidRowFocus(focus)) {
        request.rowFocus = { kind: focus.kind, id: focus.id };
      }

      const data = await getGraph(request);
      setGraphData(data);
    },
    [getGraph],
  );

  const clearRowFocus = useCallback(() => {
    setRowFocus(undefined);
    setRowFocusLabel(undefined);
    setRowFocusHint(undefined);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoadError(false);
      clearRowFocus();
      setHasSubmitted(true);
      bumpDataVersion();

      const applied = usePartnerFiltersStore.getState().appliedReport;
      if (!applied) return;

      const total = await getTableTotal({
        values: applied.values,
        filter: applied.filter,
      });
      setTotalData(total ? [total] : []);

      await loadGraph();
      setIsFiltersOpen(false);
    } catch {
      setLoadError(true);
    }
  }, [
    bumpDataVersion,
    getTableTotal,
    loadGraph,
    setIsFiltersOpen,
    clearRowFocus,
  ]);

  useEffect(() => {
    if (submitRequestId > 0) {
      void handleSubmit();
    }
  }, [submitRequestId]);

  const handleClearFilters = () => {
    resetFilters();
    resetAllFilters();
    usePartnerFiltersStore.setState({ appliedReport: null });
    setTotalData([]);
    setGraphData(undefined);
    clearRowFocus();
    setHasSubmitted(false);
    setLoadError(false);
    bumpDataVersion();
    setIsFiltersOpen(true);
  };

  const handleOpenSheet = (section: string) => {
    setTargetViewValue(section);
    const p = new URLSearchParams(searchParams);
    p.set("open", "true");
    navigate(`/partners?${p.toString()}`);
  };

  const handleRowClick = useCallback(
    async (row: PartnerTableRow) => {
      const focus = buildRowFocus(row, tableGroups);

      if (focus && isValidRowFocus(focus)) {
        setRowFocus(focus);
        setRowFocusLabel(formatRowFocusLabel(row, focus));
        setRowFocusHint(undefined);
        await loadGraph({ focus });
        return;
      }

      clearRowFocus();
      setRowFocusHint(explainRowFocusUnavailable(row, tableGroups));
      await loadGraph({});
    },
    [tableGroups, loadGraph, clearRowFocus],
  );

  const handleClearRowFocus = useCallback(async () => {
    clearRowFocus();
    await loadGraph();
  }, [clearRowFocus, loadGraph]);

  const handleGraphGranularity = (g: PartnerGraphGranularity) => {
    setGraphGranularity(g);
    if (hasSubmitted) {
      void loadGraph({ granularity: g, focus: rowFocus });
    }
  };

  const handleGraphMetric = (m: typeof graphValue) => {
    setGraphValue(m);
    if (hasSubmitted) {
      void loadGraph({ metric: m, focus: rowFocus });
    }
  };

  const isSubmitting = isTableLoading || isTableTotalLoading || isGraphLoading;

  const handleFiltersToggle = () => {
    if (!hasSubmitted) {
      setIsFiltersOpen(true);
      return;
    }
    setIsFiltersOpen(!isFiltersOpen);
  };

  const toolbar = (
    <div className="flex flex-row gap-1 items-center justify-end flex-wrap">
      <ValueGraphDropdown value={graphValue} onChange={handleGraphMetric} />
      <PartnerGraphGranularityDropdown
        value={graphGranularity}
        onChange={handleGraphGranularity}
        disabled={!hasSubmitted}
      />
      <Button
        className="w-fit"
        size={isMobile ? "default" : "sm"}
        variant="outline"
        onClick={handleFiltersToggle}
      >
        {!hasSubmitted || !isFiltersOpen ? (
          <>
            Изменить фильтры <Cog className="text-primary/80" />
          </>
        ) : (
          <>
            Показать график <Cog className="text-primary/80" />
          </>
        )}
      </Button>
      <Button
        size={isMobile ? "default" : "sm"}
        onClick={handleClearFilters}
        variant="outline"
      >
        {!isMobile && "Очистить фильтры"}
        <Eraser className="text-primary/80" />
      </Button>
    </div>
  );

  if (!hasSubmitted) {
    return (
      <div className="flex flex-col gap-4 h-full mx-4 md:mx-0 max-md:gap-2 flex-1 min-h-0">
        {toolbar}
        <PartnerFiltersChips
          isOpen={isFiltersOpen}
          onOpenSheet={handleOpenSheet}
        />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 dark:opacity-70">
          {isSubmitting ? (
            <Spinner />
          ) : loadError ? (
            <p className="text-sm text-destructive">Ошибка загрузки</p>
          ) : (
            <NotSelectedFilters />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full mx-4 md:mx-0 max-md:gap-2 flex-1 min-h-0">
      {toolbar}

      <div className="flex-shrink-0 min-h-60 max-md:min-h-48 overflow-hidden">
        {!isFiltersOpen ? (
          <PartnerGraph
            data={graphData}
            isLoading={isGraphLoading}
            granularity={graphGranularity}
            metric={graphValue}
            rowFocusLabel={rowFocusLabel}
            rowFocusHint={rowFocusHint}
            onMetricChange={handleGraphMetric}
            onClearRowFocus={
              rowFocusLabel ? () => void handleClearRowFocus() : undefined
            }
          />
        ) : (
          <PartnerFiltersChips
            isOpen={isFiltersOpen}
            onOpenSheet={handleOpenSheet}
          />
        )}
      </div>

      <div className="flex-1 min-h-80 md:min-h-0 flex flex-col">
        <TablePartner
          fetchTable={getTable}
          totalData={totalData}
          dataVersion={dataVersion}
          buildTableRequest={buildTableRequest}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
