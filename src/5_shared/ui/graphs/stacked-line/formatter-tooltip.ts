export const divideNumberSpaces = (number: number) => {
  return number.toLocaleString("ru-RU");
};

const getWeek = (dateStr: string): string => {
  const [yy, mm, dd] = dateStr.split("-");
  const iso = `20${yy}-${mm}-${dd}`;
  const d = new Date(iso);
  if (isNaN(d.getTime())) {
    return "";
  }
  return d.toLocaleDateString("ru-RU", { weekday: "long" });
};

const formatDateByGroupType = (dateStr: string, groupType?: string): string => {
  switch (groupType) {
    case "hour":
      return `${dateStr}:00`;
    case "day": {
      const weekday = getWeek(dateStr);
      if (weekday) {
        const weekdayCapitalized = weekday[0].toUpperCase() + weekday.slice(1);
        return `${dateStr} (${weekdayCapitalized})`;
      }
      return dateStr;
    }
    case "week":
      return `Неделя ${dateStr}`;
    case "month": {
      const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];
      const monthNum = parseInt(dateStr);
      return months[monthNum - 1] || `Месяц ${dateStr}`;
    }
    case "quarter":
      return `${dateStr} квартал`;
    case "year":
      return `${dateStr} год`;
    default:
      return dateStr;
  }
};

const getPointValue = (param: any): number | undefined => {
  const raw = param?.value ?? param?.data;
  if (Array.isArray(raw) && raw.length >= 2) {
    const n = Number(raw[1]);
    return Number.isNaN(n) ? undefined : n;
  }
  if (raw === null || raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  return Number.isNaN(n) ? undefined : n;
};

export const getFormatTooltip = (args: any, groupType?: string) => {
  try {
    const dateStr = args[0].axisValue as string;
    const formattedDate = formatDateByGroupType(dateStr, groupType);

    let tooltip = `<p>${formattedDate}</p>`;

    args.forEach((param: any) => {
      const y = getPointValue(param);
      if (y === undefined) return;

      tooltip += `<p>${param.marker} ${param.seriesName}: ${divideNumberSpaces(
        Math.round(y),
      )}</p>`;
    });

    const currentValue = getPointValue(args[0]);
    const prevValue = getPointValue(args[1]);

    if (currentValue !== undefined && prevValue !== undefined) {
      const delta = currentValue - prevValue;
      const deltaPercent =
        prevValue !== 0
          ? Math.floor((delta / prevValue) * 100)
          : delta !== 0
            ? 100
            : 0;
      tooltip += `<p>Разница: ${divideNumberSpaces(
        Math.round(delta),
      )} (${deltaPercent}%)</p>`;
    }

    return tooltip;
  } catch {
    return "";
  }
};

export const getBarFormatTooltip = (args: any, groupType?: string) => {
  try {
    const dateStr = args[0].axisValue as string;
    const formattedDate = formatDateByGroupType(dateStr, groupType);

    let tooltip = `<p>${formattedDate}</p>`;

    args.forEach(({ marker, seriesName, data }: any) => {
      if (data) {
        tooltip += `<p>${marker} ${seriesName}: ${divideNumberSpaces(
          data,
        )}</p>`;
      }
    });

    const currentValue = args[0]?.value;
    const prevValue = args[1]?.value;

    if (currentValue && prevValue) {
      const deltaPercent = Math.floor((prevValue / currentValue) * 100);
      tooltip += `<p>Процент списания: ${deltaPercent}%</p>`;
    }

    return tooltip;
  } catch {
    return "";
  }
};

export const getSalesFormatTooltip = (args: any, groupType?: string) => {
  try {
    const dateStr = args[0].axisValue as string;
    const formattedDate = formatDateByGroupType(dateStr, groupType);

    let tooltip = `<p>${formattedDate}</p>`;

    args.forEach(({ marker, seriesName, data }: any) => {
      if (data && data[1]) {
        tooltip += `<p>${marker} ${seriesName}: ${divideNumberSpaces(
          data[1],
        )}</p>`;
      }
    });

    const currentValue = args[0]?.data?.[1];
    const prevValue = args[1]?.data?.[1];

    if (currentValue && prevValue) {
      const deltaPercent = (
        ((currentValue - prevValue) / prevValue) *
        100
      ).toFixed(1);
      const deltaValue = Math.floor(currentValue - prevValue);
      tooltip += `<p>Разница: ${divideNumberSpaces(
        deltaValue,
      )} (${deltaPercent}%)</p>`;
    }

    return tooltip;
  } catch {
    return "";
  }
};
