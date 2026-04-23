type Props = {
  rows?: number;
};

export function GroupNestedListSkeleton({ rows = 2 }: Props) {
  return (
    <ul className="space-y-2 pl-2 border-l-2 border-muted ml-1">
      {Array.from({ length: rows }, (_, i) => (
        <li
          key={i}
          className="h-12 rounded-md bg-muted/60 animate-pulse"
          aria-hidden
        />
      ))}
    </ul>
  );
}
