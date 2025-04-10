import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
  HTMLAttributes,
  FC,
} from "react";
import { cn } from "@shared/lib/utils";

type ViewTabsContextType = {
  active: string;
  setActive: (value: string) => void;
  register: (value: string, ref: HTMLDivElement) => void;
  scrollTo: (value: string) => void;
};

const ViewTabsContext = createContext<ViewTabsContextType | null>(null);

function useViewTabs() {
  const context = useContext(ViewTabsContext);
  if (!context) {
    throw new Error("ViewTabs components must be used within <ViewTabs>");
  }
  return context;
}

type ViewTabsProps = {
  children: ReactNode;
  defaultValue?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function ViewTabs({
  children,
  defaultValue = "",
  className,
  ...props
}: ViewTabsProps) {
  const [active, setActive] = useState(defaultValue);
  const refs = useRef<Record<string, HTMLDivElement>>({});

  const register = useCallback((value: string, ref: HTMLDivElement) => {
    refs.current[value] = ref;
  }, []);

  const scrollTo = useCallback((value: string) => {
    const ref = refs.current[value];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const found = Object.entries(refs.current).find(
              ([, el]) => el === entry.target
            );
            if (found) {
              setActive(found[0]);
              break;
            }
          }
        }
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    const elements = Object.values(refs.current);
    elements.forEach((ref) => observer.observe(ref));

    return () => elements.forEach((ref) => observer.unobserve(ref));
  }, []);

  return (
    <ViewTabsContext.Provider value={{ active, setActive, register, scrollTo }}>
      <div
        data-slot="view-tabs"
        className={cn("flex gap-4 relative", className)}
        {...props}
      >
        {children}
      </div>
    </ViewTabsContext.Provider>
  );
}

export function ViewTabsList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "flex flex-col h-fit bg-background px-4 gap-4 border-r border-border",
        className
      )}
      {...props}
    />
  );
}

export function ViewTabsTrigger({
  value,
  children,
  icon: Icon,
  className,
}: {
  value: string;
  children: ReactNode;
  icon?: React.ElementType;
  className?: string;
}) {
  const { active, scrollTo } = useViewTabs();
  const isActive = active === value;

  const handleClick = useCallback(() => scrollTo(value), [scrollTo, value]);

  return (
    <button
      onClick={handleClick}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium whitespace-nowrap cursor-pointer",
        "transition-colors duration-200",
        "hover:bg-muted hover:text-foreground",
        "text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[state=active]:bg-muted/50 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
    >
      {Icon && (
        <Icon className="w-4 h-4 flex-shrink-0 group-hover:text-foreground group-data-[state=active]:text-primary transition-all" />
      )}
      {children}
    </button>
  );
}

export function ViewTabsGroup({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="viewtabs-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

export const ViewTabsLabel: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </h2>
  );
};

export function ViewTabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { register } = useViewTabs();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      register(value, ref.current);
    }
  }, [value, register]);

  return (
    <div ref={ref} className={cn("scroll-mt-24", className)}>
      {children}
    </div>
  );
}

export function ViewTabsGroupContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
}
