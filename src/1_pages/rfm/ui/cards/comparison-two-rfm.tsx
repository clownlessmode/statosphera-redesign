import { FC, useEffect, useState } from "react";
import { useRfm } from "@pages/rfm/api";
import { ComparisonTwoRfmResponse } from "@pages/rfm/config";
import { RfmElm } from "./rfm-elm";
import { RfmElmSkeleton } from "./rfm-elm-skeleton";
import { Difference } from "./difference";

export const ComparisonTwoRfmCard: FC = () => {
  const [dataSegments, setDataSegments] = useState<ComparisonTwoRfmResponse>();
  const { getComparisonTwoRfm, isComparisonTwoRfmLoading } = useRfm();

  useEffect(() => {
    const filter = {
      firstSegment: {
        period: "M-3",
        rfmCode: 111,
        sex: ["Мужской", "Женский", "Не определено"],
        age: ["Не указан возраст", "25-35", ">60", "<18"],
      },
      secondSegment: {
        period: "M-6",
        rfmCode: 112,
        sex: ["Мужской", "Женский", "Не определено"],
        age: ["Не указан возраст", "25-35", ">60", "<18"],
      },
    };
    getComparisonTwoRfm(filter).then((data) => {
      setDataSegments(data);
    });
  }, []);

  //const selectFirstSegment = (segments, periods, genders, ages) => {
  //  if (!dataSegment || segment !== datadataSegments?.firstSegment.mainData.segmentCode) {
  //    const filter = {
  //      period: periods,
  //      rfmList: [segments],
  //      sex: [genders],
  //      age: [ages],
  //    };
  //
  //  }
  //};

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-semibold">Сравнение сегментов</span>
      <div className="w-full h-full grid grid-cols-3 gap-4">
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
          <RfmElmSkeleton />
        )}
      </div>
    </div>
  );
};
