export const divideNumberSpaces = (number: number) => {
  return number.toLocaleString("ru-RU");
};

type ColorsLine = Record<number, string>;

export const defaultColors: ColorsLine = {
  0: "rgba(64, 122, 229, 1)",
  1: "rgba(160, 184, 228, 1)",
};

export const lineColorPalette: ColorsLine = {
  0: "#4EEFC9",
  1: "#426A61",
};

const defaultLineStyle = {
  width: 4,
};

export type StackedLineOptions = {
  colorsLine?: ColorsLine;
  lineStyles?: Record<number, any>;
};

export const usePreparedStackedLine = () => {
  return (series: any[], options?: any) => {
    return series.map((serie, index) => {
      const color = options?.colorsLine?.[index] ?? defaultColors[index];
      const lineStyle = options?.lineStyles?.[index] ?? defaultLineStyle;

      const showLabel = index === 0;

      const label = showLabel
        ? {
            show: true,
            color: "black",
            formatter: (args: any) => {
              const value = args.data?.[1];
              return value ? divideNumberSpaces(value) : "";
            },
          }
        : undefined;

      return {
        ...serie,
        type: "line",
        smooth: true,
        lineStyle,
        labelLayout: {
          hideOverlap: true,
        },
        color,
        label,
        z: showLabel ? 2 : 1,
      };
    });
  };
};
