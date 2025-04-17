export const getFormatTooltip = (params: unknown) => {
  if (!Array.isArray(params)) {
    return "";
  }

  const date = params[0]?.axisValue || "";
  const lines = params.map((param) => {
    const value = param.value?.[1] || 0;
    const color = param.color;
    const name = param.seriesName || "";

    return `<div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: ${color}"></div>
      <span>${name}: ${value}</span>
    </div>`;
  });

  return `<div style="padding: 8px; background: var(--background); border: 1px solid var(--border); border-radius: 4px;">
    <div style="margin-bottom: 8px; color: var(--foreground);">${date}</div>
    ${lines.join("")}
  </div>`;
};
