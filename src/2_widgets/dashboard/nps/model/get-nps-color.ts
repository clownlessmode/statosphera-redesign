export const getNPSColor = (score: number) => {
  if (score >= 70)
    return {
      label: "Очень высокий",
      text: " text-positive-foreground",
      bg: "bg-positive",
    };
  if (score >= 50)
    return {
      label: "Высокий",
      text: " text-secondary-foreground",
      bg: "bg-secondary",
    };
  if (score >= 30)
    return { label: "Средний", text: " text-muted-foreground", bg: "bg-muted" };
  return {
    label: "Низкий",
    text: " text-destructive-foreground",
    bg: "bg-destructive",
  };
};
