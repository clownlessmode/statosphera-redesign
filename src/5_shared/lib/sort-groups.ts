export function sortGroups(groups: any[]) {
  return groups.slice().sort((a, b) => a.label.localeCompare(b.label, "ru"));
}
