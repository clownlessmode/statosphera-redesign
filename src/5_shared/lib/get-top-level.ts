/**
 * Возвращает массив значений (value) элементов, у которых есть children,
 * но их дети не имеют собственных children.
 * При этом из каждого значения удаляется подстрока "Group" или "group".
 * @param {Array<Object>} items — исходный массив объектов
 * @returns {Array<string>} — массив очищенных value подходящих элементов
 */
export function getTopLevelValues(items: any[]): string[] {
  return items
    .filter(
      (item) =>
        Array.isArray(item.children) &&
        item.children.length > 0 &&
        item.children.every((child: any) => !Array.isArray(child.children)),
    )
    .map((item) =>
      String(item.value)
        // удаляем все вхождения "group" независимо от регистра
        .replace(/group/gi, "")
        // убираем пробелы по краям
        .trim(),
    )
    .map((item) => item.toLowerCase());
}
