import type {
  GraphPartnerRowFocus,
  PartnerRowFocusKind,
  PartnerTableGroup,
  PartnerTableRow,
} from "../api/types";

/** Поля group[] таблицы → kind для graph rowFocus (по доке бэка) */
const TABLE_GROUP_TO_FOCUS_KIND: Partial<
  Record<PartnerTableGroup | string, PartnerRowFocusKind>
> = {
  product: "product",
  group: "group",
  subGroups: "subgroup",
  subSubGroups: "subsubgroup",
};

/** Уровни group[], для которых rowFocus на бэке не реализован */
const ROW_FOCUS_UNSUPPORTED_GROUPS = new Set([
  "store",
  "directionProducts",
  "groupsFranchise",
  "day",
  "week",
  "month",
  "quarter",
  "year",
]);

const GROUP_LABELS_RU: Record<string, string> = {
  directionProducts: "Направление",
  group: "Группа",
  subGroups: "Подгруппа",
  subSubGroups: "Подподгруппа",
  product: "Товар",
  store: "Магазин",
  groupsFranchise: "Франшиза",
};

/** id по kind — приоритет полей в ответе table */
const FOCUS_ID_FIELDS: Record<PartnerRowFocusKind, string[]> = {
  product: [
    "id_product_1c",
    "idProduct",
    "id_product",
    "product_id",
    "id_product_1C",
  ],
  group: [
    "id_groups_main",
    "idGroupsMain",
    "group_id",
    "idGroup",
    "id_group",
    "groups_main_id",
  ],
  subgroup: ["id_sub_groups", "idSubGroups", "id_subgroups", "sub_groups_id"],
  subsubgroup: [
    "id_sub_sub_groups",
    "idSubSubGroups",
    "id_subsubgroups",
    "sub_sub_groups_id",
  ],
  manufacturer: ["inn_producer", "innProducer", "inn"],
};

const PRODUCT_CODE_PATTERN = /^УТ-|^UT-/i;

function readFocusId(
  row: PartnerTableRow,
  kind: PartnerRowFocusKind,
): string | undefined {
  for (const field of FOCUS_ID_FIELDS[kind]) {
    const raw = row[field];
    if (raw == null || raw === "") continue;

    if (kind === "product") {
      return String(raw).trim();
    }

    const num = Number(raw);
    if (!Number.isNaN(num)) {
      return String(num);
    }
  }

  // Поиск по ключам ответа (разный camelCase/snake_case от бэка)
  for (const [key, raw] of Object.entries(row)) {
    if (raw == null || raw === "") continue;
    const k = key.toLowerCase();

    if (kind === "product") {
      if (
        k.includes("id_product") ||
        k === "idproduct" ||
        (k.includes("product") && k.includes("id"))
      ) {
        return String(raw).trim();
      }
    }

    if (kind === "group" && k.includes("group") && k.includes("id")) {
      const num = Number(raw);
      if (!Number.isNaN(num)) return String(num);
    }

    if (kind === "subgroup" && k.includes("sub") && k.includes("id")) {
      const num = Number(raw);
      if (!Number.isNaN(num)) return String(num);
    }

    if (kind === "subsubgroup" && k.includes("sub") && k.includes("id")) {
      const num = Number(raw);
      if (!Number.isNaN(num)) return String(num);
    }
  }

  // Код 1С в поле названия товара
  if (kind === "product") {
    for (const field of ["product", "product_name", "productName"]) {
      const v = row[field];
      if (typeof v === "string" && PRODUCT_CODE_PATTERN.test(v.trim())) {
        return v.trim();
      }
    }
  }

  return undefined;
}

/**
 * rowFocus по самому детальному поддерживаемому уровню из group[] (с конца).
 */
export function buildRowFocus(
  row: PartnerTableRow,
  tableGroups: PartnerTableGroup[] | string[],
): GraphPartnerRowFocus | undefined {
  for (let i = tableGroups.length - 1; i >= 0; i--) {
    const tableGroup = tableGroups[i];
    const kind = TABLE_GROUP_TO_FOCUS_KIND[tableGroup];
    if (!kind) continue;

    const id = readFocusId(row, kind);
    if (id) {
      return { kind, id };
    }
  }

  return undefined;
}

export function isValidRowFocus(
  focus?: GraphPartnerRowFocus,
): focus is GraphPartnerRowFocus & { kind: PartnerRowFocusKind; id: string } {
  return Boolean(focus?.kind?.trim() && focus?.id?.trim());
}

export function formatRowFocusLabel(
  row: PartnerTableRow,
  focus: GraphPartnerRowFocus,
): string {
  const nameFields: Record<PartnerRowFocusKind, string[]> = {
    product: ["product_name", "product", "productName"],
    group: ["group"],
    subgroup: ["subGroups", "subgroups"],
    subsubgroup: ["subSubGroups", "subsubgroups"],
    manufacturer: ["manufacturer"],
  };

  const kind = focus.kind as PartnerRowFocusKind;
  for (const field of nameFields[kind] ?? []) {
    const label = row[field];
    if (label != null && String(label).trim()) {
      return String(label).trim();
    }
  }

  return focus.id ?? "";
}

/**
 * Понятное объяснение, почему срез по клику не построился.
 */
export function explainRowFocusUnavailable(
  row: PartnerTableRow,
  tableGroups: PartnerTableGroup[] | string[],
): string {
  if (!tableGroups.length) {
    return "Укажите группировку строк (товар, группа и т.д.) в боковой панели.";
  }

  const hasSupportedLevel = tableGroups.some(
    (g) => TABLE_GROUP_TO_FOCUS_KIND[g],
  );

  if (!hasSupportedLevel) {
    const path = tableGroups.map((g) => GROUP_LABELS_RU[g] ?? g).join(" → ");
    return `Срез на графике работает только для товара, группы или подгруппы. Сейчас в группировке: ${path}. «Направление» и «магазин» бэк для rowFocus не поддерживает — добавьте, например, «Товар» в конец группировки.`;
  }

  for (let i = tableGroups.length - 1; i >= 0; i--) {
    const tableGroup = tableGroups[i];
    const kind = TABLE_GROUP_TO_FOCUS_KIND[tableGroup];
    if (!kind) continue;

    if (ROW_FOCUS_UNSUPPORTED_GROUPS.has(tableGroup)) {
      continue;
    }

    if (!readFocusId(row, kind)) {
      const label = GROUP_LABELS_RU[tableGroup] ?? tableGroup;
      const display = row[tableGroup];
      const displayStr =
        display != null && display !== "" ? `«${display}»` : "без названия";

      if (kind === "product") {
        return `Для среза по товару в строке нужен код 1С (поле id_product_1c, напр. УТ-00009066). В строке сейчас только ${displayStr}. График показан по всему фильтру.`;
      }

      return `Для среза по «${label}» бэку нужен числовой id в ответе table, а не только название ${displayStr}. График показан по всему фильтру.`;
    }
  }

  return "Не удалось сузить график по этой строке — показан весь отчёт по фильтру.";
}

/** @deprecated используйте explainRowFocusUnavailable */
export function rowFocusUnavailableReason(
  row: PartnerTableRow,
  tableGroups: PartnerTableGroup[] | string[],
): string | undefined {
  return explainRowFocusUnavailable(row, tableGroups);
}
