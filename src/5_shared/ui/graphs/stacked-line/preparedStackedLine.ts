import { divideNumberSpaces } from "./formatter-tooltip";

import type { LineSeriesOption, SeriesOption } from "echarts";
type ColorsLine = {
  [key: number]: string;
};

const defaultLineStyles = {
  width: 3,
};

export type StackedLineOptions = {
  colorsLine?: ColorsLine;
  lineStyles?: Record<number, LineSeriesOption>;
};

export const usePreparedStackedLine = () => {
  return (series: SeriesOption[], options?: StackedLineOptions) => {
    return series.map((serie, index) => {
      return {
        type: "line",
        smooth: true,
        lineStyle: options?.lineStyles?.[index]
          ? options.lineStyles[index]
          : defaultLineStyles,
        labelLayout: {
          hideOverlap: true,
        },

        label: index === 0 && {
          show: true,
          formatter: (args: any) => {
            if (args.data[1]) {
              return divideNumberSpaces(args.data[1]);
            }
          },
        },
        z: index === 0 ? 2 : 1,
        ...serie,
      };
    }) as SeriesOption[];
  };
};
