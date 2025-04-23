const getWeek = (dateStr: string): string => {
  // Разбиваем "YY-MM-DD"
  const [yy, mm, dd] = dateStr.split("-");
  // Собираем в ISO-формат с четырёхзначным годом
  const iso = `20${yy}-${mm}-${dd}`;
  const d = new Date(iso);
  // Получаем день недели по-русски, с маленькой буквы
  return d.toLocaleDateString("ru-RU", { weekday: "long" });
};

export const divideNumberSpaces = (number: number) => {
  return number.toLocaleString("ru-RU");
};
export const getFormatTooltip = (args: any) => {
  try {
    const dateStr = args[0].axisValue as string;
    const weekday = getWeek(dateStr);
    // Делаем первую букву заглавной:
    const weekdayCapitalized = weekday[0].toUpperCase() + weekday.slice(1);
    let tooltip = `<p>${dateStr} (${weekdayCapitalized})</p>`;

    // @ts-ignore
    args.forEach(({ marker, seriesName, value }) => {
      if (value[1]) {
        tooltip += `<p>${marker} ${seriesName}: ${divideNumberSpaces(
          value[1]
        )}</p>`;
      }
    });

    const currentValue = args[0].value[1];
    const prevValue = args[1].value[1];

    if (currentValue && prevValue) {
      const deltaPercent = Math.floor(
        ((currentValue - prevValue) / prevValue) * 100
      );
      tooltip += `<p>Разница: ${divideNumberSpaces(
        args[0].value[1] - args[1].value[1]
      )} (${deltaPercent}%)</p>`;
    }

    return tooltip;
  } catch (e) {
    console.log(e);
  }
};

export const getBarFormatTooltip = (args: any) => {
  try {
    const dateStr = args[0].axisValue as string;
    const weekday = getWeek(dateStr);
    // Делаем первую букву заглавной:
    const weekdayCapitalized = weekday[0].toUpperCase() + weekday.slice(1);
    let tooltip = `<p>${dateStr} (${weekdayCapitalized})</p>`;

    // @ts-ignore
    args.forEach(({ marker, seriesName, data }) => {
      if (data) {
        tooltip += `<p>${marker} ${seriesName}: ${divideNumberSpaces(
          data
        )}</p>`;
      }
    });

    const currentValue = args[0].value;
    const prevValue = args[1].value;

    if (currentValue && prevValue) {
      const deltaPercent = Math.floor((prevValue / currentValue) * 100);
      tooltip += `<p>Процент списания: ${deltaPercent}%</p>`;
    }

    return tooltip;
  } catch (e) {
    console.log(e);
  }
};

export const getSalesFormatTooltip = (args: any) => {
  try {
    const dateStr = args[0].axisValue as string;
    const weekday = getWeek(dateStr);
    // Делаем первую букву заглавной:
    const weekdayCapitalized = weekday[0].toUpperCase() + weekday.slice(1);
    let tooltip = `<p>${dateStr} часов (${weekdayCapitalized})</p>`;

    // @ts-ignore
    args.forEach(({ marker, seriesName, data }) => {
      if (data[1]) {
        tooltip += `<p>${marker} ${seriesName}: ${divideNumberSpaces(
          data[1]
        )}</p>`;
      }
    });

    const currentValue = args[0].data[1];
    const prevValue = args[1].data[1];

    if (currentValue && prevValue) {
      const deltaPercent = (
        ((currentValue - prevValue) / prevValue) *
        100
      ).toFixed(1);
      const deltaValue = Math.floor(currentValue - prevValue);
      tooltip += `<p>Разница: ${divideNumberSpaces(
        deltaValue
      )} (${deltaPercent}%)</p>`;
    }

    return tooltip;
  } catch (e) {
    console.log(e);
  }
};
