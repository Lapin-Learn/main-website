import { ChevronDown } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        month_grid: "flex flex-col w-72 mt-12",
        month: "space-y-4 mt-8",
        month_caption: "flex justify-center font-semibold text-lg relative items-center",
        // caption_label: "text-sm font-medium",
        // nav: "space-x-1 flex items-center",
        // nav_button: cn(
        //   buttonVariants({ variant: "outline" }),
        //   "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        // ),
        // nav_button_previous: "absolute left-1 top-0",
        // nav_button_next: "absolute right-1",
        // table: "w-full border-collapse space-y-1",
        // head_row: "flex",
        // head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "grid grid-cols-7 place-items-center mt-2 justify-between",
        weekdays: "grid grid-cols-7 text-center text-semibold text-sm text-neutral-300 uppercase",
        weeks: "flex w-full flex-col mr-0",
        // cell: cn(
        //   "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
        //   props.mode === "range"
        //     ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        //     : "[&:has([aria-selected])]:rounded-md"
        // ),
        nav: "flex justify-between absolute top-4 left-4 right-4",
        day: "[&_button]:aria-selected:bg-primary/80 [&_button]:aria-selected:text-white",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 p-0 font-normal disabled:cursor-not-allowed disabled:opacity-50 rounded-full"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-full size-8 p-0 [&_svg]:text-neutral-200 [&_svg]:hover:text-neutral-500"
        ),
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-full size-8 p-0 [&_svg]:text-neutral-200 [&_svg]:hover:text-neutral-500"
        ),
        caption_label: "hidden",
        dropdown: "w-30",
        dropdowns: "w-fit absolute top-0 -mt-7 text-md",
        // day_range_start: "day-range-start",
        // day_range_end: "day-range-end",
        // day_selected:
        //   "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        // day_today: "bg-accent text-accent-foreground",
        // day_outside:
        //   "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        // day_disabled: "text-muted-foreground opacity-50",
        // day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // day_hidden: "invisible",
        ...classNames,
      }}
      captionLayout="dropdown"
      components={{
        Chevron: ({ className, orientation }) => {
          let rotate = 0;
          if (orientation === "up") {
            rotate = 180;
          } else if (orientation === "down") {
            rotate = 0;
          } else if (orientation === "left") {
            rotate = 90;
          } else if (orientation === "right") {
            rotate = -90;
          }
          return (
            <ChevronDown
              className={cn("size-6", className)}
              style={{ transform: `rotate(${rotate}deg)` }}
            />
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
