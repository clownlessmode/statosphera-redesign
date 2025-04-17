import { divideNumberSpaces } from "./formatter-tooltip";
import { useTheme } from "@app/providers/theme-provider";
import type { LineSeriesOption, SeriesOption } from "echarts";
type ColorsLine = {
  [key: number]: string;
};

export const defaultColors: ColorsLine = {
  [0]: "rgba(64, 122, 229, 1)",
  [1]: "rgba(160, 184, 228, 1)",
};

export const lineColorPalette: ColorsLine = {
  [0]: "#4EEFC9",
  [1]: "#426A61",
};

const defaultLineStyles = {
  width: 4,
};

export type StackedLineOptions = {
  colorsLine?: ColorsLine;
  lineStyles?: Record<number, LineSeriesOption>;
};

export const usePreparedStackedLine = () => {
  const { theme } = useTheme();

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
        color: options?.colorsLine
          ? options.colorsLine[index]
          : defaultColors[index],
        label: index === 0 && {
          show: true,
          color: theme === "light" ? "black" : "white",
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
