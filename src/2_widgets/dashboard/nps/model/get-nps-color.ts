export const getNPSColor = (score: number) => {
  if (score >= 70)
    return {
      label: "Очень высокий",
      text: "text-positive-foreground",
      bg: "bg-positive",
    };
  if (score >= 50)
    return {
      label: "Высокий",
      text: "text-height-foreground",
      bg: "bg-height",
    };
  if (score >= 30)
    return {
      label: "Средний",
      text: "text-average-foreground",
      bg: "bg-average",
    };
  return {
    label: "Низкий",
    text: "text-secondary-foreground",
    bg: "bg-secondary",
  };
};
