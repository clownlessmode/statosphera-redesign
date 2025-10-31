import { divideNumberSpaces } from "./formatter-tooltip";
import type { LineSeriesOption, SeriesOption } from "echarts";

export type StackedLineOptions = {
  /** Custom colors per series index */
  colorsLine?: { [key: number]: string };
  /** Generic overrides per index */
  lineStyles?: Record<number, LineSeriesOption["lineStyle"]>;
  /** Specific overrides for the first four lines */
  firstLineStyle?: LineSeriesOption["lineStyle"];
  secondLineStyle?: LineSeriesOption["lineStyle"];
  thirdLineStyle?: LineSeriesOption["lineStyle"];
  fourthLineStyle?: LineSeriesOption["lineStyle"];
};

export const usePreparedStackedLine = () => {
  return (series: SeriesOption[], options?: StackedLineOptions) => {
    return series.map((series, index) => {
      // Determine if this should be solid (first two) or dashed (rest)
      const isSolid = index < 2;
      // Default widths: solid=4, dashed=2
      const defaultLineStyle: LineSeriesOption["lineStyle"] = {
        width: isSolid ? 4 : 2,
        type: isSolid ? "solid" : "dashed",
      };

      // Check for specific overrides for indices 0-3
      let overrideStyle: LineSeriesOption["lineStyle"] | undefined;
      if (index === 0) overrideStyle = options?.firstLineStyle;
      else if (index === 1) overrideStyle = options?.secondLineStyle;
      else if (index === 2) overrideStyle = options?.thirdLineStyle;
      else if (index === 3) overrideStyle = options?.fourthLineStyle;

      // Fallback to generic lineStyles map
      const genericStyle = options?.lineStyles?.[index];
      const lineStyle = overrideStyle ?? genericStyle ?? defaultLineStyle;

      return {
        ...series,
        type: "line",
        smooth: true,
        lineStyle,
        labelLayout: { hideOverlap: true },
        label:
          index === 0
            ? {
                show: true,
                formatter: (args: any) => {
                  if (args.data[1]) {
                    if (args.dataIndex % 2 === 0) {
                      return divideNumberSpaces(Math.round(args.data[1]));
                    }
                    return "";
                  }
                },
              }
            : undefined,
        z: index === 0 ? 2 : 1,
      } as SeriesOption;
    });
  };
};
