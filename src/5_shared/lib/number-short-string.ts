export const formatNumberShortString = (num: number) => {
  try {
    if (num && isNaN(num)) return "0";

    if (num >= 1000000000) {
      return (
        (num / 1000000000).toLocaleString("ru-RU", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 3,
          useGrouping: true,
        }) + " млрд"
      );
    } else if (num >= 1000000) {
      return (
        (num / 1000000).toLocaleString("ru-RU", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
          useGrouping: true,
        }) + " млн"
      );
    } else if (num >= 1000) {
      return (
        (num / 1000).toLocaleString("ru-RU", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 3,
          useGrouping: true,
        }) + " тыс"
      );
    } else {
      return num.toLocaleString("ru-RU");
    }
  } catch (e) {
    console.error(e);
  }
};
