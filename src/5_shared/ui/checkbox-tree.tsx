"use client";

import * as React from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { Checkbox } from "@shared/ui/checkbox";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Badge } from "./badge";
export interface CheckboxTreeItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  selectedIcon?: LucideIcon;
  openIcon?: LucideIcon;
  value: string;
  children?: CheckboxTreeItem[];
}

interface CheckboxTreeProps {
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  data: CheckboxTreeItem[];
  className?: string;
}

// Variants for tree items
const treeVariants = {
  item: "group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 px-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10",
  selected: "before:opacity-100 before:bg-accent/70 text-accent-foreground",
  dragOver: "before:opacity-100 before:bg-primary/20 text-primary-foreground",
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 w-full items-center py-2 transition-all hover:bg-background rounded-md cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
function findAllLeafValues(items: CheckboxTreeItem[]): string[] {
  const values: string[] = [];

  for (const item of items) {
    if (!item.children || item.children.length === 0) {
      values.push(item.value);
    } else {
      values.push(...findAllLeafValues(item.children));
    }
  }

  return values;
}

const CheckboxTree = React.forwardRef<HTMLDivElement, CheckboxTreeProps>(
  (
    { value = [], onChange, onBlur, name, disabled = false, data, className },
    ref,
  ) => {
    // Get all possible leaf values
    const allLeafValues = findAllLeafValues(data);

    const handleChange = (newValues: string[]) => {
      // Filter to keep only leaf values (without parent elements)
      const leafValuesOnly = newValues.filter((val) =>
        allLeafValues.includes(val),
      );
      onChange(leafValuesOnly);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden relative p-2",
          disabled && "cursor-not-allowed!",
          className,
        )}
      >
        <CheckboxTreeInner
          items={data}
          selectedValues={value || []}
          onChange={handleChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          allLeafValues={allLeafValues}
        />
      </div>
    );
  },
);
CheckboxTree.displayName = "CheckboxTree";

interface CheckboxTreeInnerProps {
  items: CheckboxTreeItem[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  allLeafValues: string[];
  level?: number;
}

function CheckboxTreeInner({
  items,
  selectedValues,
  onChange,
  onBlur,
  name,
  disabled,
  allLeafValues,
  level = 0,
}: CheckboxTreeInnerProps) {
  return (
    <ul
      className={cn(
        "list-none m-0 space-y-1",
        level > 0 && "pl-6",
        disabled && "cursor-not-allowed!",
      )}
    >
      {items.map((item) => (
        <CheckboxTreeNode
          key={item.id}
          item={item}
          selectedValues={selectedValues}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          allLeafValues={allLeafValues}
          level={level}
        />
      ))}
    </ul>
  );
}

interface CheckboxTreeNodeProps {
  item: CheckboxTreeItem;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  allLeafValues: string[];
  level: number;
}

function CheckboxTreeNode({
  item,
  selectedValues,
  onChange,
  onBlur,
  name,
  disabled,
  allLeafValues,
  level,
}: CheckboxTreeNodeProps) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // All values of child elements (only at leaf level)
  const childrenValues = hasChildren
    ? findAllLeafValues(item.children!)
    : [item.value];

  // Check checkbox state
  const allChildrenSelected = childrenValues.every((val) =>
    selectedValues.includes(val),
  );
  const someChildrenSelected = childrenValues.some((val) =>
    selectedValues.includes(val),
  );

  const isIndeterminate = !allChildrenSelected && someChildrenSelected;
  const selectedCount = childrenValues.filter((val) =>
    selectedValues.includes(val),
  ).length;
  const handleChange = (checked: boolean) => {
    let newSelectedValues = [...selectedValues];

    if (checked) {
      // If selected, add all child values
      const valuesToAdd = childrenValues.filter(
        (val) => !newSelectedValues.includes(val),
      );
      newSelectedValues = [...newSelectedValues, ...valuesToAdd];
    } else {
      // If unselected, remove all child values
      newSelectedValues = newSelectedValues.filter(
        (val) => !childrenValues.includes(val),
      );
    }

    onChange(newSelectedValues);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <li className={cn("my-1", disabled && "cursor-not-allowed!")}>
      <div
        className={cn(
          "group gap-0 flex flex-1 w-full items-center py-2 transition-all hover:bg-background rounded-md cursor-pointer",
          treeVariants.item,
          allChildrenSelected && treeVariants.selected,
        )}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={toggleExpand}
            disabled={disabled}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <ChevronRight
              className={cn(
                expanded && "rotate-90",
                "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground mr-1",
              )}
            />
          </button>
        ) : (
          <div className="w-4" />
        )}
        <Checkbox
          id={`${name}-${item.id}`}
          checked={allChildrenSelected}
          onCheckedChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary mr-1 bg-transparent",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isIndeterminate &&
              "bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground",
            allChildrenSelected &&
              "bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          ref={(el) => {
            if (el) {
              // @ts-ignore - indeterminate is a valid property but not in the types
              el.indeterminate = isIndeterminate;
            }
          }}
        />
        <label
          htmlFor={`${name}-${item.id}`}
          className={cn(
            "text-sm flex flex-row items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-70",
            isIndeterminate && "text-foreground",
            allChildrenSelected && "text-foreground",
          )}
        >
          <TreeIcon item={item} />
          {item.label}
          {hasChildren && selectedCount > 0 && (
            <Badge className="ml-1 text-[10px] rounded-sm px-1.5">
              {selectedCount}
            </Badge>
          )}
        </label>
      </div>

      {hasChildren && expanded && (
        <div className="relative mt-1">
          <div className="absolute left-[15px] top-0 h-full w-px bg-border" />
          <CheckboxTreeInner
            items={item.children!}
            selectedValues={selectedValues}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            disabled={disabled}
            allLeafValues={allLeafValues}
            level={level + 1}
          />
        </div>
      )}
    </li>
  );
}
const TreeIcon = ({
  item,
  isOpen,
  isSelected,
}: {
  item: CheckboxTreeItem;
  isOpen?: boolean;
  isSelected?: boolean;
}) => {
  let Icon: LucideIcon | undefined;

  if (isSelected && item.selectedIcon) {
    Icon = item.selectedIcon;
  } else if (isOpen && item.openIcon) {
    Icon = item.openIcon;
  } else if (item.icon) {
    Icon = item.icon;
  }

  return Icon ? <Icon className="h-4 w-4 shrink-0 mr-0.5" /> : null;
};
export { CheckboxTree };
