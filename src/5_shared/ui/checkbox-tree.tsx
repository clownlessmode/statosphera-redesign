import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ChevronRight, Check } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@shared/lib/utils";

const treeVariants = cva(
  "group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 px-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10"
);

const selectedTreeVariants = cva(
  "before:opacity-100 before:bg-accent/70 text-accent-foreground"
);

const dragOverVariants = cva(
  "before:opacity-100 before:bg-primary/20 text-primary-foreground"
);

// Extended TreeDataItem to include checkbox state and disabled option
interface TreeDataItem {
  id: string;
  name: string;
  icon?: any;
  selectedIcon?: any;
  openIcon?: any;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
  draggable?: boolean;
  droppable?: boolean;
  checkable?: boolean; // Whether this item can be checked
  disabled?: boolean; // Whether the checkbox is disabled
}

// Added checked state to track selected items
type CheckedState = Record<string, boolean>;

type CheckboxTreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  defaultNodeIcon?: any;
  defaultLeafIcon?: any;
  onDocumentDrag?: (sourceItem: TreeDataItem, targetItem: TreeDataItem) => void;
  initialCheckedItems?: string[]; // IDs of initially checked items
  onCheckedChange?: (checkedIds: string[]) => void; // Callback for when checked items change
};

const CheckboxTree = React.forwardRef<HTMLDivElement, CheckboxTreeProps>(
  (
    {
      data,
      initialSelectedItemId,
      onSelectChange,
      expandAll,
      defaultLeafIcon,
      defaultNodeIcon,
      className,
      onDocumentDrag,
      initialCheckedItems = [],
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const [selectedItemId, setSelectedItemId] = React.useState<
      string | undefined
    >(initialSelectedItemId);

    const [draggedItem, setDraggedItem] = React.useState<TreeDataItem | null>(
      null
    );

    // Initialize checked state
    const [checkedState, setCheckedState] = React.useState<CheckedState>(() => {
      const state: CheckedState = {};
      initialCheckedItems.forEach((id) => {
        state[id] = true;
      });
      return state;
    });

    // Cache for item lookup to avoid repeated traversals
    const itemCache = React.useRef<Map<string, TreeDataItem>>(new Map());
    // Cache for parent-child relationships
    const parentChildMap = React.useRef<Map<string, string[]>>(new Map());
    // Cache for parent lookup
    const childParentMap = React.useRef<Map<string, string>>(new Map());

    // Initialize cache on mount or when data changes
    React.useEffect(() => {
      // Clear caches
      itemCache.current.clear();
      parentChildMap.current.clear();
      childParentMap.current.clear();

      // Build cache
      const buildCache = (
        items: TreeDataItem[] | TreeDataItem,
        parentId?: string
      ) => {
        if (Array.isArray(items)) {
          items.forEach((item) => buildCache(item, parentId));
        } else {
          // Add item to cache
          itemCache.current.set(items.id, items);

          // Add parent-child relationship
          if (parentId) {
            childParentMap.current.set(items.id, parentId);

            const siblings = parentChildMap.current.get(parentId) || [];
            siblings.push(items.id);
            parentChildMap.current.set(parentId, siblings);
          }

          // Process children
          if (items.children && items.children.length > 0) {
            buildCache(items.children, items.id);
          }
        }
      };

      buildCache(data);
    }, [data]);

    // Find an item by ID using cache
    const findItemById = React.useCallback(
      (itemId: string): TreeDataItem | undefined => {
        return itemCache.current.get(itemId);
      },
      []
    );

    // Get all descendant IDs of an item
    const getDescendantIds = React.useCallback(
      (itemId: string): string[] => {
        const ids: string[] = [];
        const item = findItemById(itemId);

        if (!item || !item.children) return ids;

        const processChildren = (children: TreeDataItem[]) => {
          children.forEach((child) => {
            ids.push(child.id);
            if (child.children) {
              processChildren(child.children);
            }
          });
        };

        processChildren(item.children);
        return ids;
      },
      [findItemById]
    );

    // Handle checkbox change with debouncing to prevent rapid re-renders
    const handleCheckChange = React.useCallback(
      (itemId: string, checked: boolean) => {
        const item = findItemById(itemId);
        if (!item) return;

        setCheckedState((prevState) => {
          const newState = { ...prevState };

          // Set the current item's state
          newState[itemId] = checked;

          // Update descendants if they exist
          const descendants = getDescendantIds(itemId);
          descendants.forEach((id) => {
            const descendant = findItemById(id);
            if (descendant && descendant.checkable !== false) {
              newState[id] = checked;
            }
          });

          // Update ancestors
          let currentId = itemId;
          let parentId = childParentMap.current.get(currentId);

          while (parentId) {
            const siblings = parentChildMap.current.get(parentId) || [];

            // Calculate if all checkable siblings are checked
            const allSiblingsChecked = siblings.every((id) => {
              const siblingItem = findItemById(id);
              return siblingItem?.checkable === false || newState[id];
            });

            // Only update parent if needed
            if (newState[parentId] !== allSiblingsChecked) {
              newState[parentId] = allSiblingsChecked;
              currentId = parentId;
              parentId = childParentMap.current.get(currentId);
            } else {
              break; // No need to check further up if state doesn't change
            }
          }

          return newState;
        });

        // Notify of changes using a setTimeout to ensure we're not in the middle of a render cycle
        setTimeout(() => {
          if (onCheckedChange) {
            const checkedIds = Object.entries(checkedState)
              .filter(([_, isChecked]) => isChecked)
              .map(([id]) => id);
            onCheckedChange(checkedIds);
          }
        }, 0);
      },
      [checkedState, findItemById, getDescendantIds, onCheckedChange]
    );

    // Calculate indeterminate states - memoized to prevent recalculation
    const getIndeterminateState = React.useCallback(
      (itemId: string): boolean => {
        const item = findItemById(itemId);
        if (!item || !item.children) return false;

        const descendants = getDescendantIds(itemId);
        if (descendants.length === 0) return false;

        // Check if some but not all descendants are checked
        const hasChecked = descendants.some((id) => checkedState[id]);
        const hasUnchecked = descendants.some((id) => !checkedState[id]);

        return hasChecked && hasUnchecked;
      },
      [checkedState, findItemById, getDescendantIds]
    );

    // Create a memoized map of indeterminate states to avoid recalculations during render
    const indeterminateStates = React.useMemo(() => {
      const states = new Map<string, boolean>();

      // Only calculate for items with children
      Array.from(itemCache.current.values())
        .filter((item) => item.children && item.children.length > 0)
        .forEach((item) => {
          states.set(item.id, getIndeterminateState(item.id));
        });

      return states;
    }, [checkedState, getIndeterminateState]);

    // Handle select change
    const handleSelectChange = React.useCallback(
      (item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
          onSelectChange(item);
        }
      },
      [onSelectChange]
    );

    // Handle drag
    const handleDragStart = React.useCallback((item: TreeDataItem) => {
      setDraggedItem(item);
    }, []);

    const handleDrop = React.useCallback(
      (targetItem: TreeDataItem) => {
        if (draggedItem && onDocumentDrag && draggedItem.id !== targetItem.id) {
          onDocumentDrag(draggedItem, targetItem);
        }
        setDraggedItem(null);
      },
      [draggedItem, onDocumentDrag]
    );

    const expandedItemIds = React.useMemo(() => {
      if (!initialSelectedItemId) {
        return [] as string[];
      }

      const ids: string[] = [];

      function walkTreeItems(
        items: TreeDataItem[] | TreeDataItem,
        targetId: string
      ) {
        if (items instanceof Array) {
          for (let i = 0; i < items.length; i++) {
            ids.push(items[i]!.id);
            if (walkTreeItems(items[i]!, targetId) && !expandAll) {
              return true;
            }
            if (!expandAll) ids.pop();
          }
        } else if (!expandAll && items.id === targetId) {
          return true;
        } else if (items.children) {
          return walkTreeItems(items.children, targetId);
        }
      }

      walkTreeItems(data, initialSelectedItemId);
      return ids;
    }, [data, expandAll, initialSelectedItemId]);

    return (
      <div className={cn("overflow-hidden relative p-2", className)}>
        <CheckboxTreeItem
          data={data}
          ref={ref}
          selectedItemId={selectedItemId}
          handleSelectChange={handleSelectChange}
          expandedItemIds={expandedItemIds}
          defaultLeafIcon={defaultLeafIcon}
          defaultNodeIcon={defaultNodeIcon}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          draggedItem={draggedItem}
          checkedState={checkedState}
          handleCheckChange={handleCheckChange}
          indeterminateStates={indeterminateStates}
          {...props}
        />
        <div
          className="w-full h-[48px]"
          onDrop={() => {
            handleDrop({ id: "", name: "parent_div" });
          }}
        ></div>
      </div>
    );
  }
);
CheckboxTree.displayName = "CheckboxTree";

type CheckboxTreeItemProps = CheckboxTreeProps & {
  selectedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  handleDragStart?: (item: TreeDataItem) => void;
  handleDrop?: (item: TreeDataItem) => void;
  draggedItem: TreeDataItem | null;
  checkedState: CheckedState;
  handleCheckChange: (itemId: string, checked: boolean) => void;
  indeterminateStates: Map<string, boolean>;
};

const CheckboxTreeItem = React.forwardRef<
  HTMLDivElement,
  CheckboxTreeItemProps
>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      defaultNodeIcon,
      defaultLeafIcon,
      handleDragStart,
      handleDrop,
      draggedItem,
      checkedState,
      handleCheckChange,
      indeterminateStates,
      ...props
    },
    ref
  ) => {
    if (!(data instanceof Array)) {
      data = [data];
    }
    return (
      <div ref={ref} role="tree" className={className} {...props}>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.children ? (
                <CheckboxTreeNode
                  indeterminateStates={indeterminateStates}
                  item={item}
                  selectedItemId={selectedItemId}
                  expandedItemIds={expandedItemIds}
                  handleSelectChange={handleSelectChange}
                  defaultNodeIcon={defaultNodeIcon}
                  defaultLeafIcon={defaultLeafIcon}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  draggedItem={draggedItem}
                  checkedState={checkedState}
                  handleCheckChange={handleCheckChange}
                  isIndeterminate={indeterminateStates.get(item.id) || false}
                />
              ) : (
                <CheckboxTreeLeaf
                  item={item}
                  selectedItemId={selectedItemId}
                  handleSelectChange={handleSelectChange}
                  defaultLeafIcon={defaultLeafIcon}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  draggedItem={draggedItem}
                  checkedState={checkedState}
                  handleCheckChange={handleCheckChange}
                  isIndeterminate={indeterminateStates.get(item.id) || false}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
CheckboxTreeItem.displayName = "CheckboxTreeItem";

const CheckboxTreeNode = ({
  item,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
  handleDragStart,
  handleDrop,
  draggedItem,
  checkedState,
  handleCheckChange,
  isIndeterminate,
  indeterminateStates,
}: {
  item: TreeDataItem;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: any;
  defaultLeafIcon?: any;
  handleDragStart?: (item: TreeDataItem) => void;
  handleDrop?: (item: TreeDataItem) => void;
  draggedItem: TreeDataItem | null;
  checkedState: CheckedState;
  handleCheckChange: (itemId: string, checked: boolean) => void;
  isIndeterminate: boolean;
  indeterminateStates: Map<string, boolean>;
}) => {
  const [value, setValue] = React.useState(
    expandedItemIds.includes(item.id) ? [item.id] : []
  );
  const [isDragOver, setIsDragOver] = React.useState(false);

  const isChecked = checkedState[item.id] || false;

  // Use memoized handler for checkbox change to prevent recreating function on each render
  const onCheckboxChange = React.useCallback(
    (checked: boolean) => {
      if (item.checkable !== false && !item.disabled) {
        handleCheckChange(item.id, checked === true);
      }
    },
    [item.id, item.checkable, item.disabled, handleCheckChange]
  );

  const onDragStart = (e: React.DragEvent) => {
    if (!item.draggable) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", item.id);
    handleDragStart?.(item);
  };

  const onDragOver = (e: React.DragEvent) => {
    if (item.droppable !== false && draggedItem && draggedItem.id !== item.id) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleDrop?.(item);
  };

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={(s) => setValue(s)}
    >
      <AccordionPrimitive.Item value={item.id}>
        <AccordionTrigger
          className={cn(
            treeVariants(),
            selectedItemId === item.id && selectedTreeVariants(),
            isDragOver && dragOverVariants()
          )}
          onClick={(e) => {
            // Prevent clicking on checkbox from triggering accordion
            if (
              (e.target as HTMLElement).closest(
                '[data-checkbox-trigger="true"]'
              )
            ) {
              e.stopPropagation();
              return;
            }
            handleSelectChange(item);
            item.onClick?.();
          }}
          draggable={!!item.draggable}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="flex items-center mr-2" data-checkbox-trigger="true">
            <CheckboxPrimitive.Root
              id={`checkbox-${item.id}`}
              checked={isChecked}
              disabled={item.disabled || item.checkable === false}
              onCheckedChange={onCheckboxChange}
              className={cn(
                "h-4 w-4 shrink-0 rounded-sm border border-primary",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isChecked && "bg-primary text-primary-foreground",
                isIndeterminate && "bg-primary text-primary-foreground",
                (item.disabled || item.checkable === false) &&
                  "opacity-50 cursor-not-allowed",
                !item.disabled && item.checkable !== false && "cursor-pointer"
              )}
              data-state={isChecked ? "checked" : "unchecked"}
              data-indeterminate={isIndeterminate ? "true" : "false"}
            >
              <CheckboxPrimitive.Indicator
                className={cn("flex items-center justify-center text-current")}
              >
                {isIndeterminate ? (
                  <div className="h-2 w-2 bg-current" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </div>
          <TreeIcon
            item={item}
            isSelected={selectedItemId === item.id}
            isOpen={value.includes(item.id)}
            default={defaultNodeIcon}
          />
          <span className="text-sm truncate">{item.name}</span>
          <TreeActions isSelected={selectedItemId === item.id}>
            {item.actions}
          </TreeActions>
        </AccordionTrigger>
        <AccordionContent className="ml-4 pl-1 border-l">
          <CheckboxTreeItem
            data={item.children ? item.children : item}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            defaultLeafIcon={defaultLeafIcon}
            defaultNodeIcon={defaultNodeIcon}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            draggedItem={draggedItem}
            checkedState={checkedState}
            handleCheckChange={handleCheckChange}
            indeterminateStates={indeterminateStates}
          />
        </AccordionContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

const CheckboxTreeLeaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem;
    selectedItemId?: string;
    handleSelectChange: (item: TreeDataItem | undefined) => void;
    defaultLeafIcon?: any;
    handleDragStart?: (item: TreeDataItem) => void;
    handleDrop?: (item: TreeDataItem) => void;
    draggedItem: TreeDataItem | null;
    checkedState: CheckedState;
    handleCheckChange: (itemId: string, checked: boolean) => void;
    isIndeterminate: boolean;
  }
>(
  (
    {
      className,
      item,
      selectedItemId,
      handleSelectChange,
      defaultLeafIcon,
      handleDragStart,
      handleDrop,
      draggedItem,
      checkedState,
      handleCheckChange,
      isIndeterminate,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const isChecked = checkedState[item.id] || false;

    // Use memoized handler for checkbox change to prevent recreating function on each render
    const onCheckboxChange = React.useCallback(
      (checked: boolean) => {
        if (item.checkable !== false && !item.disabled) {
          handleCheckChange(item.id, checked === true);
        }
      },
      [item.id, item.checkable, item.disabled, handleCheckChange]
    );

    const onDragStart = (e: React.DragEvent) => {
      if (!item.draggable) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", item.id);
      handleDragStart?.(item);
    };

    const onDragOver = (e: React.DragEvent) => {
      if (
        item.droppable !== false &&
        draggedItem &&
        draggedItem.id !== item.id
      ) {
        e.preventDefault();
        setIsDragOver(true);
      }
    };

    const onDragLeave = () => {
      setIsDragOver(false);
    };

    const onDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleDrop?.(item);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "ml-5 flex text-left items-center py-2 cursor-pointer before:right-1",
          treeVariants(),
          className,
          selectedItemId === item.id && selectedTreeVariants(),
          isDragOver && dragOverVariants()
        )}
        onClick={(e) => {
          // Prevent clicking on checkbox from triggering item selection
          if (
            (e.target as HTMLElement).closest('[data-checkbox-trigger="true"]')
          ) {
            return;
          }
          handleSelectChange(item);
          item.onClick?.();
        }}
        draggable={!!item.draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        {...props}
      >
        <div className="flex items-center mr-2" data-checkbox-trigger="true">
          <CheckboxPrimitive.Root
            id={`checkbox-${item.id}`}
            checked={isChecked}
            disabled={item.disabled || item.checkable === false}
            onCheckedChange={onCheckboxChange}
            className={cn(
              "h-4 w-4 shrink-0 rounded-sm border border-primary",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isChecked && "bg-primary text-primary-foreground",
              (item.disabled || item.checkable === false) &&
                "opacity-50 cursor-not-allowed",
              !item.disabled && item.checkable !== false && "cursor-pointer"
            )}
            data-state={isChecked ? "checked" : "unchecked"}
          >
            <CheckboxPrimitive.Indicator
              className={cn("flex items-center justify-center text-current")}
            >
              <Check className="h-4 w-4" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </div>
        <TreeIcon
          item={item}
          isSelected={selectedItemId === item.id}
          default={defaultLeafIcon}
        />
        <span className="flex-grow text-sm truncate">{item.name}</span>
        <TreeActions isSelected={selectedItemId === item.id}>
          {item.actions}
        </TreeActions>
      </div>
    );
  }
);
CheckboxTreeLeaf.displayName = "CheckboxTreeLeaf";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 w-full items-center py-2 transition-all hover:bg-background rounded-md cursor-pointer",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 mr-1 group-data-[state=open]:rotate-90" />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-1 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const TreeIcon = ({
  item,
  isOpen,
  isSelected,
  default: defaultIcon,
}: {
  item: TreeDataItem;
  isOpen?: boolean;
  isSelected?: boolean;
  default?: any;
}) => {
  let Icon = defaultIcon;
  if (isSelected && item.selectedIcon) {
    Icon = item.selectedIcon;
  } else if (isOpen && item.openIcon) {
    Icon = item.openIcon;
  } else if (item.icon) {
    Icon = item.icon;
  }
  return Icon ? <Icon className="h-4 w-4 shrink-0 mr-2" /> : <></>;
};

const TreeActions = ({
  children,
  isSelected,
}: {
  children: React.ReactNode;
  isSelected: boolean;
}) => {
  return (
    <div
      className={cn(
        isSelected ? "block" : "hidden",
        "absolute right-3 group-hover:block"
      )}
    >
      {children}
    </div>
  );
};

export { CheckboxTree, type TreeDataItem };
