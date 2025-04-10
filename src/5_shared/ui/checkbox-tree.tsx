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

    // Get all item IDs in the tree
    const getAllItemIds = React.useCallback(
      (items: TreeDataItem[] | TreeDataItem): string[] => {
        const ids: string[] = [];
        if (items instanceof Array) {
          items.forEach((item) => {
            ids.push(item.id);
            if (item.children) {
              ids.push(...getAllItemIds(item.children));
            }
          });
        } else {
          ids.push(items.id);
          if (items.children) {
            ids.push(...getAllItemIds(items.children));
          }
        }
        return ids;
      },
      []
    );

    // Get all descendant IDs of an item
    const getDescendantIds = React.useCallback(
      (item: TreeDataItem): string[] => {
        const ids: string[] = [];
        if (item.children) {
          item.children.forEach((child) => {
            ids.push(child.id);
            if (child.children) {
              ids.push(...getDescendantIds(child));
            }
          });
        }
        return ids;
      },
      []
    );

    // Find an item by ID
    const findItemById = React.useCallback(
      (
        itemId: string,
        items: TreeDataItem[] | TreeDataItem
      ): TreeDataItem | null => {
        if (items instanceof Array) {
          for (const item of items) {
            if (item.id === itemId) return item;
            if (item.children) {
              const found = findItemById(itemId, item.children);
              if (found) return found;
            }
          }
          return null;
        } else {
          if (items.id === itemId) return items;
          if (items.children) {
            return findItemById(itemId, items.children);
          }
          return null;
        }
      },
      []
    );

    // Get parent-child relationships
    const getParentChildMap = React.useCallback(
      (items: TreeDataItem[] | TreeDataItem): Map<string, string[]> => {
        const map = new Map<string, string[]>();

        const process = (item: TreeDataItem, parentId?: string) => {
          if (parentId) {
            const children = map.get(parentId) || [];
            children.push(item.id);
            map.set(parentId, children);
          }

          if (item.children) {
            item.children.forEach((child) => {
              process(child, item.id);
            });
          }
        };

        if (items instanceof Array) {
          items.forEach((item) => process(item));
        } else {
          process(items);
        }

        return map;
      },
      []
    );

    // Find the parent of an item
    const findParentId = React.useCallback(
      (
        itemId: string,
        parentChildMap: Map<string, string[]>
      ): string | null => {
        for (const [parentId, childIds] of parentChildMap.entries()) {
          if (childIds.includes(itemId)) {
            return parentId;
          }
        }
        return null;
      },
      []
    );

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

    // Handle checkbox change
    const handleCheckChange = React.useCallback(
      (itemId: string, checked: boolean) => {
        const item = findItemById(itemId, data);
        if (!item) return;

        const newCheckedState = { ...checkedState };

        // Set the clicked item's state
        newCheckedState[itemId] = checked;

        // Get all descendants and set their state
        const descendants = getDescendantIds(item);
        descendants.forEach((id) => {
          const descendantItem = findItemById(id, data);
          if (descendantItem && descendantItem.checkable !== false) {
            newCheckedState[id] = checked;
          }
        });

        // Update parent states
        const parentChildMap = getParentChildMap(data);
        const updateParentState = (childId: string) => {
          const parentId = findParentId(childId, parentChildMap);
          if (!parentId) return;

          const parent = findItemById(parentId, data);
          if (!parent || parent.checkable === false) return;

          const siblings = parentChildMap.get(parentId) || [];
          const allChecked = siblings.every((id) => {
            const item = findItemById(id, data);
            return item?.checkable === false || newCheckedState[id];
          });

          const anyChecked = siblings.some((id) => {
            const item = findItemById(id, data);
            return item?.checkable !== false && newCheckedState[id];
          });

          // If all checkable children are checked, check the parent
          // If some are checked, parent should be in indeterminate state (we'll handle this visually)
          newCheckedState[parentId] = allChecked;

          // Recursively update ancestors
          updateParentState(parentId);
        };

        // Start updating from the item's parent
        updateParentState(itemId);

        setCheckedState(newCheckedState);

        // Notify of changes
        if (onCheckedChange) {
          const checkedIds = Object.entries(newCheckedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([id]) => id);
          onCheckedChange(checkedIds);
        }
      },
      [
        checkedState,
        data,
        findItemById,
        getDescendantIds,
        getParentChildMap,
        findParentId,
        onCheckedChange,
      ]
    );

    // Calculate indeterminate states
    const getIndeterminateState = React.useCallback(
      (itemId: string): boolean => {
        const item = findItemById(itemId, data);
        if (!item || !item.children) return false;

        const descendants = getDescendantIds(item);
        const checkedDescendants = descendants.filter((id) => checkedState[id]);

        // If some but not all descendants are checked, the item is in indeterminate state
        return (
          checkedDescendants.length > 0 &&
          checkedDescendants.length < descendants.length
        );
      },
      [checkedState, data, findItemById, getDescendantIds]
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
          getIndeterminateState={getIndeterminateState}
          {...props}
        />
        <div
          className="w-full h-[48px]"
          onDrop={(e) => {
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
  getIndeterminateState: (itemId: string) => boolean;
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
      getIndeterminateState,
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
                  getIndeterminateState={getIndeterminateState}
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
                  getIndeterminateState={getIndeterminateState}
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
  getIndeterminateState,
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
  getIndeterminateState: (itemId: string) => boolean;
}) => {
  const [value, setValue] = React.useState(
    expandedItemIds.includes(item.id) ? [item.id] : []
  );
  const [isDragOver, setIsDragOver] = React.useState(false);

  const isChecked = checkedState[item.id] || false;
  const isIndeterminate = getIndeterminateState(item.id);

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
          <div
            className="flex items-center mr-2"
            data-checkbox-trigger="true"
            onClick={(e) => {
              e.stopPropagation();
              if (item.checkable !== false && !item.disabled) {
                handleCheckChange(item.id, !isChecked);
              }
            }}
          >
            <CheckboxPrimitive.Root
              id={`checkbox-${item.id}`}
              checked={isChecked}
              disabled={item.disabled || item.checkable === false}
              onCheckedChange={(checked) => {
                if (item.checkable !== false && !item.disabled) {
                  handleCheckChange(item.id, checked === true);
                }
              }}
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
            getIndeterminateState={getIndeterminateState}
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
    getIndeterminateState: (itemId: string) => boolean;
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
      getIndeterminateState,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const isChecked = checkedState[item.id] || false;

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
        <div
          className="flex items-center mr-2"
          data-checkbox-trigger="true"
          onClick={(e) => {
            e.stopPropagation();
            if (item.checkable !== false && !item.disabled) {
              handleCheckChange(item.id, !isChecked);
            }
          }}
        >
          <CheckboxPrimitive.Root
            id={`checkbox-${item.id}`}
            checked={isChecked}
            disabled={item.disabled || item.checkable === false}
            onCheckedChange={(checked) => {
              if (item.checkable !== false && !item.disabled) {
                handleCheckChange(item.id, checked === true);
              }
            }}
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
