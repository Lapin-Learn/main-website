import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSearch } from "@/hooks/react-query/use-simulated-test";
import { cn } from "@/lib/utils";

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";

export type AutocompleteOption<T> = {
  value: string;
  label: string;
  data: T;
};

type Props<T extends string, U> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: AutocompleteOption<U>[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  StartIcon?: React.ElementType;
  inputClassName?: string;
  isCheckable?: boolean;
  data?: unknown;
  renderItem?: (item: AutocompleteOption<U>) => React.ReactNode;
};

export function AutoComplete<T extends string, U>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage,
  placeholder = "Search...",
  StartIcon,
  inputClassName,
  isCheckable = false,
  renderItem,
}: Props<T, U>) {
  const [open, setOpen] = useState(false);
  const { keyword } = useSearch();
  const { t } = useTranslation("practice");

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    [items]
  );

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.hasAttribute("cmdk-list") && labels[selectedValue] !== keyword) {
      reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? "");
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              onMouseDown={() => setOpen((open) => !!keyword || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
            >
              <Input placeholder={placeholder} StartIcon={StartIcon} className={inputClassName} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (e.target instanceof Element && e.target.hasAttribute("cmdk-input")) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      {isCheckable && (
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      )}
                      {renderItem ? renderItem({ ...option }) : option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading && !items.length ? (
                <CommandEmpty>{emptyMessage ?? t("search.noResults")}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
