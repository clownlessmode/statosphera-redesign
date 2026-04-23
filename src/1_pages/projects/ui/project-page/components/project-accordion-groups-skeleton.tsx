const ROWS = 3;

export function ProjectAccordionGroupsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: ROWS }, (_, i) => (
        <div key={i} className="h-16 rounded-lg bg-muted/60 animate-pulse" />
      ))}
    </div>
  );
}
