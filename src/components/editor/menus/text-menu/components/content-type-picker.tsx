import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { icons } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Surface } from "@/components/ui/surface";
import { Toolbar } from "@/components/ui/toolbar";
import { cn } from "@/lib/utils";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerOption => option.type === "option";
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerCategory => option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(
    () => options.find((option) => option.type === "option" && option.isActive()),
    [options]
  );

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button active={activeItem?.id !== "paragraph" && !!activeItem?.type}>
          <Icon name={(activeItem?.type === "option" && activeItem.icon) || "Pilcrow"} />
          <Icon name="ChevronDown" className="size-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <Button
                  key={option.id}
                  onClick={option.onClick}
                  variant="ghost"
                  className={cn(
                    "inline-flex flex-row justify-start font-normal",
                    option.isActive() ? "bg-neutral-100/50" : ""
                  )}
                >
                  <Icon name={option.icon} className="mr-1 size-4" />
                  {option.label}
                </Button>
              );
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 text-xs uppercase first:mt-0" key={option.id}>
                  {option.label}
                </div>
              );
            }
          })}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
