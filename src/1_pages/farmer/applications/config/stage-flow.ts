export type StageCategory =
  | "action_required"
  | "in_progress"
  | "success"
  | "fail";

export type Stage = {
  order: number;
  stageId: string;
  stageKey: string;
  shortName: string;
  category: StageCategory;
  mainStep?: number;
};

export const TOTAL_MAIN_STEPS = 10;

export const BITRIX_STAGE_FLOW: Stage[] = [
  {
    order: 1,
    stageId: "DT1490_265:UC_HRKJ5S",
    stageKey: "UC_HRKJ5S",
    shortName: "Согласование заявки",
    category: "action_required",
    mainStep: 1,
  },
  {
    order: 2,
    stageId: "DT1490_265:NEW",
    stageKey: "NEW",
    shortName: "Выработка МРП / Дегустация",
    category: "in_progress",
    mainStep: 2,
  },
  {
    order: 3,
    stageId: "DT1490_265:UC_XA4NH4",
    stageKey: "UC_XA4NH4",
    shortName: "Доработка МРП",
    category: "in_progress",
    mainStep: 2,
  },
  {
    order: 4,
    stageId: "DT1490_265:UC_1B20Z0",
    stageKey: "UC_1B20Z0",
    shortName: "Заполнение НД",
    category: "action_required",
    mainStep: 3,
  },
  {
    order: 5,
    stageId: "DT1490_265:UC_C8Z9PM",
    stageKey: "UC_C8Z9PM",
    shortName: "Проверка НД",
    category: "in_progress",
    mainStep: 4,
  },
  {
    order: 6,
    stageId: "DT1490_265:UC_21AWKG",
    stageKey: "UC_21AWKG",
    shortName: "Доработка НД",
    category: "action_required",
    mainStep: 4,
  },
  {
    order: 7,
    stageId: "DT1490_265:UC_70T9OA",
    stageKey: "UC_70T9OA",
    shortName: "Расчёт стоимости",
    category: "in_progress",
    mainStep: 5,
  },
  {
    order: 8,
    stageId: "DT1490_265:UC_2JOKXY",
    stageKey: "UC_2JOKXY",
    shortName: "Согласование цены",
    category: "action_required",
    mainStep: 6,
  },
  {
    order: 9,
    stageId: "DT1490_265:UC_ICBDGO",
    stageKey: "UC_ICBDGO",
    shortName: "Дизайн этикетки",
    category: "in_progress",
    mainStep: 7,
  },
  {
    order: 10,
    stageId: "DT1490_265:UC_1BO6E2",
    stageKey: "UC_1BO6E2",
    shortName: "Согласование этикетки",
    category: "action_required",
    mainStep: 8,
  },
  {
    order: 11,
    stageId: "DT1490_265:UC_4R5U06",
    stageKey: "UC_4R5U06",
    shortName: "Распределение новинки",
    category: "in_progress",
    mainStep: 9,
  },
  {
    order: 12,
    stageId: "DT1490_265:FAIL",
    stageKey: "FAIL",
    shortName: "Отклонено",
    category: "fail",
    mainStep: 10,
  },
  {
    order: 13,
    stageId: "DT1490_265:SUCCESS",
    stageKey: "SUCCESS",
    shortName: "Готова к запуску",
    category: "success",
    mainStep: 10,
  },
];

export const getStage = (stageKey?: string | null, stageId?: string | null) => {
  const key = (stageKey ?? "").trim().toUpperCase();
  const id = (stageId ?? "").trim();

  return BITRIX_STAGE_FLOW.find(
    (item) =>
      (key && item.stageKey.toUpperCase() === key) ||
      (id && item.stageId === id),
  );
};

export const getStageProgress = (stage: Stage) => {
  if (stage.category === "success" || stage.category === "fail") return 100;
  if (!stage.mainStep || !Number.isFinite(stage.mainStep)) return 0;
  return Math.round((stage.mainStep / TOTAL_MAIN_STEPS) * 100);
};
