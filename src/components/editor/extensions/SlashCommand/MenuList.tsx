import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

import { Command, MenuListProps } from "./types";

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLButtonElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  // Anytime the groups change, i.e. the user types to narrow it down, we want to
  // reset the current selection to the first menu item
  useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.items]);

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex];
      props.command(command);
    },
    [props]
  );

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowDown") {
        if (!props.items.length) {
          return false;
        }

        const commands = props.items[selectedGroupIndex].commands;

        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "ArrowUp") {
        if (!props.items.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1;
          newCommandIndex = props.items[newGroupIndex].commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;

      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex);
      };
    },
    [selectItem]
  );

  if (!props.items.length) {
    return null;
  }

  // TODO: replace with scrollable from shadcn
  return (
    <Surface
      ref={scrollContainer}
      className="mb-8 max-h-[min(80vh,24rem)] flex-wrap overflow-auto p-2 text-black"
      withShadow
    >
      <div className="grid grid-cols-1 gap-0.5">
        {props.items.map((group, groupIndex: number) => (
          <React.Fragment key={`${group.title}-wrapper`}>
            <div
              className="col-[1/-1] mx-2 mt-4 select-none text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-500 first:mt-0.5"
              key={`${group.title}`}
            >
              {group.title}
            </div>
            {group.commands.map((command: Command, commandIndex: number) => (
              <Button
                key={`${command.label}`}
                ref={
                  selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex
                    ? activeItem
                    : null
                }
                variant="ghost"
                className={cn(
                  "flex-start flex flex-row justify-start font-normal",

                  selectedGroupIndex === groupIndex &&
                    selectedCommandIndex === commandIndex &&
                    "bg-neutral-50 hover:bg-neutral-100/50"
                )}
                onClick={createCommandClickHandler(groupIndex, commandIndex)}
              >
                <Icon name={command.iconName} className="mr-2" />
                {command.label}
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Surface>
  );
});

MenuList.displayName = "MenuList";

export default MenuList;
