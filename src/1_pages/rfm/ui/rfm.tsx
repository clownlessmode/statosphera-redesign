import { Header } from "@widgets/header";
import { useRfm } from "../api";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { RfmFilter } from "../ui/filters/segment-filter";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useRfmFiltersStore } from "./filters/filters-store";
import { useEffect, useMemo, useState } from "react";
import {
  //EighthCalculationResponse,
  //EleventhCalculationResponse,
  //FifteenCalculationResponse,
  FifthCalculationResponse,
  FirstCalculationResponse,
  //FourteenCalculationResponse,
  //FourthCalculationResponse,
  //NinthCalculationResponse,
  //SecondCalculationResponse,
  //SeventhCalculationResponse,
  SixteenCalculationResponse,
  //SixthCalculationResponse,
  //TenthCalculationResponse,
  ThirdCalculationResponse,
  //ThirteenthCalculationResponse,
  //TwelfthCalculationResponse,
} from "../config";
import { Segments } from "./cards";
import Spinner from "@shared/ui/spinner";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import { cn } from "@shared/lib/utils";
import { FirstCalculation } from "./cards/firstCalculation";
import { ThirdCalculation } from "./cards/thirdCalculation";
//import { SecondCalculation } from "./cards/secondCalculation";
import { FifthCalculation } from "./cards/fifthCalculation";
//import { SecondCalculation } from "./cards/secondCalculation";

export const Rfm = () => {
  const isMobile = useIsMobile();
  const { getApiPayload } = useRfmFiltersStore();
  const filters = getApiPayload();

  const mock: any = useMemo(
    () => ({
      data: {
        period: filters.period,
        rfmList: filters.rfmList,
      },
      dataSankey: {
        period: filters.sankey,
        rfmList: filters.rfmList,
      },
      dataHeatMap: {
        period: filters.heatmap,
        rfmList: filters.rfmList,
      },
    }),
    [filters],
  );

  const [firstCalculation, setFirstCalculation] =
    useState<FirstCalculationResponse>({
      categories: [],
      series: [],
      text: [],
    });
  //const [secondCalculation, setSecondCalculation] =
  //  useState<SecondCalculationResponse>({
  //    data: [],
  //  });
  //const [secondCalculationReverse, setSecondCalculationReverse] =
  //  useState<SecondCalculationResponse>({
  //    data: [],
  //  });
  const [thirdCalculation, setThirdCalculation] =
    useState<ThirdCalculationResponse>({
      childrenProceed: [],
      childrenProfit: [],
    });
  //const [fourthCalculation, setFourthCalculation] =
  //  useState<FourthCalculationResponse>({
  //    headers: [],
  //    dataSourceList: [],
  //  });
  const [fifthCalculation, setFifthCalculation] =
    useState<FifthCalculationResponse>({
      childrenProceed: [],
      childrenProfit: [],
    });
  //const [sixthCalculation, setSixthCalculation] =
  //  useState<SixthCalculationResponse>({
  //    legendData: [],
  //    radarIndicator: [],
  //    seriesData: [],
  //  });
  //const [seventhCalculation, setSeventhCalculation] =
  //  useState<SeventhCalculationResponse>({
  //    data: [],
  //  });
  //const [eighthCalculation, setEighthCalculation] =
  //  useState<EighthCalculationResponse>({
  //    categories: [],
  //    series: [],
  //  });
  //const [ninthCalculation, setNinthCalculation] = useState<
  //  NinthCalculationResponse[]
  //>([]);
  //const [tenthCalculation, setTenthCalculation] =
  //  useState<TenthCalculationResponse>({
  //    segments: [],
  //    series: [],
  //    legend: {
  //      data: [],
  //      left: "",
  //    },
  //  });
  //const [eleventhCalculation, setEleventhCalculation] =
  //  useState<EleventhCalculationResponse>({
  //    categories: [],
  //    series: [],
  //  });
  //const [twelfthCalculation, setTwelfthCalculation] =
  //  useState<TwelfthCalculationResponse>({
  //    segments: [],
  //    series: [],
  //    legend: {
  //      data: [],
  //      left: "",
  //    },
  //  });
  //const [thirteenthCalculation, setThirteenthCalculation] =
  //  useState<ThirteenthCalculationResponse>({
  //    segments: [],
  //    series: [],
  //    legend: {
  //      data: [],
  //      left: "",
  //    },
  //  });
  //const [fourteenCalculation, setFourteenCalculation] =
  //  useState<FourteenCalculationResponse>({
  //    data: [],
  //    links: [],
  //  });
  //const [fifteenCalculation, setFifteenCalculation] =
  //  useState<FifteenCalculationResponse>({
  //    xAxis: [],
  //    yAxis: [],
  //    matrixData: [],
  //  });
  const [sixteenCalculation, setSixteenCalculation] = useState<
    SixteenCalculationResponse[]
  >([]);

  const {
    getFirstCalculation,
    isFirstCalculationLoading,
    //getSecondCalculation,
    isSecondCalculationLoading,
    //getSecondCalculationReverse,
    isSecondCalculationReverseLoading,
    getThirdCalculation,
    isThirdCalculationLoading,
    //getFourthCalculation,
    isFourthCalculationLoading,
    getFifthCalculation,
    isFifthCalculationLoading,
    //getSixthCalculation,
    isSixthCalculationLoading,
    //getSeventhCalculation,
    isSeventhCalculationLoading,
    //getEighthCalculation,
    isEighthCalculationLoading,
    //getNinthCalculation,
    isNinthCalculationLoading,
    //getTenthCalculation,
    isTenthCalculationLoading,
    //getEleventhCalculation,
    isEleventhCalculationLoading,
    //getTwelfthCalculation,
    isTwelfthCalculationLoading,
    //getThirteenthCalculation,
    isThirteenthCalculationLoading,
    //getFourteenCalculation,
    isFourteenCalculationLoading,
    //getFifteenCalculation,
    isFifteenCalculationLoading,
    getSixteenCalculation,
    isSixteenCalculationLoading,
  } = useRfm();

  useEffect(() => {
    if (mock.data.rfmList.length > 0) {
      getFirstCalculation(mock.data).then((data) => {
        setFirstCalculation(data);
      });

      //getSecondCalculation(mock.data).then((data) => {
      //  setSecondCalculation(data);
      //});
      //
      //getSecondCalculationReverse(mock.data).then((data) => {
      //  setSecondCalculationReverse(data);
      //});

      getThirdCalculation(mock.data).then((data) => {
        setThirdCalculation(data);
      });

      //getFourthCalculation(mock.data).then((data) => {
      //  setFourthCalculation(data);
      //});

      getFifthCalculation(mock.data).then((data) => {
        setFifthCalculation(data);
      });

      //getSixthCalculation(mock.data).then((data) => {
      //  setSixthCalculation(data);
      //});
      //
      //getSeventhCalculation(mock.data).then((data) => {
      //  setSeventhCalculation(data);
      //});
      //
      //getEighthCalculation(mock.data).then((data) => {
      //  setEighthCalculation(data);
      //});
      //getNinthCalculation(mock.data).then((data) => {
      //  setNinthCalculation(data);
      //});
      //getTenthCalculation(mock.data).then((data) => {
      //  setTenthCalculation(data);
      //});
      //getEleventhCalculation(mock.data).then((data) => {
      //  setEleventhCalculation(data);
      //});
      //
      //getTwelfthCalculation(mock.data).then((data) => {
      //  setTwelfthCalculation(data);
      //});
      //
      //getThirteenthCalculation(mock.data).then((data) => {
      //  setThirteenthCalculation(data);
      //});

      getSixteenCalculation(mock.data).then((data) => {
        setSixteenCalculation(data);
      });
    }

    //if (mock.dataSankey.rfmList.length > 0) {
    //  getFourteenCalculation(mock.dataSankey).then((data) => {
    //    setFourteenCalculation(data);
    //  });
    //}
    //
    //if (mock.dataHeatMap.rfmList.length > 0) {
    //  getFifteenCalculation(mock.dataHeatMap).then((data) => {
    //    setFifteenCalculation(data);
    //  });
    //}
  }, [mock]);

  const isLoading =
    isFirstCalculationLoading ||
    isSecondCalculationLoading ||
    isSecondCalculationReverseLoading ||
    isThirdCalculationLoading ||
    isFourthCalculationLoading ||
    isFifthCalculationLoading ||
    isSixthCalculationLoading ||
    isSeventhCalculationLoading ||
    isEighthCalculationLoading ||
    isNinthCalculationLoading ||
    isTenthCalculationLoading ||
    isEleventhCalculationLoading ||
    isTwelfthCalculationLoading ||
    isThirteenthCalculationLoading ||
    isFourteenCalculationLoading ||
    isFifteenCalculationLoading ||
    isSixteenCalculationLoading;

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Лояльность`}
        actions={{
          right: !isMobile && <RfmFilter />,
          left: !isMobile && (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Link to={ROUTES_PATH.LOYALTY}>
                <Button
                  variant="outline"
                  className="border-b-0 rounded-b-none opacity-50"
                >
                  Лояльность
                </Button>
              </Link>
              <Button variant="outline" className="border-b-0 rounded-b-none">
                RFM-анализ
              </Button>
            </div>
          ),
        }}
      />
      <div
        className={cn(
          "rounded-3xl px-4 py-4 gap-2 md:gap-4 h-full flex flex-col w-full bg-background min-h-[calc(100vh-64px)]",
          filters.rfmList.length === 0 && !isMobile && "justify-center",
        )}
      >
        {isMobile && (
          <div className="flex flex-row justify-end">
            <RfmFilter />
          </div>
        )}
        {filters.rfmList.length > 0 ? (
          <>
            <Segments
              isLoading={isSixteenCalculationLoading}
              data={sixteenCalculation}
            />
            <div className="grid grid-cols-2 gap-4">
              <FirstCalculation
                graph={firstCalculation}
                isLoading={isFirstCalculationLoading}
              />
              {/*<SecondCalculation
                graph={secondCalculation}
                isLoading={isSecondCalculationReverseLoading}
              />
              <SecondCalculation
                graph={secondCalculationReverse}
                isLoading={isSecondCalculationReverseLoading}
              />*/}
              <ThirdCalculation
                graph={thirdCalculation}
                isLoading={isThirdCalculationLoading}
              />
              <FifthCalculation
                graph={fifthCalculation}
                isLoading={isFifthCalculationLoading}
              />
            </div>
          </>
        ) : (
          <div
            className={cn(
              isLoading ? "my-[25%]" : "my-[10%]",
              "flex flex-col gap-4 h-full w-full justify-center items-center",
            )}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="dark:opacity-70">
                <NotSelectedFilters />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
