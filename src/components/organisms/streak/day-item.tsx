import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const dayItemVariants = cva("", {
  variants: {
    position: {
      default: "text-neutral-900",
      outside: "text-neutral-300",
    },
    active: {
      default: "bg-white",
      single: "rounded-full bg-[#FCE3B4] text-primary-700",
      first: "rounded-l-full bg-[#FCE3B4] text-primary-700",
      middle: "bg-[#FCE3B4] text-primary-700",
      last: "rounded-r-full bg-[#FCE3B4] text-primary-700",
    },
    container: {
      default: "relative",
      first:
        "relative after:absolute after:top-0 after:right-0 after:w-2 after:h-full after:bg-[#FCE3B4]",
      middle: "relative bg-[#FCE3B4]",
      last: "relative before:absolute before:top-0 before:left-0 before:w-2 before:h-full before:bg-[#FCE3B4]",
      single: "",
    },
    today: {
      true: "bg-neutral-100 text-white rounded-full",
      false: "",
    },
    isActiveToday: {
      true: "bg-primary/80 text-white rounded-full",
      false: "",
    },
  },
  defaultVariants: {
    position: "default",
    active: "default",
    today: false,
    isActiveToday: false,
  },
});
type DayItemProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<VariantProps<typeof dayItemVariants>, "container" | "isActiveToday"> & {
    dayNumber: number;
  };
const DayItem = React.forwardRef<HTMLDivElement, DayItemProps>(
  ({ className, dayNumber, position, active, today, ...props }, ref) => {
    return (
      <div
        className={cn(
          dayItemVariants({ container: active }),
          className,
          "inline-flex w-full flex-1 justify-center"
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            dayItemVariants({ position, active, today, isActiveToday: active && today }),
            "grid size-8 place-items-center"
          )}
        >
          {dayNumber}
        </span>
      </div>
    );
  }
);
DayItem.displayName = "DayItem";
export default DayItem;
