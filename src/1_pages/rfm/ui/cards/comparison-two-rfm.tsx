import { FC, useEffect, useState } from "react";
import { useRfm } from "@pages/rfm/api";
import {
  ComparisonTwoRfmResponse,
  RequestDtoComparison,
} from "@pages/rfm/config";
import { RfmElm } from "./rfm-elm";
import { RfmElmSkeleton } from "./rfm-elm-skeleton";
import { Difference } from "./difference";
import { ComparisonFilterModal } from "../comparison-filter-modal";
import { useComparisonFiltersStore } from "@widgets/rfm/model/comparision-filters-store";

export const ComparisonTwoRfmCard: FC = () => {
  const [dataSegments, setDataSegments] = useState<ComparisonTwoRfmResponse>();
  const { getApiPayload } = useComparisonFiltersStore();
  const [appliedFilters, setAppliedFilters] = useState<RequestDtoComparison>();
  const { getComparisonTwoRfm, isComparisonTwoRfmLoading } = useRfm();

  const handleApplyFilters = () => {
    const filters = getApiPayload();
    setAppliedFilters({
      firstSegment: {
        period: filters.firstSegment.period,
        rfmCode: filters.firstSegment.rfmCode,
        sex: filters.firstSegment.sex,
        age: filters.firstSegment.age,
      },
      secondSegment: {
        period: filters.secondSegment.period,
        rfmCode: filters.secondSegment.rfmCode,
        sex: filters.secondSegment.sex,
        age: filters.secondSegment.age,
      },
    });
  };

  useEffect(() => {
    const filters = getApiPayload();
    getComparisonTwoRfm({
      firstSegment: {
        period: filters.firstSegment.period,
        rfmCode: filters.firstSegment.rfmCode,
        sex: filters.firstSegment.sex,
        age: filters.firstSegment.age,
      },
      secondSegment: {
        period: filters.secondSegment.period,
        rfmCode: filters.secondSegment.rfmCode,
        sex: filters.secondSegment.sex,
        age: filters.secondSegment.age,
      },
    }).then((data) => {
      setDataSegments(data);
    });
  }, []);

  useEffect(() => {
    if (appliedFilters && appliedFilters.firstSegment.rfmCode) {
      getComparisonTwoRfm(appliedFilters).then((data) => {
        setDataSegments(data);
      });
    }
  }, [appliedFilters]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <span className="text-md font-semibold mr-2 max-md:text-sm">
          Сравнение сегментов
        </span>
        <ComparisonFilterModal onApplyFilters={handleApplyFilters} />
      </div>
      <div className="w-full h-full grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {dataSegments ? (
          <>
            <RfmElm
              segment={dataSegments.firstSegment}
              isLoading={isComparisonTwoRfmLoading}
            />
            <Difference
              firstCode={dataSegments.firstSegment.mainData.segmentCode}
              secondCode={dataSegments.secondSegment.mainData.segmentCode}
              mainData={dataSegments.diff}
              allData={{
                first: dataSegments.firstSegment.allData,
                second: dataSegments.secondSegment.allData,
              }}
              isLoading={isComparisonTwoRfmLoading}
            />
            <RfmElm
              segment={dataSegments.secondSegment}
              isLoading={isComparisonTwoRfmLoading}
            />
          </>
        ) : (
          <>
            <RfmElmSkeleton />
            <RfmElmSkeleton />
            <RfmElmSkeleton />
          </>
        )}
      </div>
    </div>
  );
};
