export const divideNumberSpaces = (number: number) => {
  return number.toLocaleString("ru-RU");
};
export const getFormatTooltip = (args: any) => {
  try {
    let tooltip = `<p>${args[0].axisValue}</p>`;

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
    let tooltip = `<p>${args[0].axisValue}</p>`;

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
    let tooltip = `<p>${args[0].axisValue} часов</p>`;

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
