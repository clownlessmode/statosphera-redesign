import { Header } from "@widgets/header";
import { useRfm } from "../api";
import { useNavigate } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { FilterModal } from "../ui/filter-modal";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import { useEffect, useState } from "react";
import { SegmentsCard } from "./cards";
import { cn } from "@shared/lib/utils";
import { AllGistogram } from "./graphs/allGistogram";
import { TreemapTopGroupProduct } from "./graphs/treemapTopGroupProduct";
import { DrilldownRfmDayWeekTime } from "./graphs/drilldownRfmDayWeekTime";
import { TreemapTopBonuses } from "./graphs/treemapTopBonuses";
import { RadarCountUniqGroupAndProduct } from "./graphs/radarCountUniqGroupAndProduct";
import { DrilldownRfmRegionCityStore } from "./graphs/drilldownRfmRegionCityStore";
import {
  AllGistogramResponse,
  AllStackedGistogramResponse,
  DrilldownRfmDayWeekTimeResponse,
  DrilldownRfmRegionCityStoreResponse,
  HeatmapMigrationPerSegmentResponse,
  MainDataSegmentResponse,
  RadarCountUniqGroupAndProductResponse,
  SankeyMigrationClientPerSegmentsResponse,
  TreemapRfmOrderDeliveryResponse,
  TreemapTopBonusesResponse,
  TreemapTopGroupProductResponse,
} from "../config";
import { DrilldownTimeDayWeekRfm } from "./graphs/drilldownTimeDayWeekRfm";
import { SankeyMigrationClientPerSegments } from "./graphs/sankeyMigrationClientPerSegments";
import { HeatmapMigrationPerSegment } from "./graphs/heatmapMigrationPerSegment";
import { TreemapRfmOrderDelivery } from "./graphs/treemapRfmOrderDelivery";
import { ComparisonTwoRfmCard } from "./cards/comparison-two-rfm";
import { AllStackedGistogram } from "./graphs/allStackedGistogram";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import InfoModal from "./info-modal";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";

interface Filters {
  data: {
    period: string;
    rfmList: number[];
    sex: string[];
    age: string[];
  };
  dataSankey: {
    period: string;
    rfmList: number[];
    sex: string[];
    age: string[];
  };
  dataHeatMap: {
    period: string;
    rfmList: number[];
    sex: string[];
    age: string[];
  };
}

export const Rfm = () => {
  const isMobile = useIsMobile();
  const { getApiPayload } = useFiltersStore();
  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "loyalty":
        navigate(ROUTES_PATH.LOYALTY);
        break;
      case "rfm":
        navigate(ROUTES_PATH.RFM);
        break;
      case "unload":
        navigate(ROUTES_PATH.UNLOAD);
        break;
    }
  };

  const [appliedFilters, setAppliedFilters] = useState<Filters>();
  const [mainDataSegment, setMainDataSegment] = useState<
    MainDataSegmentResponse[]
  >([]);
  const [allGistogram, setAllGistogram] = useState<AllGistogramResponse>({
    allDataCount: { categories: [], series: [] },
    allDataProceed: { categories: [], series: [] },
    allDataProfit: { categories: [], series: [] },
    actionDataCount: { categories: [], series: [] },
    actionDataProceed: { categories: [], series: [] },
    actionDataProfit: { categories: [], series: [] },
    imDataCount: { categories: [], series: [] },
    imDataProceed: { categories: [], series: [] },
    imDataProfit: { categories: [], series: [] },
    avgDataCount: { categories: [], series: [] },
    avgDataProceed: { categories: [], series: [] },
    avgDataProfit: { categories: [], series: [] },
    avgDayCountPerClient: { categories: [], series: [] },
    countUniqClient: { categories: [], series: [] },
    countInDanger: { categories: [], series: [] },
    avgDataCheck: { categories: [], series: [] },
  });

  const [allStackedGistogram, setAllStackedGistogram] =
    useState<AllStackedGistogramResponse>({
      sexGistogram: {
        segments: [],
        series: [],
        legend: {
          data: [],
        },
      },
      ageGistogram: {
        segments: [],
        series: [],
        legend: {
          data: [],
        },
      },
    });

  const [drilldownRfmDayWeekTime, setDrilldownRfmDayWeekTime] =
    useState<DrilldownRfmDayWeekTimeResponse>({
      data: [],
    });

  const [drilldownTimeDayWeekRfm, setDrilldownTimeDayWeekRfm] =
    useState<DrilldownRfmDayWeekTimeResponse>({
      data: [],
      text: [],
    });

  const [treemapTopGroupProduct, setTreemapTopGroupProduct] =
    useState<TreemapTopGroupProductResponse>({
      childrenProceed: [],
      childrenProfit: [],
      childrenCount: [],
    });

  const [treemapTopBonuses, setTreemapTopBonuses] =
    useState<TreemapTopBonusesResponse>({
      childrenProceed: [],
      childrenProfit: [],
      childrenCount: [],
    });

  const [radarCountUniqGroupAndProduct, setRadarCountUniqGroupAndProduct] =
    useState<RadarCountUniqGroupAndProductResponse>({
      CountUniqGroup: {
        legend: {
          data: [],
        },
        radar: {
          indicator: [],
        },
        series: [],
      },
      CountUniqProduct: {
        legend: {
          data: [],
        },
        radar: {
          indicator: [],
        },
        series: [],
      },
    });

  const [treemapRfmOrderDelivery, setTreemapRfmOrderDelivery] =
    useState<TreemapRfmOrderDeliveryResponse>({
      childrenProceed: [],
      childrenProfit: [],
      childrenCount: [],
    });

  const [drilldownRfmRegionCityStore, setDrilldownRfmRegionCityStore] =
    useState<DrilldownRfmRegionCityStoreResponse>({
      data: [],
    });

  const [
    sankeyMigrationClientPerSegments,
    setSankeyMigrationClientPerSegments,
  ] = useState<SankeyMigrationClientPerSegmentsResponse>({
    nodes: [],
    links: [],
  });

  const [heatmapMigrationPerSegment, setHeatmapMigrationPerSegment] =
    useState<HeatmapMigrationPerSegmentResponse>({
      xAxis: [],
      yAxis: [],
      matrixData: [],
    });

  const {
    getAllGistogram,
    isAllGistogramLoading,
    getAllStackedGistogram,
    isAllStackedGistogramLoading,
    getDrilldownRfmDayWeekTime,
    isDrilldownRfmDayWeekTimeLoading,
    getDrilldownTimeDayWeekRfm,
    isDrilldownTimeDayWeekRfmLoading,
    getTreemapTopGroupProduct,
    isTreemapTopGroupProductLoading,
    getTreemapTopBonuses,
    isTreemapTopBonusesLoading,
    getRadarCountUniqGroupAndProduct,
    isRadarCountUniqGroupAndProductLoading,
    getTreemapRfmOrderDelivery,
    isTreemapRfmOrderDeliveryLoading,
    getDrilldownRfmRegionCityStore,
    isDrilldownRfmRegionCityStoreLoading,
    getSankeyMigrationClientPerSegments,
    isSankeyMigrationClientPerSegmentsLoading,
    getHeatmapMigrationPerSegment,
    isHeatmapMigrationPerSegmentLoading,
    getMainDataSegment,
    isMainDataSegmentLoading,
  } = useRfm();

  const handleApplyFilters = () => {
    const filters = getApiPayload();
    setAppliedFilters({
      data: {
        period: filters.period,
        rfmList: filters.rfmList,
        sex: filters.sex,
        age: filters.agePeriods,
      },
      dataSankey: {
        period: filters.sankey,
        rfmList: filters.rfmList,
        sex: filters.sex,
        age: filters.agePeriods,
      },
      dataHeatMap: {
        period: filters.heatmap,
        rfmList: filters.rfmList,
        sex: filters.sex,
        age: filters.agePeriods,
      },
    });
  };

  useEffect(() => {
    if (appliedFilters && appliedFilters.data.rfmList.length > 0) {
      getMainDataSegment(appliedFilters.data).then((data) => {
        setMainDataSegment(data);
      });

      getAllGistogram(appliedFilters.data).then((data) => {
        setAllGistogram(data);
      });

      getAllStackedGistogram(appliedFilters.data).then((data) => {
        setAllStackedGistogram(data);
      });

      getDrilldownRfmDayWeekTime(appliedFilters.data).then((data) => {
        setDrilldownRfmDayWeekTime(data);
      });

      getDrilldownTimeDayWeekRfm(appliedFilters.data).then((data) => {
        setDrilldownTimeDayWeekRfm(data);
      });

      getTreemapTopGroupProduct(appliedFilters.data).then((data) => {
        setTreemapTopGroupProduct(data);
      });

      getTreemapTopBonuses(appliedFilters.data).then((data) => {
        setTreemapTopBonuses(data);
      });

      getRadarCountUniqGroupAndProduct(appliedFilters.data).then((data) => {
        setRadarCountUniqGroupAndProduct(data);
      });

      getTreemapRfmOrderDelivery(appliedFilters.data).then((data) => {
        setTreemapRfmOrderDelivery(data);
      });

      getDrilldownRfmRegionCityStore(appliedFilters.data).then((data) => {
        setDrilldownRfmRegionCityStore(data);
      });
    }

    if (appliedFilters && appliedFilters.dataSankey.rfmList.length > 0) {
      getSankeyMigrationClientPerSegments(appliedFilters.dataSankey).then(
        (data) => {
          setSankeyMigrationClientPerSegments(data);
        },
      );
    }

    if (appliedFilters && appliedFilters.dataHeatMap.rfmList.length > 0) {
      getHeatmapMigrationPerSegment(appliedFilters.dataHeatMap).then((data) => {
        setHeatmapMigrationPerSegment(data);
      });
    }
  }, [appliedFilters]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Лояльность`}
        actions={{
          left: !isMobile && (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Button
                variant="outline"
                className="border-b-0! rounded-b-none! opacity-50"
                onClick={() => navigate(ROUTES_PATH.LOYALTY)}
              >
                Дашборд
              </Button>
              <Button variant="outline" className="border-b-0! rounded-b-none!">
                RFM
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0! rounded-b-none! opacity-50"
                    >
                      ABC
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0! rounded-b-none! opacity-50"
                    >
                      Retention
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                className="border-b-0! rounded-b-none! opacity-50"
                onClick={() => navigate(ROUTES_PATH.UNLOAD)}
              >
                Выгрузка
              </Button>
            </div>
          ),
          right: <InfoModal />,
        }}
      />
      <div
        className={cn(
          "rounded-3xl px-4 py-4 gap-2 md:gap-4 h-full flex flex-col w-full bg-background min-h-[calc(100vh-64px)] max-md:pb-18",
          appliedFilters?.data?.rfmList?.length === 0 &&
            !isMobile &&
            "justify-center",
        )}
      >
        <div className="md:hidden">
          <Select defaultValue="rfm" onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loyalty">Дашборд</SelectItem>
              <SelectItem value="rfm">RFM</SelectItem>
              <SelectItem value="unload">Выгрузка</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="fixed right-10 bottom-10 max-md:bottom-6.5 max-md:inset-x-6 z-50">
          <FilterModal onApplyFilters={handleApplyFilters} />
        </div>
        {appliedFilters && appliedFilters.data.rfmList.length > 0 ? (
          <>
            <SegmentsCard
              isLoading={isMainDataSegmentLoading}
              data={mainDataSegment}
            />
            <div className="grid grid-cols-2 gap-4">
              <AllGistogram
                graph={allGistogram}
                isLoading={isAllGistogramLoading}
              />
              <DrilldownRfmDayWeekTime
                graph={drilldownRfmDayWeekTime}
                isLoading={isDrilldownRfmDayWeekTimeLoading}
              />
              <DrilldownTimeDayWeekRfm
                graph={drilldownTimeDayWeekRfm}
                isLoading={isDrilldownTimeDayWeekRfmLoading}
              />
              <TreemapTopGroupProduct
                graph={treemapTopGroupProduct}
                isLoading={isTreemapTopGroupProductLoading}
              />
              <TreemapTopBonuses
                graph={treemapTopBonuses}
                isLoading={isTreemapTopBonusesLoading}
              />
              <AllStackedGistogram
                graph={allStackedGistogram}
                isLoading={isAllStackedGistogramLoading}
              />
              <RadarCountUniqGroupAndProduct
                graph={radarCountUniqGroupAndProduct}
                isLoading={isRadarCountUniqGroupAndProductLoading}
              />
              <TreemapRfmOrderDelivery
                graph={treemapRfmOrderDelivery}
                isLoading={isTreemapRfmOrderDeliveryLoading}
              />
              <DrilldownRfmRegionCityStore
                graph={drilldownRfmRegionCityStore}
                isLoading={isDrilldownRfmRegionCityStoreLoading}
              />
              <SankeyMigrationClientPerSegments
                graph={sankeyMigrationClientPerSegments}
                isLoading={isSankeyMigrationClientPerSegmentsLoading}
              />
              <HeatmapMigrationPerSegment
                graph={heatmapMigrationPerSegment}
                isLoading={isHeatmapMigrationPerSegmentLoading}
              />
            </div>
            <ComparisonTwoRfmCard />
          </>
        ) : (
          <div className="my-[10%] flex h-full w-full justify-center items-center dark:opacity-70">
            <NotSelectedFilters />
          </div>
        )}
      </div>
    </div>
  );
};
